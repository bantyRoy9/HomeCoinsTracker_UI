import { View, Text, ActivityIndicator, ScrollView, Image } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { CustomText } from '../../Components';
import { UseAppSelector } from '../../Redux/Store';
import { Earn, Expend, IAnalysisData, Id, Id2 } from '../../Redux/type';
import { useSelector } from 'react-redux';
import { useTheme } from 'react-native-paper';
import { bindAnalysisDetailType } from '../../Utils/Conts';
import { defaultStyle } from '../../Utils';
interface analysisDataType {
  heading:{name:string,photo:string,inv?:string,},
  expendType:any,

}
const AnalysisByMember: FC<any> = ({ analysisType, type }) => {
  const { colors } = useTheme() as any;
  const { analysis,analysis:{isIndvidualLoading} } = useSelector((state:any) => state);
  const [data,setData] = useState<Earn | Expend>();
  const backgroundStyle = {backgroundColor: colors.background,color: colors.text};

  useEffect(()=>{
    let data:Earn | Expend = analysis[`analysis${analysisType}`][type];
    setData(data);
  },[analysisType,type,isIndvidualLoading]);
  const BindAnalysisActivityDetails = () =>{
    return<></>
  }
  const BindAnalysisSubDetails = () =>{
    return <></>
  }
  const BindAnalysisDetails=(analysisName:string,analysisType:string,analysisPhoto?:string,analysisInv?:number)=>{
    const analysisDetails = <View>
    <CustomText title={analysisName}/>
    <CustomText title={analysisType}/>
    <CustomText title={analysisInv!}/>
  </View>
    return analysisDetails
  }
  const earnDetailsbind = (earnDetails:Earn)=>{
    return(
      earnDetails.earnBySources.length>0 && <ScrollView>
        <View>
          <View>
            {/* <Image source={'/'}/> */}
          </View>
        <CustomText title={earnDetails?.earnBySources[0]?._id?.sourceName}/>
        <CustomText title={earnDetails?.earnBySources[0]?._id?.sourceInv}/>
        </View>
      </ScrollView>
    )
  };
  const expendDetailsBind = (expendDetais:Expend) =>{
    let analysisDetails=expendDetais.expendByTypes[0]?._id??{};
    const analysisDetailsEle = BindAnalysisDetails(analysisDetails?.expendName,analysisDetails?.expendType,)
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

export default AnalysisByMember