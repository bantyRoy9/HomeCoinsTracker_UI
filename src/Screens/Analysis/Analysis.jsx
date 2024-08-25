import { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Dimensions, FlatList, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { Chart, CustomHeaderTitle, CustomNavigationTab, CustomText } from '../../Components';
import { getAnalysisData } from '../../Redux/Action/analysisAction';
import { FeatherIcons, dateFormat, defaultStyle, stringTransform, AnalysisNavList} from '../../Utils';
import Modal from '../../Components/Modal';
import AnalysisByMember from './AnalysisByMember';
const Analysis = () => {
  const dispatch = useDispatch(),{colors} = useTheme();
  const tabs = [{tab:"earn",active:true,details:{}},{tab:"expend",active:false,details:{}}];
  const {analysisData,analysisSource,analysisEarnBy,analysisExpendBy,analysisExpendType, isLoading} = useSelector(state => state.analysis);
  const [dateRange, setDateRange] = useState(AnalysisNavList.filter(el => el.active == true)[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);
  const [activeTab, setActiveTab] = useState(tabs[0].tab);
  const [analysisType,setAnalysisType] = useState({type:'',id:''});
  const [modalVisible,setModalVisible] = useState(false);

  const handleTabChange = useCallback((expendType) => setActiveTab(expendType), []);
  const modalVisibleHandler = useCallback((type, id) => {
    typeof(type) == 'string' && setAnalysisType({ type, id });
    setModalVisible(prev => !prev);
  }, []);

  const navPressHandle = useCallback((navPress) => {
    AnalysisNavList.forEach(el => el.active = el.label === navPress.label);
    setDateRange(navPress);
  }, []);

  useEffect(() => {
    if (dateRange) {
      dispatch(getAnalysisData(dateRange.dateRange, false, analysisType.type, analysisType.id));
    }
  }, [dateRange, analysisType.id]);

  // useEffect(() => {
  //   const intervalId = setInterval(scrollToNext, 5000);
  //   return () => clearInterval(intervalId);
  // }, [currentIndex]);

  const scrollToNext = () => {
    if (flatListRef.current && analysisData?.graphdata.length) {
      const nextIndex = currentIndex + 1 < analysisData.graphdata.length ? currentIndex + 1 : 0;
      flatListRef.current.scrollToIndex({ animated: true, index: nextIndex });
      setCurrentIndex(nextIndex);
    }
  };

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

 

  const renderItemByUser = ({item, index}) => (
    <Pressable key={index} style={[styles.summaryCard,{backgroundColor:colors.card}]} onPress={()=>modalVisibleHandler(activeTab=='earn'?'earnBy':'expendBy',item._id.id)}>
      <View style={styles.activityProfileList}>
        <Image source={require('../../../Assets/profiles/default.png')} style={{ width: 40, height: 40, borderRadius: 8 }}/>
      </View>
      <View>
      <CustomText title={item._id.name}/>
      <CustomText title={`₹${item.totalAmount}`}/>
      </View>
    </Pressable>
  );
  const renderItemBySources = ({item, index}) => (
    <View key={index} style={[styles.summaryCard,{backgroundColor:colors.card}]}>
      <Pressable onPress={()=>modalVisibleHandler(activeTab=='earn'?'source':'expendType',item._id.id)}>
        <CustomText title={item._id[activeTab=='earn'?'sourceName':'expendName']}/>
        <CustomText title={`₹${item.totalAmount}`}/>
      </Pressable>
    </View>
  );

  const renderChartList = ({item, index}) => {
    let accessor = 'earn';
    if(index >1) accessor = 'expend';
    return (
      <>
        <View style={{...styles.chartContiner}}>
          <View style={{justifyContent:'center',position:'relative'}}>
            <Chart graphData={item} chartType="barChart" accessor={accessor}/>
            <View style={{flexDirection:'row',position:'absolute',top:18,left:18,gap:5}}>
            {index <1 ? <Text>🟢</Text> :<Text>🔴</Text>}
            <Text style={{textAlign:'center',color:colors.text,fontSize:13}}>{index==0?"Earn By Source":index==1?"Earn By Memebers":index==2?"Expend by types":"Expend By memebers"}</Text>
            </View>
          </View>
        </View>
      </>
    );
  };
  const renderRecentItem = ({ item, index }) => (
    <View key={index} style={defaultStyle.screenContainer}>
        <Pressable style={{ ...styles.activityLists, borderBottomColor: colors.border, borderBottomWidth: analysisData.earn.recentearn.length - 1 > index ? 1 : 0 }}>
            <View style={styles.activityList}>
                <View style={styles.activityLeftSec}>
                    <View style={styles.activityProfileList}>
                        <Image source={require('../../../Assets/profiles/default.png')} style={{ width: 40, height: 40, borderRadius: 8 }}/>
                    </View>
                    <View>
                        <CustomText style={{ color: colors.text }} title={`${stringTransform(activeTab,'C')} ${activeTab==='earn'?'By':'To'}`}/>
                        <CustomText style={{ color: colors.text }} title={activeTab == 'earn'?item.sourceType.sourceName:item.expendType?.expendName}/>
                    </View>
                </View>
                <CustomText viewStyle={styles.activityRightSec} style={{ color: colors.success }} title={`${'+ ₹' + (item?.amount ?? "NA")} `}/>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View>
                    <Text style={{ color: colors.text }}>{item.date ? dateFormat("DD MMM YY hh:mm a", item.date) : 'NA'}</Text>
                </View>
                <View>
                    <Text style={{ color: colors.text }}>{`Added By ${stringTransform(item[activeTab=='earn'?'earnBy':'expendBy']?.name, 'C')} `}</Text>
                </View>
            </View>
        </Pressable>
    </View>
);

  return (
    <>
      <View style={{ ...styles.navigationContainer,backgroundColor: colors.HeaderBg}}>
        {AnalysisNavList.map((ele, idx) => ( ele.label !=="Daily" &&<Pressable onPress={() => navPressHandle(ele)} key={`${ele.label}_${idx}`} style={{flex: 1}}>
          <CustomText title={ele.label} style={ele.active? {...styles.navText,color: colors.HeaderText,borderBottomColor: colors.notification,borderBottomWidth: 2} : {...styles.navText, color: colors.HeaderText}}/>
        </Pressable>))}
      </View>
      {isLoading === false ? <> 
      <ScrollView>
        {/* Chart container */}
        <View>
          <FlatList horizontal ref={flatListRef} pagingEnabled data={analysisData.graphdata} keyExtractor={(item, indx) => indx.toString()} renderItem={renderChartList} onEndReachedThreshold={0.5} showsHorizontalScrollIndicator={false} decelerationRate="fast" onViewableItemsChanged={onViewableItemsChanged} viewabilityConfig={{ viewAreaCoveragePercentThreshold: 20 }}/>
          <View style={styles.paginationContainer}>
            {analysisData?.graphdata?.map((_, idx) => (<View key={idx} style={[styles.dot,currentIndex === idx && styles.activeDot]}/>))}
          </View>
        </View>
        {/* summary container */}
        <View style={defaultStyle.screenContainer}>
          <CustomNavigationTab tabs={tabs} activeTab={activeTab} tabHandler={handleTabChange} />
          <CustomHeaderTitle colors={colors} title={activeTab == 'earn'?'Sources':'Expend Types'}/>
          <FlatList data={analysisData[activeTab][`${activeTab}${activeTab == 'earn'?'BySources':'ByTypes'}`]} keyExtractor={(item, index) => index.toString()} renderItem={renderItemBySources} onEndReachedThreshold={0.5} horizontal showsHorizontalScrollIndicator={false}/>
          <CustomHeaderTitle colors={colors} title='Memebers'/>
          <FlatList horizontal showsHorizontalScrollIndicator={false} data={analysisData[activeTab][`${activeTab}ByMembers`]} keyExtractor={(item, index) => index.toString()} renderItem={renderItemByUser} onEndReachedThreshold={0.5}/>
          <CustomHeaderTitle colors={colors} title='Recent Summary'/>
          <FlatList data={analysisData[activeTab][`recent${activeTab}`]} keyExtractor={(item, index) => index.toString()} renderItem={renderRecentItem} onEndReachedThreshold={0.5}/>
        </View>
        </ScrollView>
        <Modal Component={<AnalysisByMember type={activeTab} analysisType={analysisType.type}/>} style={{height:200}} modalVisible={modalVisible} modalVisibleHandler={modalVisibleHandler} onDelete={false} />
        </>
       : <View style={defaultStyle.activityIndicator}><ActivityIndicator size="large" color={colors.text} /></View>
      }
    </>
  );
};

export default Analysis;

const styles = StyleSheet.create({
  navigationContainer: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  navText: {
    textAlign: 'center',
    ...defaultStyle.text,
    paddingVertical: 12,
  },
  chartContiner: {
    display: 'flex',
    flexDirection: 'row',
    // paddingHorizontal:10
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 5,
  },
  dot: {
    height: 2,
    width: 15,
    backgroundColor: 'rgba(1, 66, 131,0.1)',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: 'rgba(1, 66, 131,.8)', // Change to your theme color
  },
  filterContainer:{

  },
  filterText:{
    flexDirection:'row',
    justifyContent:'space-evenly',
    padding:10
  },
  summaryCard:{
    borderWidth:1,
    borderColor:'rgba(1, 66, 131,0.1)',
    paddingVertical:10,
    flexDirection:'row',
    paddingHorizontal:10,
    gap:10,
    marginVertical:5,
    marginHorizontal:5,     
    borderRadius:10 
    // width:width-30
  },
  activityLists: {
    paddingVertical: 15,
    gap: 10
},
activityList: {
    flexDirection: 'row', justifyContent: "space-between", alignItems: 'center'
},
activityLeftSec: {
    flexDirection: 'row', justifyContent: "space-between", gap: 10
},
activityRightSec: {},
activityProfileList: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: "#3d3d3d"
},
navContainer:{
  marginBottom:5,
  paddingVertical:5,
  paddingHorizontal:10,
  borderRadius:5
}
});
