import { View, Text, ActivityIndicator, ScrollView, Image } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { CustomText } from '../../Components';
import { UseAppSelector } from '../../Redux/Store';
import { Earn, Expend, IAnalysisData, Id, Id2 } from '../../Redux/type';
import { useSelector } from 'react-redux';
interface analysisDataType {
  heading:{name:string,photo:string,inv?:string,},
  expendType:any,

}
const AnalysisByMember: FC<any> = ({ analysisType, type }) => {
  const { analysis,analysis:{isIndvidualLoading} } = useSelector((state:any) => state);
  const [analysisData,setAnalysisData] = useState<analysisDataType>();
  const [data,setData] = useState<Earn | Expend>();
  useEffect(()=>{
    console.log(`analysis${analysisType}`,type);
    
    let data:Earn | Expend = analysis[`analysis${analysisType}`][type];
    setData(data);
  },[analysisType,type,isIndvidualLoading]);
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
    // console.log(expendDetais);
    
    return (expendDetais && expendDetais.expendByTypes && expendDetais.expendByTypes.length>0) && <ScrollView>
    <View>
      <CustomText title={expendDetais?.expendByTypes[0]?._id?.expendName}/>
      <CustomText title={expendDetais?.expendByTypes[0]?._id?.expendType}/>
      <CustomText title={expendDetais?.expendByTypes[0]?.totalAmount}/>
    </View>
  </ScrollView>
  }
  return (isIndvidualLoading || (data && !Object.keys(data as any).length)) ? <ActivityIndicator /> : type == "earn" ? earnDetailsbind(data as Earn) : expendDetailsBind(data as Expend);
}

export default AnalysisByMember