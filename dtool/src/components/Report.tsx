import React from "react";
import { BarChart } from "react-native-chart-kit";
import {
  TouchableOpacityProps,
  StyleSheet,
  View,
  Dimensions,
  Text,
} from "react-native";
import sizes from "../utils/sizes";
import { Metrics } from "../services/types";

export interface Props extends TouchableOpacityProps {
  title: string;
  metrics: Metrics;
}

const Report: React.FC<Props> = ({ title, metrics }) => {
  const data = {
    labels: ["Menor", "Mediana", "Maior"],
    datasets: [
      {
        data: [
          metrics.minimumDuration,
          metrics.medianDuration,
          metrics.maximumDuration,
        ],
      },
    ],
  };

  return (
    <View>
      <View>
        <Text style={styles.text}>{title}</Text>
      </View>
      <View>
        <BarChart
          data={data}
          width={Dimensions.get("window").width}
          height={Math.min(400, Dimensions.get("window").height * 0.7)}
          yAxisLabel=""
          yAxisSuffix="min"
          fromZero
          chartConfig={{
            backgroundColor: "#1CC910",
            backgroundGradientFrom: "#EFF3FF",
            backgroundGradientTo: "#EFEFEF",
            color: (opacity = 1) => `rgba(0, 0, 156, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              alignContent: "center",
              alignItems: "center",
            },
          }}
          showBarTops
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: sizes.buttonText.main,
    textAlign: "center",
  },
});

export default Report;
