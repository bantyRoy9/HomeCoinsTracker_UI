import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  useColorScheme,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import {LineChart, PieChart} from 'react-native-chart-kit';
import {Rect, Svg, Text as TextSVG} from 'react-native-svg';
import {useTheme} from 'react-native-paper';
import {ScreenWidth} from 'react-native-elements/dist/helpers';

const Chart = ({graphData, chartType = 'lineChart', accessor}) => {
  const [tooltip, setTooltip] = useState({
    x: 0,
    y: 0,
    visible: false,
    value: 0,
    color: '',
  });
  const {colors} = useTheme();
  const backgroundStyle = {
    backgroundColor: colors.card,
    color: colors.text,
  };

  return (
    <ScrollView horizontal={true}>
      {chartType == 'lineChart' ? (
        <LineChart
          verticalLabelRotation={18}
          data={graphData}
          width={Dimensions.get('window').width - 30}
          height={220}
          yAxisLabel="₹"
          yAxisSuffix=""
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: '#000',
            backgroundGradientFrom: '#000',
            backgroundGradientTo: backgroundStyle.backgroundColor,
            decimalPlaces: 0, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            // propsForDots: {
            //   r: "5",
            //   strokeWidth: "1",
            //   stroke: "red"
            // }
          }}
          bezier
          style={{
            borderRadius: 16,
          }}
          decorator={() => {
            return tooltip.visible ? (
              <View>
                <Svg>
                  <Rect
                    x={tooltip.x - 15}
                    y={tooltip.y + 10}
                    width="40"
                    height="30"
                    fill={tooltip.color}
                  />
                  <TextSVG
                    x={tooltip.x + 5}
                    y={tooltip.y + 30}
                    fill="white"
                    fontSize="16"
                    fontWeight="bold"
                    textAnchor="middle">
                    {tooltip.value}
                  </TextSVG>
                </Svg>
              </View>
            ) : null;
          }}
          onDataPointClick={data => {
            let isSamePoint = tooltip.x === data.x && tooltip.y === data.y;
            isSamePoint
              ? setTooltip(previousState => {
                  return {
                    ...previousState,
                    value: data.value,
                    visible: !previousState.visible,
                    color: data.colorCode,
                  };
                })
              : setTooltip({
                  x: data.x,
                  value: data.value,
                  y: data.y,
                  visible: true,
                  color: data.getColor(),
                });
          }}
        />
      ) : (
        <>
          <PieChart
            data={graphData}
            // height={250-100}
            hasLegend={true}
            avoidFalseZero={true}
            width={Dimensions.get('window').width-20}
            height={200}
            yAxisLabel="₹"
            yAxisSuffix=""
            style={{
              paddingVertical: 10,
              backgroundColor: 'rgba(1, 66, 131,0.1)',
              borderRadius: 10,
              marginTop: 10,
              marginHorizontal: 10,

            }}
            chartConfig={{
              strokeWidth: 20,
              horizontalLabelRotation: 100,
              propsForLabels: {fontSize: 20},
              verticalLabelsHeightPercentage: 10,
              color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
              // strokeWidth: 2, // optional, default 3
              // barPercentage: 0.5,
              useShadowColorFromDataset: false, // optional

              propsForVerticalLabels: {
                styles: {
                  backgroundColor: 'red',
                },

                fontStyle: {backgroundColor: 'red'},
              },
              propsForHorizontalLabels: {
                styles: {
                  backgroundColor: 'red',
                },
                fontStyle: {backgroundColor: 'red'},
              },
            }}
            accessor={accessor}
            backgroundColor={'transparent'}
            // padding={28}
          />
        </>
      )}
    </ScrollView>
  );
};

export default Chart;

const styles = StyleSheet.create({});
