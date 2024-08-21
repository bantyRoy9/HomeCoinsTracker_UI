import { View, Text } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { CustomText } from '../../Components';
import { UseAppSelector } from '../../Redux/Store';
import { Earn, Expend, IAnalysisData, Id, Id2 } from '../../Redux/type';
interface analysisDataType {
  heading:{name:string,photo:string,inv?:string,},
  expendType:any,

}
const AnalysisByMember: FC<any> = ({ analysisType, type }) => {
  const { analysis,analysis:{isIndvidualLoading} } = UseAppSelector(state => state);
  const [analysisData,setAnalysisData] = useState<analysisDataType>();
  let data:Earn | Expend = analysis[`analysis${analysisType}`][type];
  useEffect(()=>{

  },[])
  console.log(data,isIndvidualLoading,analysisType,type);
  
  return (<></>
    // analysisData && <View>
    //   <View>
    //     <CustomText title={analysisData.heading.name ?? ""} />
    //   </View>
    //   <View>
    //     <CustomText title={analysisData.earnBySources[0]?._id?.sourceInv ?? ""} />
    //   </View>
    //   <View>
    //     <CustomText title={analysisData.earnBySources[0]?._id?.sourceType ?? ""} />
    //   </View>
    //   <View>
    //     <CustomText title={analysisData.totalearn ?? ""} />
    //   </View>
    // </View>
  )
}

export default AnalysisByMember