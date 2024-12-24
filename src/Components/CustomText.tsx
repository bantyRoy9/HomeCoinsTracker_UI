import { StyleSheet, Text, View } from 'react-native';
import React, { FC, memo } from 'react';
import { useTheme } from 'react-native-paper';
import { defaultStyle } from '../Utils';
import { ICustomText } from './Types';

const CustomText: FC<ICustomText> = ({ title, fontSize = 15, color, style, viewStyle = {} }) => {
  const { colors } = useTheme() as any;
  return (
    <View style={viewStyle}>
      <Text style={[style,defaultStyle.text,{ color: style!?.color || color || colors.text, fontSize: fontSize }]}>{title}</Text>
    </View>
  );
};

export default memo(CustomText);

const styles = StyleSheet.create({
  // Add any custom styles here if needed
});
