import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import { useDispatch } from "react-redux";

const Analysis = () =>{
    const dispatch = useDispatch();
    const [data,setData] = useState();
    const [chartDate,setChartData] = useState([]);
    const {color} = useTheme();
    useEffect(()=>{
        dispatch(getAnalysisData());
    },[])
    return(
        <View style={styles.chartContiner}>

        </View>
    )
};

export default Analysis;

const styles = StyleSheet.create({
    chartContiner:{

    }
});