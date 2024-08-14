import { View, Text, StyleSheet, Pressable, GestureResponderEvent } from 'react-native'
import React, { useState } from 'react'
import { defaultStyle } from '../Utils'
import { useTheme } from 'react-native-paper'
import { ICustomerNavigationTabList } from './Types'
type TCustomNavigationTab = {
    tabs:ICustomerNavigationTabList[],
    tabHandler:((event: GestureResponderEvent) => void)
}
const CustomNavigationTab = ({tabs,tabHandler}:TCustomNavigationTab) => {
    const {colors} = useTheme() as any;
    // const tabs = [{expendType:"Source",active:true,details:{source:"",expendName:""}},{expendType:"Custom",active:false,details:{expendType:"",expendName:""}}];
const initialState = {
  details: tabs[0].details,
  activeTab:'Source',
  errors:{}
};
const [pageDetails,setPageDetails]=useState(initialState);
const defaultColors={
  backgroundColor:colors.btnPrimaryBackground,
  color:colors.btnPrimaryColor,
  borderRadius:10
}
    return (
        <View style={[defaultStyle.flexRow, styles.navContainer, { backgroundColor: colors.surfaceVariant, borderWidth: 0, borderColor: colors.borderSecondary }]}>
            {tabs.map(el => (
                <Pressable key={el.expendType} onTouchStart={() => tabHandler(el.expendType)} style={[defaultStyle.flex1, (el.expendType === pageDetails.activeTab) && defaultColors]}>
                    <Text style={[(el.expendType === pageDetails.activeTab) && defaultColors]}>{el.expendType}</Text>
                </Pressable>
          ))}
          </View>
        )
}
export default CustomNavigationTab
const styles = StyleSheet.create({
    navContainer:{}
})