import { View, Text } from 'react-native'
import React, { FC } from 'react'
import { CustomText } from '../../Components';
import { UseAppSelector } from '../../Redux/Store';
import { IAnalysisData } from '../../Redux/type';

const AnalysisByMember: FC<any> = ({ analysisType, type }) => {
  const { analysis } = UseAppSelector(state => state);
  let data: IAnalysisData = analysis[`analysis${analysisType}`]

  return (
    <>
      <View>
        <CustomText title={data?.earn?.earnBySources[0]?._id?.sourceName ?? ""} />
      </View>
      <View>
        <CustomText title={data?.earn?.earnBySources[0]?._id?.sourceInv ?? ""} />
      </View>
      <View>
        <CustomText title={data?.earn?.earnBySources[0]?._id?.sourceType ?? ""} />
      </View>
      <View>
        <CustomText title={data?.earn?.totalearn ?? ""} />
      </View>
    </>
  )
}

export default AnalysisByMember