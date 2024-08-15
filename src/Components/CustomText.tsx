import { StyleSheet, Text, View } from 'react-native'
import React,{FC} from 'react'
import { useTheme } from 'react-native-paper'
import { defaultStyle } from '../Utils';
import { ICustomText } from './Types';

const CustomText:FC<ICustomText> = ({title,fontSize=15,color,style={}}) => {
    const colors = useTheme() as any;
  return (
    <View>
      <Text style={[style,defaultStyle.text,{color:color || colors.text,fontSize:fontSize}]}>{title}</Text>
    </View>
  )
}

export default CustomText

const styles = StyleSheet.create({

})