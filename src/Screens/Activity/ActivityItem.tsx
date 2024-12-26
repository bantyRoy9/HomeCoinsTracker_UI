import React from "react";
import { View, Text, Image, Pressable, StyleSheet, GestureResponderEvent } from "react-native";
import { dateFormat, defaultStyle, filterKeyIncludeArr, getElementByIndex, stringTransform } from "../../Utils";
import { CustomText } from "../../Components";

interface ActivityItemProps {
  item: ActivityItemType;
  index?: number;
  length?: number;
  colors?: Colors;
  styles?: any;
  onPress: (event: GestureResponderEvent) => void;
  source?: any[];
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

const ActivityItem: React.FC<ActivityItemProps> = ({ item, index, length, colors, styles, onPress, source }) => {
  const isExpend = item.Url === "/expend";
  const amount = isExpend ? item.addExpend?.amount : item.addEarn?.amount;
  const description = isExpend ? item.addExpend?.description ?? "NA" : stringTransform(getElementByIndex(filterKeyIncludeArr(source, "_id", item.addEarn?.source), 0, "sourceName"), "C");
  return (
    <View key={index} style={defaultStyle.screenContainer}>
      <Pressable style={{ ...styles.activityLists, borderBottomColor: colors!.border, borderBottomWidth: length! - 1 > index! ? 1 : 0, }} onPress={onPress}>
        <View style={styles.activityList}>
          <View style={styles.activityLeftSec}>
            <View style={styles.activityProfileList}>
              <Image source={require("../../../Assets/profiles/default.png")} style={{ width: 40, height: 40, borderRadius: 8 }} />
            </View>
            <View>
              <CustomText title={isExpend ? "Expend to" : "Earn By"} style={{ color: colors!.text }} />
              <CustomText title={description} style={{ color: colors!.text }} />
            </View>
          </View>
          <CustomText title={`${isExpend ? "- ₹" : "+ ₹"}${amount ?? "NA"}`} viewStyle={styles.activityRightSec} style={{ color: isExpend ? colors!.error : item.methodType === "PATCH" ? colors!.warning : colors!.success }} />
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <CustomText style={{ color: colors!.text }} title={item.updatedDate ? dateFormat("DD MMM YY hh:mm a", item.updatedDate) : item.date ? dateFormat("DD MMM YY hh:mm a", item.date) : "NA"} />
          <CustomText style={{ color: colors!.text }} title={`${item.methodType === "PATCH" ? "Updated" : "Added"} By ${stringTransform(item.user?.name ?? "NA", "C")} `} />
        </View>
      </Pressable>
    </View>
  );
};

export default ActivityItem;
