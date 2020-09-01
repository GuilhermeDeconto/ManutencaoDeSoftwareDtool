import React, { useEffect, useState } from "react";
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { getItem, removePatient } from "../services/localStorage";
import colors from "../utils/colors";
import { PacientList } from "../containers";
import { ButtonPlus } from "../components";
import { Patient } from "../services/types";

export interface ScreenProps {
  storageResult: Array<Record<string, any>>;
  navigation: StackNavigationProp<any, any>;
}

const ListPatient: React.FC<ScreenProps> = ({ navigation }) => {
  const [data, setData] = useState(null as any);

  useEffect(() => {
    async function getStorage() {
      let patientData = await getItem("@patient");
      if (patientData) {
        patientData = JSON.parse(patientData);
        if (Array.isArray(patientData)) setData(patientData);
      }
    }
    getStorage();
  }, []);

  const erasePacient = async (index: number) => {
    let currentList = await removePatient(index);
    if (currentList) {
      currentList = JSON.parse(currentList);
      setData(currentList);
    }
    return true;
  };

  const handleListPress = async (item: Patient) => {
    navigation.navigate("ChooseActivity", { pacient: item });
  };

  return (
    <SafeAreaView>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}
      >
        <View style={styles.body}>
          <View style={styles.main}>
            <PacientList
              data={data ?? []}
              onPressList={(item) => handleListPress(item)}
              onPressTrashIcon={(index) => erasePacient(index)}
            />
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonPlus}>
        <ButtonPlus
          onPress={() => navigation.navigate("AddPatient")}
          style={styles.iconPlus}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  body: {
    alignItems: "center",
    minHeight: Dimensions.get("window").height,
  },
  buttonPlus: {
    bottom: -70,
    position: "absolute",
    right: 50,
  },
  iconPlus: {
    alignSelf: "flex-end",
  },
  main: {
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-end",
  },
  scrollView: {
    backgroundColor: colors.basic.background,
  },
});

export default ListPatient;
