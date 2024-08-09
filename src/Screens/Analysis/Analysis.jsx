import { useEffect, useLayoutEffect, useState } from "react";
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { useTheme } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { getAnalysisData } from "../../Redux/Action/analysisAction";
import { defaultStyle } from "../../Utils";
import { Chart } from "../../Components";

const Analysis = () =>{
    const dispatch = useDispatch();
    const [data,setData] = useState([]);
    const { colors } = useTheme();
    const {analysisData,isLoading} = useSelector(state=>state.analysis);
    const [activeTab,setActiveTab] = useState('earn');
    const [filterQuery,setFilterQuery] = useState({});
    useEffect(()=>{
        dispatch(getAnalysisData("2023-01-01_2024-08-10",false));
    },[activeTab]);
    useEffect(()=>{
      if(analysisData){
        let colorList = [colors.HeaderBg,colors.inverseSurface,colors.error];
        let data = analysisData?.earn?.earnBySources?.map((el,ind)=>({
            name: el._id.sourceName,
            population: parseFloat(el.totalAmount),
            color: colorList[ind],
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        }))??[];
        console.log(data,"analysis");
        setData(data);
      }
    },[analysisData]);
    const renderItemByUser = ({item,index}) =>(
      <View key={index} style={defaultStyle.screenContainer}>
        <Pressable>
          <View><Text>{item._id.name}</Text></View>
          <View><Text>₹{item.totalAmount}</Text></View>
        </Pressable>
      </View>
    )
    const renderItem = ({item,index}) =>(
      <View key={index} style={defaultStyle.screenContainer}>
        <Pressable>
          <View><Text>{item._id.sourceType}</Text></View>
          <View><Text>{item._id.sourceName}</Text></View>
          <View><Text>₹{item.totalAmount}</Text></View>
        </Pressable>
      </View>
    )
    return(
        <>{
        isLoading ? <View style={defaultStyle.activityIndicator}><ActivityIndicator size="large" color={colors.text} /></View>:
        <>
        <View style={defaultStyle.screenContainer}>
             <Chart graphData={data} chartType="barChart"/>
        </View>
        {analysisData &&<><View>
        <FlatList
            data={analysisData?.earn?.earnBySources}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
            onEndReachedThreshold={0.5}
            horizontal={true}
            // ListFooterComponent={renderFooter}
                />
        </View>
        <View>
        <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={analysisData?.earn?.earnByMembers}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItemByUser}
            onEndReachedThreshold={0.5}
            // ListFooterComponent={renderFooter}
                />
        </View></>}
       
        </>}
    </>
    )
};

export default Analysis;

const styles = StyleSheet.create({
    chartContiner:{

    }
});