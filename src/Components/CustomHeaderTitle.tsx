import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
interface ICustomHeaderTitle{
    title:string;
    type:string;
    colors:any;
}
const CustomHeaderTitle: React.FC<ICustomHeaderTitle> = ({title,type,colors}) => {
  return (
    <View>
        <Text style={{color:colors.text,fontWeight:'bold'}}>{title}</Text>
    </View>
  )
}

export default CustomHeaderTitle

const styles = StyleSheet.create({})