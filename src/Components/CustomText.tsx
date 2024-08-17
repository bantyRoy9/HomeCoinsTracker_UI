import { StyleSheet, Text, View } from 'react-native'
import React,{FC} from 'react'
import { useTheme } from 'react-native-paper'
import { defaultStyle } from '../Utils';
import { ICustomText } from './Types';

const CustomText:FC<ICustomText> = ({title,fontSize=15,color,style={},viewStyle={}}) => {
    const {colors} = useTheme() as any;
  return (
    <View style={viewStyle}>
      <Text style={[style,defaultStyle.text,{color:!style.hasOwnProperty('color')?colors.text:color?color:style.color, fontSize:fontSize}]}>{title}</Text>
    </View>
  )
}

export default CustomText

const styles = StyleSheet.create({

})