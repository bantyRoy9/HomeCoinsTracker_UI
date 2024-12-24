import React, { FC, memo } from 'react';
import { ActivityIndicator, FlatList, ListRenderItem, ScrollView, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { CustomText } from '../../Components';
import { Earn, Expend, Recentearn } from '../../Redux/type';
import { defaultStyle } from '../../Utils';
import { useAppSelector } from '../../Redux/Store';
import { Tanalysis } from './type';
import ActivityItem from '../Activity/ActivityItem';

interface AnalysisByMemberProps {
  analysisType: Tanalysis['type'];
  type: 'earn' | 'expend';
  dataViewType:string
};
type bindAnalysisTy = {analysisName: string, analysisType: string, analysisInv?: number, analysisPhoto?: string}

const AnalysisByMember: FC<AnalysisByMemberProps> = ({ analysisType, type,dataViewType }) => {
  const { colors } = useTheme() as any;
  const { analysis, analysis: { isIndvidualLoading } } = useAppSelector(state => state);
  const backgroundStyle = { backgroundColor: colors.background, color: colors.text };

  // Extracting the analysis data based on the type
  const data = analysis[`analysis${analysisType}` as keyof object]?.[type];
  const renderAnalysisDetails:ListRenderItem<Recentearn> = ({ item, index }) =>(
    // <ActivityItem
    // item={{...item,Url:'/earn'}}
    //   index={index}
    //   // length={activity.length}
    //   colors={colors}
    //   // styles={styles}
    //   onPress={() => console.log("Activity pressed:", item)}
    //   // source={source}

    // />
    <></>
  )
  const BindAnalysisDetails = ({analysisName, analysisType, analysisInv, analysisPhoto}:bindAnalysisTy) => (
    <View>
      <CustomText title={analysisName} />
      <CustomText title={analysisType} />
      <CustomText title={analysisInv?.toString() ?? 'N/A'} />
    </View>
  );

  const earnDetailsbind = (earnDetails: Earn) => {
    if (!earnDetails) return null;
    let data = {} as bindAnalysisTy;
    if(analysisType === "source"){
      data['analysisName'] = earnDetails?.earnBySources[0]?._id?.sourceName ?? 'No Source';
      data['analysisType'] = earnDetails?.earnBySources[0]?._id?.sourceType ?? 'Unknown';
      data['analysisInv'] = earnDetails?.earnBySources[0]?._id?.sourceInv;
    }else if(analysisType === "earnBy"){
      data['analysisName'] = earnDetails?.earnByMembers[0]?._id?.name ?? 'No Source';
      data['analysisPhoto'] = earnDetails?.earnByMembers[0]?._id?.photo;
    }
    return (
      <ScrollView>
        <View>
          {BindAnalysisDetails(data)}
        </View>
        <View>
          <FlatList data={earnDetails.recentearn} renderItem={renderAnalysisDetails}/>
        </View>
      </ScrollView>
    );
  };

  const expendDetailsBind = (expendDetails: Expend) => {
    if (!expendDetails) return null;
    const expendDetail = expendDetails.expendByTypes[0]?._id;
    return (
      <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}>
        <View style={defaultStyle.screenContainer}>
          {/* {BindAnalysisDetails(expendDetail?.expendName ?? 'No Expenditure', expendDetail?.expendType ?? 'Unknown')} */}
        </View>
      </ScrollView>
    );
  };

  // Conditional rendering
  if (isIndvidualLoading || (data && !Object.keys(data).length)) {
    return <ActivityIndicator size="large" color={colors.primary} />;
  }

  return type === 'earn' ? earnDetailsbind(data as Earn) : expendDetailsBind(data as Expend);
};

export default memo(AnalysisByMember);
