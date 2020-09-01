import React from "react";
import { View, Dimensions, StyleSheet, SafeAreaView } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { BarcodeCamera } from "../containers";
import colors from "../utils/colors";
import { ButtonPlus, ButtonPatientList } from "../components";
import { getPatient } from "../services/localStorage";

export interface ScreenProps {
  navigation: StackNavigationProp<any, any>;
}

const handleChange = async (
  barcode: string,
  navigation: StackNavigationProp<any, any>
) => {
  const item = await getPatient(barcode);
  if (item) navigation.navigate("ChooseActivity", { pacient: item });
  else navigation.navigate("AddPatient", { id: barcode });
};

const SelectPatient: React.FC<ScreenProps> = ({ navigation }) => (
  <SafeAreaView>
    <View style={styles.body}>
      <BarcodeCamera onChange={(barcode) => handleChange(barcode, navigation)}>
        <ButtonPatientList onPress={() => navigation.navigate("ListPatient")} />
        <ButtonPlus onPress={() => navigation.navigate("AddPatient")} />
      </BarcodeCamera>
    </View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  body: {
    alignItems: "center",
    color: colors.text.navigation,
    minHeight: Dimensions.get("window").height,
  },
});

export default SelectPatient;
