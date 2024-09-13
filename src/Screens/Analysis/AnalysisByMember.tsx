import React, { FC, memo } from 'react';
import { ActivityIndicator, ScrollView, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { CustomText } from '../../Components';
import { Earn, Expend } from '../../Redux/type';
import { defaultStyle } from '../../Utils';
const AnalysisByMember: FC<any> = ({ analysisType, type }) => {
  const { colors } = useTheme() as any;
  const { analysis, analysis: { isIndvidualLoading } } = useSelector((state: any) => state);
  const backgroundStyle = { backgroundColor: colors.background, color: colors.text };
  let data: Earn | Expend = analysis[`analysis${analysisType}`][type];
  const BindAnalysisActivityDetails = () => {
    return <></>
  }
  const BindAnalysisSubDetails = () => {
    return <></>
  }
  const BindAnalysisDetails = (analysisName: string, analysisType: string, analysisInv?: number,analysisPhoto?: string) => {
    const analysisDetails = <View>
      <CustomText title={analysisName} />
      <CustomText title={analysisType} />
      <CustomText title={analysisInv!} />
    </View>
    return analysisDetails
  };

  const earnDetailsbind = (earnDetails: Earn) => {
    if (!earnDetails) return;
    console.log(earnDetails, 'earnDetails');
    // const topDetails = BindAnalysisDetails();
    const earnDetailsLayout = <ScrollView>
        <View>
          {BindAnalysisDetails(earnDetails?.earnBySources[0]?._id?.sourceName,earnDetails?.earnBySources[0]?._id?.sourceType,earnDetails?.earnBySources[0]?._id?.sourceInv)}
        </View>
        <View>
          {BindAnalysisSubDetails()}
        </View>
        <View>
          {BindAnalysisActivityDetails()}
        </View>
      </ScrollView>;

    return earnDetailsLayout;
  };
  const expendDetailsBind = (expendDetais: Expend) => {
    if (!expendDetais) return;
    console.log(expendDetais, 'expendDetails');
    let analysisDetails = expendDetais.expendByTypes[0]?._id ?? {};
    const analysisDetailsEle = BindAnalysisDetails(analysisDetails?.expendName, analysisDetails?.expendType,)
    return <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}>
      <View style={defaultStyle.screenContainer}>
        <View>
          {analysisDetailsEle}
        </View>
      </View>
    </ScrollView>
  }
  return (isIndvidualLoading || (data && !Object.keys(data as any).length)) ? <ActivityIndicator /> : type == "earn" ? earnDetailsbind(data as Earn) : expendDetailsBind(data as Expend);
}

export default memo(AnalysisByMember)