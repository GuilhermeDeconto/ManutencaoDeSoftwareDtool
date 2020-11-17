import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Metrics } from "../services/types";
import { getSession, getPreferences } from "../services/localStorage";
import { ButtonNavigation, Report } from "../components";
import { getReports } from "../services/appService";
import colors from "../utils/colors";
import screens from "src/constants/screens";

export interface ScreenProps {
  navigation: StackNavigationProp<any, any>;
}

const ReportsScreen: React.FC<ScreenProps> = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([] as Metrics[]);
  const [index, setIndex] = useState(0 as number);

  useEffect(() => {
    (async () => {
      const { technology, role } = {
        ...(await getSession()),
        ...(await getPreferences()),
      };

      if (!role) {
        navigation.navigate("ChooseRole", { isForReports: true });
        return;
      }

      const reports = await getReports(technology as number, role);
      const metrics = reports
        .filter((metric) => {
          return (
            metric.minimumDuration &&
            metric.medianDuration &&
            metric.maximumDuration
          );
        })
        .map((report) => {
          return {
            activity: report.activity,
            minimumDuration: report.minimumDuration,
            medianDuration: report.medianDuration,
            maximumDuration: report.maximumDuration,
          };
        }) as Metrics[];

      setData(metrics);
      setLoading(false);
    })();
  }, []);

  const handlePressPrevious = () => {
    if (index === 0) {
      setIndex(data.length - 1);
    } else {
      setIndex(index - 1);
    }
  };

  const handlePressNext = () => {
    if (index === data.length - 1) {
      setIndex(0);
    } else {
      setIndex(index + 1);
    }
  };

  return (
    <SafeAreaView style={styles.main}>
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
        </View>
      )}
      {!loading && (data || []).length === 0 && (
        <View style={styles.emptyStateContainer}>
          <Text style={styles.emptyStateText}>
            {screens.ReportsScreen.semExecucoesText}
          </Text>
        </View>
      )}
      {!loading && (data || []).length > 0 && (
        <>
          <Text style={styles.textSummary}>
            {screens.ReportsScreen.sumarioText}
          </Text>
          <Text style={styles.textTitle}>
            {screens.ReportsScreen.metricasText}
          </Text>
          <View style={styles.graph}>
            <Report
              title={data ? data[index].activity : ""}
              metrics={data[index]}
            />
          </View>
          {data.length > 1 && (
            <View style={styles.navigation}>
              <ButtonNavigation
                type="back"
                onPress={handlePressPrevious}
                disabled={index === 0}
              />
              <ButtonNavigation
                type="forward"
                onPress={handlePressNext}
                disabled={index === data.length - 1}
              />
            </View>
          )}
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  emptyStateContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  emptyStateText: {
    color: colors.text.primary,
    fontSize: 16,
    textAlign: "center",
  },
  graph: {
    flex: 1,
    justifyContent: "space-around",
  },
  loadingContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  main: {
    flex: 1,
    flexDirection: "column",
  },
  navigation: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textSummary: {
    color: colors.text.primary,
    fontSize: 16,
    paddingBottom: 10,
    paddingHorizontal: 8,
    paddingTop: 10,
    textAlign: "justify",
  },
  textTitle: {
    color: colors.text.primary,
    fontSize: 16,
    fontWeight: "bold",
    paddingBottom: 10,
    paddingHorizontal: 8,
    paddingTop: 10,
    textAlign: "justify",
  },
});

export default ReportsScreen;
