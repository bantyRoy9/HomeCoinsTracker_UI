import React from "react";
import { View, Text, Image, Pressable, StyleSheet, GestureResponderEvent } from "react-native";
import { dateFormat, filterKeyIncludeArr, getElementByIndex, stringTransform } from "../../Utils";

interface ActivityItemProps {
  item: ActivityItemType;
  index?: number;
  length?: number;
  colors?: Colors;
  styles?: any;
  onPress: (event: GestureResponderEvent) => void;
  source?: any[]; // Define the type of `source` if possible
//   stringTransform: (input: string, type: string) => string;
//   dateFormat: (format: string, date: string) => string;
//   filterKeyIncludeArr: (arr: any[], key: string, value: any) => any[];
//   getElementByIndex: (arr: any[], index: number, key: string) => string;
}

interface ActivityItemType {
  Url: string;
  addEarn?: {
    amount?: number;
    source?: any;
  };
  addExpend?: {
    amount?: number;
    description?: string;
  };
  methodType?: string;
  updatedDate?: string;
  date?: string;
  user?: {
    name?: string;
  };
}

interface Colors {
  text: string;
  border: string;
  error: string;
  warning: string;
  success: string;
}

const ActivityItem: React.FC<ActivityItemProps> = ({
  item,
  index,
  length,
  colors,
  styles,
  onPress,
  source,
//   stringTransform,
//   dateFormat,
//   filterKeyIncludeArr,
//   getElementByIndex,
}) => {
  const isExpend = item.Url === "/expend";
  const amount = isExpend ? item.addExpend?.amount : item.addEarn?.amount;
  const description = isExpend
    ? item.addExpend?.description ?? "NA"
    : stringTransform(
        getElementByIndex(
          filterKeyIncludeArr(source, "_id", item.addEarn?.source),
          0,
          "sourceName"
        ),
        "C"
      );

  return (
    <View key={index} style={styles.container}>
      <Pressable
        style={{
          ...styles.activityLists,
          borderBottomColor: colors!.border,
          borderBottomWidth: length! - 1 > index! ? 1 : 0,
        }}
        onPress={onPress}
      >
        <View style={styles.activityList}>
          <View style={styles.activityLeftSec}>
            <View style={styles.activityProfileList}>
              <Image
                source={require("../../../Assets/profiles/default.png")}
                style={{ width: 40, height: 40, borderRadius: 8 }}
              />
            </View>
            <View>
              <View>
                <Text style={{ color: colors!.text }}>
                  {isExpend ? "Expend to" : "Earn By"}
                </Text>
              </View>
              <View>
                <Text style={{ color: colors!.text }}>{description}</Text>
              </View>
            </View>
          </View>
          <View style={styles.activityRightSec}>
            <Text
              style={{
                color: isExpend
                  ? colors!.error
                  : item.methodType === "PATCH"
                  ? colors!.warning
                  : colors!.success,
              }}
            >
              {`${isExpend ? "- ₹" : "+ ₹"}${amount ?? "NA"}`}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View>
            <Text style={{ color: colors!.text }}>
              {item.updatedDate
                ? dateFormat("DD MMM YY hh:mm a", item.updatedDate)
                : item.date
                ? dateFormat("DD MMM YY hh:mm a", item.date)
                : "NA"}
            </Text>
          </View>
          <View>
            <Text style={{ color: colors!.text }}>
              {`${
                item.methodType === "PATCH" ? "Updated" : "Added"
              } By ${stringTransform(item.user?.name ?? "NA", "C")} `}
            </Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

export default ActivityItem;
