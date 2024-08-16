import { View, Text, StyleSheet, Pressable } from 'react-native';
import React, { memo } from 'react';
import { useTheme } from 'react-native-paper';
import { defaultStyle } from '../Utils';
import { TCustomNavigationTab } from './Types';

const CustomNavigationTab: React.FC<TCustomNavigationTab> = ({ tabs, tabHandler, activeTab }) => {
    const { colors } = useTheme() as any;
    const defaultColors = {
        backgroundColor: colors.btnPrimaryBackground,
        color: colors.btnPrimaryColor,
        borderRadius: 10,
    };
    return (
        <View style={[defaultStyle.flexRow, styles.navContainer, { backgroundColor: colors.surfaceVariant }]}>
            {tabs.map((el) => (
                <Pressable
                    key={el.tab}
                    onPress={() => tabHandler(el.tab)}
                    style={[
                        defaultStyle.flex1,
                        el.tab === activeTab && defaultColors,
                        styles.tab
                    ]}
                >
                    <Text style={[el.tab === activeTab && defaultColors, styles.tabText]}>
                        {el.tab}
                    </Text>
                </Pressable>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    navContainer: {
        marginBottom: 5,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5
    },
    tab: {
        justifyContent: 'center',
        alignItems: 'center',
        // padding: 10,
    },
    tabText: {
        fontSize: 16,
        textAlign: 'center',
    },
});

export default memo(CustomNavigationTab);
