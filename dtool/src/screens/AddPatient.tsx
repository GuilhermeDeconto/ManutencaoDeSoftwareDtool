import React, { useState } from "react";
import {
  Alert,
  Dimensions,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { addPatient } from "../services/localStorage";
import {
  PatientHeader,
  GenderSelect,
  InputText,
  ButtonPrimary,
} from "../components";

export interface ScreenProps {
  navigation: StackNavigationProp<any, any>;
  route?: { params: { id: string } };
}

const PatientScreen: React.FC<ScreenProps> = ({ navigation, route }) => {
  const [id, setId] = useState(route?.params?.id || "");
  const [name, setName] = useState("");
  const [sex, setSex] = useState("");

  const savePatientInfos = async () => {
    const patientInfos = { id, name, sex };
    if (!(await addPatient(patientInfos))) {
      Alert.alert("Este paciente já possui cadastro.");
    }
    navigation.navigate("ChooseActivity", { pacient: patientInfos });
  };

  const disabled =
    sex.trim().length === 0 ||
    id.trim().length === 0 ||
    name.trim().length === 0;

  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.body}>
          <View style={styles.topContainer}>
            <View>
              <PatientHeader
                patientInitials={name}
                patientID={id}
                patientSex={sex}
              />
            </View>
            <View style={styles.inputContainer}>
              <InputText
                autoFocus
                title="Prontuário"
                onChangeText={(key) => setId(key)}
                style={styles.input}
                value={id}
              />
              <InputText
                title="Iniciais"
                placeholder="ABC"
                onChangeText={(key) => setName(key)}
                style={styles.input}
              />
              <GenderSelect label="Sexo" onChange={(key) => setSex(key)} />
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <ButtonPrimary
              title="Salvar e continuar"
              disabled={disabled}
              onPress={savePatientInfos}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    height: Dimensions.get("screen").height,
    justifyContent: "space-between",
    minWidth: Dimensions.get("screen").width,
    paddingTop: "15%",
  },
  buttonContainer: {
    flex: 2 / 8,
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  input: {
    paddingBottom: "10%",
  },
  inputContainer: {
    alignItems: "center",
    paddingTop: "10%",
    width: "100%",
  },
  topContainer: { flex: 6 / 8 },
});

export default PatientScreen;
