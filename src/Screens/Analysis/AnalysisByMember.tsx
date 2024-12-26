import React, { FC, memo, useCallback } from 'react';
import { ActivityIndicator, FlatList, Image, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { CustomText } from '../../Components';
import { getAnalysisData } from '../../Redux/Action/analysisAction';
import { useAppDispatch, useAppSelector } from '../../Redux/Store';
import { Earn, Expend, Recentearn, Recentexpend } from '../../Redux/type';
import { dateFormat } from '../../Utils';
import { Tanalysis } from './type';

type AnalysisByMemberProps = {analysisType: Tanalysis['type'],type: 'earn' | 'expend',dataViewType: string};
type AnalysisData = {amount: number,date: string,name: string};
type bindAnalysisTy = { analysisName: string, total: number, analysisInv?: number, analysisPhoto?: string,analysisid:string};

const AnalysisByMember: FC<AnalysisByMemberProps> = ({ analysisType, type, dataViewType }) => {
  const { colors } = useTheme() as any,dispatch = useAppDispatch();
  const { analysis, analysis: { isIndvidualLoading } } = useAppSelector(state => state);
  const backgroundStyle = { backgroundColor: colors.background, color: colors.text };
  const styles = getStlyeSheet(colors);
  const data = analysis[`analysis${analysisType}` as keyof object]?.[type];

  const getAllData = useCallback((id:string)=>dispatch(getAnalysisData(false,analysisType,"",id)),[]);

  const renderAnalysisDetails= ({ item, index,length,isExpend }:{ item: AnalysisData; index: number; length: number,isExpend:boolean }) => (
    <View style={{ ...styles.activityLists, borderBottomColor: colors!.border, borderBottomWidth: length! - 1 > index! ? 1 : 0, }}>
      <View style={styles.activityList}>
        <CustomText style={{ color: colors!.text }} title={item.date ? dateFormat("DD MMM YY", item.date) : "NA"} />
        {analysisType !== "earnBy" && <CustomText title={item.name} style={{ color: colors!.text }} />}
        <CustomText title={`${isExpend ? "- ₹" : "+ ₹"}${item.amount}`} viewStyle={styles.activityRightSec} style={{ color: isExpend ? colors!.error : colors!.success }} />
      </View>
    </View>
  );

  const BindAnalysisDetails = ({ analysisName, analysisInv, total, analysisPhoto,analysisid }: bindAnalysisTy) => (
    <View style={styles.detailsContainer}>
      <View style={styles.activityProfileList}>
        <Image source={require("../../../Assets/profiles/default.png")} style={{ width: 80, height: 80, borderRadius: 50 }} />
      </View>
      <View style={styles.analysisdetails}>
        <CustomText fontSize={20} title={analysisName} style={{ fontWeight: '600' }} />
        {analysisInv && <CustomText title={`Investment : ${analysisInv || 'NA'}`} />}
        {total && <CustomText title={analysisType.includes('earn') ? `Earn : ${total}` : `Expend : ${total}`} />}
      </View>
      {analysisid && <Pressable onPress={()=>getAllData(analysisid)}>
        <CustomText title={'Get All'}/>
      </Pressable>}
    </View>
  );

  const AnalysisDetailContainer = ({ data, recentDetails }: { data: bindAnalysisTy, recentDetails: Recentearn[] | Recentexpend[] }) => {
    let isExpend:boolean = analysisType.includes("expend");
    const normalizedData: AnalysisData[] = recentDetails.map((item) => {
      if ("earnBy" in item) {
        const earnItem = item as Recentearn;
        return {
          amount: earnItem.amount,
          date: earnItem.date,
          name: earnItem.earnBy.name,
        };
      } else {
        const expendItem = item as Recentexpend;
        return {
          amount: expendItem.amount,
          date: expendItem.date,
          name: analysisType === "expendBy" ? expendItem.expendType.expendName : expendItem.expendBy.name,
        };
      }
    });
    return(
    <>
      <BindAnalysisDetails {...data} />
      <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}>
        <FlatList keyExtractor={(item, index) => `${item.name || index}`} scrollEnabled={true} data={normalizedData} renderItem={({item,index})=>renderAnalysisDetails({item,index,length:recentDetails.length,isExpend})} />
      </ScrollView>
    </>
  )}
  const earnDetailsbind = (earnDetails: Earn) => {
    if (!earnDetails) return null;
    let data = {} as bindAnalysisTy;
    if (analysisType === "source") {
      data['analysisName'] = earnDetails?.earnBySources[0]?._id?.sourceName ?? 'No Source';
      data['analysisInv'] = earnDetails?.earnBySources[0]?._id?.sourceInv;
      data['total'] = earnDetails?.earnBySources[0]?.totalAmount
    } else if (analysisType === "earnBy") {
      data['analysisName'] = earnDetails?.earnByMembers[0]?._id?.name ?? 'No Source';
      data['analysisPhoto'] = earnDetails?.earnByMembers[0]?._id?.photo;
      data['total'] = earnDetails?.earnByMembers[0]?.totalAmount
    }
    return <AnalysisDetailContainer data={data} recentDetails={earnDetails.recentearn} />
  };

  const expendDetailsBind = (expendDetails: Expend) => {
    if (!expendDetails) return null;
    const expendDetail = expendDetails.expendByTypes[0]?._id;
    const data = {} as bindAnalysisTy;
    if (analysisType === "expendType") {
      data['analysisName'] = expendDetails?.expendByTypes[0]?._id?.expendName ?? 'No Source';
      data['total'] = expendDetails?.expendByTypes[0]?.totalAmount
      data['analysisid'] = expendDetails?.expendByTypes[0]?._id.id
    } else if (analysisType === "expendBy") {
      data['analysisName'] = expendDetails?.expendByMembers[0]?._id?.name ?? 'No Source';
      data['analysisPhoto'] = expendDetails?.expendByMembers[0]?._id?.photo;
      data['total'] = expendDetails?.expendByMembers[0]?.totalAmount
    }
    return <AnalysisDetailContainer data={data} recentDetails={expendDetails.recentexpend} />
  };
  if (isIndvidualLoading || (data && !Object.keys(data).length)) {
    return <ActivityIndicator size="large" color={colors.primary} />;
  }

  return type === 'earn' ? earnDetailsbind(data as Earn) : expendDetailsBind(data as Expend);
};

export default memo(AnalysisByMember);
const getStlyeSheet = (colors: any) => {
  const styles = StyleSheet.create({
    detailsContainer: {
      display: 'flex',
      flexDirection: 'row',
      padding: 10,
      gap: 5,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: colors.card,
      backgroundColor: colors.card
    },
    activityProfileList: {
      height: 'auto',
      borderRadius: 50
    },
    analysisdetails: {
      // borderWidth:1,
      // borderColor:'#ddd',
      padding: 5,
      flex: 1,
    },

    activityLists: {
      paddingVertical: 15,
      gap: 10
    },
    activityList: {
      flexDirection: 'row',
      justifyContent: "space-between",
      alignItems: 'center',
    },
    activityLeftSec: {
      flexDirection: 'row', justifyContent: "space-between", gap: 10
    },
    activityRightSec: {},
  })
  return styles
};
