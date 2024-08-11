import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Dimensions, FlatList, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { Chart } from '../../Components';
import { getAnalysisData } from '../../Redux/Action/analysisAction';
import { FeatherIcons, dateFormat, defaultStyle, stringTransform, topHomeNavList } from '../../Utils';
const { width } = Dimensions.get('window');

const Analysis = () => {
  const dispatch = useDispatch();
  const {colors} = useTheme();
  const {analysisData, isLoading} = useSelector(state => state.analysis);
  const [dateRange, setDateRange] = useState(topHomeNavList.filter(el => el.active == true)[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  useEffect(() => {
    dispatch(getAnalysisData(dateRange.dateRange, false));
  }, [dateRange]);

  const navPressHandle = navPress => {
    topHomeNavList.map(el =>el.label === navPress.label ? (el.active = true) : (el.active = false));
    setDateRange(navPress);
  };
  useEffect(() => {
    // Automatically scroll to next item every 3 seconds
    const intervalId = setInterval(() => {
      scrollToNext();
    }, 5000);
    
    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [currentIndex]);
  const scrollToNext = () => {
    if (flatListRef.current) {
      const nextIndex = currentIndex + 1 < analysisData?.graphdata.length ? currentIndex + 1 : 0;
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
    <Pressable key={index} style={styles.summaryCard}>
      <View style={styles.activityProfileList}>
                        <Image source={require('../../../Assets/profiles/default.png')}
                            style={{ width: 40, height: 40, borderRadius: 8 }}
                        />
                    </View>
      <View>
        <View><Text>{item._id.name}</Text></View>
        <View><Text>₹{item.totalAmount}</Text></View>
    </View>
      </Pressable>
  );
  const renderItem = ({item, index}) => (
    <View key={index} style={styles.summaryCard}>
      <Pressable>
        {/* <View><Text>{item._id.sourceType}</Text></View> */}
        <View><Text>{item._id.sourceName}</Text></View>
        <View><Text>₹{item.totalAmount}</Text></View>
      </Pressable>
    </View>
  );

  const renderChartList = ({item, index}) => {
    let accessor = 'earn';
    if(index >1){
      accessor = 'expend'
    }
    return (
      <>
        <View style={{...styles.chartContiner}}>
          <View style={{justifyContent:'center',position:'relative'}}>
            <Chart graphData={item} chartType="barChart" accessor={accessor}/>
            <View style={{flexDirection:'row',position:'absolute',top:10,left:15,gap:5}}>
            {index <1 ? <Text>🟢</Text> :<Text>🔴</Text>}
            <Text style={{textAlign:'center',color:colors.HeaderBg,fontSize:12}}>{index==0?"Earn By Source":index==1?"Earn By Memebers":index==2?"Expend by types":"Expend By memebers"}</Text>
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
                        <Image source={require('../../../Assets/profiles/default.png')}
                            style={{ width: 40, height: 40, borderRadius: 8 }}
                        />
                    </View>
                    <View>
                        
                            <View><Text style={{ color: colors.text }}>Earn By</Text></View>
                            <View><Text style={{ color: colors.text }}>{item.sourceType?.sourceName}</Text></View>
                        
                    </View>
                </View>
                <View style={styles.activityRightSec}>
                    <Text style={{ color: colors.success }}>
                        {`${'+ ₹' + (item?.amount ?? "NA")} `}
                    </Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View>
                    <Text style={{ color: colors.text }}>{item.date ? dateFormat("DD MMM YY hh:mm a", item.date) : 'NA'}</Text>
                </View>
                <View>
                    <Text style={{ color: colors.text }}>{`Added By ${stringTransform(item.earnBy?.name, 'C')} `}</Text>
                </View>
            </View>
        </Pressable>
    </View>
);
  return (
    <>
      <View style={{ ...styles.navigationContainer,backgroundColor: colors.HeaderBg}}>
        {topHomeNavList.map((ele, idx) => ( ele.label !=="Daily" &&<Pressable onPress={() => navPressHandle(ele)} key={`${ele.label}_${idx}`} style={{flex: 1}}>
          <Text style={ele.active? {...styles.navText,color: colors.HeaderText,borderBottomColor: colors.notification,borderBottomWidth: 2} : {...styles.navText, color: colors.HeaderText}}>
              {ele.label}
          </Text>
        </Pressable>))}
        {/* <Pressable>
          <FeatherIcons name='sliders' size={20} color={colors.HeaderText}/>
        </Pressable> */}
      </View>
      {isLoading === false ? <>
        <ScrollView>
        <View>
          <FlatList
            horizontal
            ref={flatListRef}
            pagingEnabled
            data={analysisData.graphdata}
            keyExtractor={(item, indx) => indx.toString()}
            renderItem={renderChartList}
            onEndReachedThreshold={0.5}
            showsHorizontalScrollIndicator={false}
            decelerationRate="fast"
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={{ viewAreaCoveragePercentThreshold: 20 }}
          />
          <View style={styles.paginationContainer}>
            {analysisData.graphdata.map((_, idx) => (
              <View key={idx} style={[styles.dot,currentIndex === idx && styles.activeDot]}/>
            ))}
          </View>
        </View>

          <View style={styles.filterContainer}>
              <View style={styles.filterText}>
                <Text>Earn</Text>
                <Text>Expend</Text>
              </View>
          </View>
          <View style={defaultStyle.screenContainer}>
            <Text style={{color:colors.text,fontWeight:'bold'}}>Sources</Text>
          </View>
          <View>
            <FlatList
              data={analysisData.earn.earnBySources}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderItem}
              onEndReachedThreshold={0.5}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
          <View style={defaultStyle.screenContainer}>
            <Text style={{color:colors.text,fontWeight:'bold'}}>Memebers</Text>
          </View>
          <View>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={analysisData?.earn?.earnByMembers}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderItemByUser}
              onEndReachedThreshold={0.5}
              // ListFooterComponent={renderFooter}
            />
          </View>
          <View style={defaultStyle.screenContainer}>
            <Text style={{color:colors.text,fontWeight:'bold'}}>Recent Summary</Text>
          </View>
          <View style={{ flex: 1 }}>
            <FlatList
              data={analysisData.earn.recentearn}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderRecentItem}
              onEndReachedThreshold={0.5}
            />
          </View>
        </ScrollView>
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
    paddingHorizontal:10
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
    justifyContent:'space-evenly \
    6',
    padding:10
  },
  summaryCard:{
    backgroundColor:'rgba(1, 66, 131,0.1)',
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
});
