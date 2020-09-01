import React, { useState, useEffect } from "react";
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  View,
  ScrollView,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { BasicList, PatientHeader } from "../components";

import colors from "../utils/colors";
import * as localStorage from "../services/localStorage";
import { Activity, Patient } from "../services/types";

export interface ScreenProps {
  navigation: StackNavigationProp<any, any>;
  route?: { params: { pacient: Patient } };
}

const PatientScreen: React.FC<ScreenProps> = ({ navigation, route }) => {
  const [activities, setActivities] = useState([] as Activity[]);
  const patient = route?.params?.pacient;

  useEffect(() => {
    (async () => {
      const savedActivities = await localStorage.getActivities();
      setActivities(savedActivities);
    })();
  }, []);

  const handleListPress = (index: number) => {
    const activity = activities[index];
    if (activity) {
      navigation.reset({
        index: 0,
        routes: [
          {
            name: "CarouselScreen",
            params: {
              patientId: patient?.id,
              activityName: activity?.name,
              activityId: activity?.id,
            },
          },
        ],
      });
    }
  };

  return (
    <SafeAreaView>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}
      >
        <View style={styles.header}>
          <PatientHeader
            patientInitials={patient?.name}
            patientID={patient?.id}
            patientSex={patient?.sex}
          />
        </View>
        <View style={styles.body}>
          <BasicList
            data={activities.map((activity) => activity.name)}
            onPress={handleListPress}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  body: {
    alignItems: "center",
    minHeight: Dimensions.get("window").height,
  },
  header: {
    marginBottom: 20,
    marginTop: 20,
  },
  scrollView: {
    backgroundColor: colors.basic.background,
  },
});

export default PatientScreen;
