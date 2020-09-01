import React, { useEffect, useState } from "react";
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import * as localStorage from "../services/localStorage";
import colors from "../utils/colors";
import { WarningBox } from "../containers";
import { ButtonPrimary, ButtonSecundary } from "../components";
import { downloadReport, syncExecutions } from "../services/appService";

export interface ScreenProps {
  navigation: StackNavigationProp<any, any>;
  route?: any;
}

const HospitalInformation: React.FC<ScreenProps> = ({ navigation }) => {
  const [hospitalName, setHospitalName] = useState("Hospital não nomeado");
  const [permission, setPermission] = useState("");
  const [pendingExecs, setPendingExecs] = useState(false);
  const [isLoadingReport, setIsLoadingReport] = useState(false);

  useEffect(() => {
    (async () => {
      const { institution } = await localStorage.getData();
      setHospitalName(institution?.name ?? "Hospital não nomeado");

      const auth = await localStorage.getAuth();
      setPermission(auth.permission);

      const list = await localStorage.getFinishedExecutions();
      if (Array.isArray(list) && list.length > 0) {
        setPendingExecs(true);
      }
    })();
  }, []);

  const showMessage = (): Promise<boolean> => {
    return new Promise((resolve) => {
      Alert.alert(
        "Sem conexão",
        "Não foi possível conectar a internet, tente novamente mais tarde.",
        [
          {
            text: "Ok",
            style: "default",
            onPress: () => {
              resolve(true);
            },
          },
        ],
        {
          cancelable: true,
          onDismiss: () => {
            resolve(true);
          },
        }
      );
    });
  };

  const handleBack = async () => {
    if (pendingExecs) {
      try {
        await syncExecutions();
        setPendingExecs(false);
      } catch (error) {
        if (error.message === "network") {
          await showMessage();
        } else {
          throw error;
        }
      }
      return;
    }
    localStorage.clear();
    navigation.reset({ index: 0, routes: [{ name: "HospitalCode" }] });
  };

  const mainButtonAction = async () => {
    if (permission === "time-tracking") {
      const { role } = await localStorage.getPreferences();
      if (role) {
        navigation.navigate("SelectPatient");
      } else {
        navigation.navigate("ChooseRole");
      }
    } else navigation.navigate("ListTechnology");
  };

  const secondaryButtonAction = async () => {
    if (permission === "time-tracking") {
      const { role } = await localStorage.getPreferences();
      if (role) {
        navigation.navigate("ReportsScreen");
      } else {
        navigation.navigate("ChooseRole", { isForReports: true });
      }
    } else {
      setIsLoadingReport(true);
      try {
        await downloadReport();
      } catch (error) {
        Alert.alert(
          "Falha ao baixar relatório",
          "Tente novamente mais tarde.",
          [{ text: "OK", style: "default" }]
        );
      }
      setIsLoadingReport(false);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.main}
      >
        <View style={styles.main}>
          <View style={[styles.image, styles.headerContainer]}>
            <Image
              style={styles.image}
              source={require("../assets/logo-SVG.png")}
            />
          </View>
          <View style={styles.imageTime}>
            <Image
              style={styles.imageTime}
              source={require("../assets/time-SVG.png")}
            />
          </View>
          <Text style={styles.textHospital}>{hospitalName}</Text>
          <Text style={styles.text}>
            Coleta de tempo de atividades hospitalares
          </Text>
          <View style={styles.iniciateButton}>
            <ButtonPrimary
              title={
                permission === "time-tracking"
                  ? "Iniciar Contagem"
                  : "Tecnologias"
              }
              onPress={mainButtonAction}
            />
          </View>
          <View
            style={
              pendingExecs === true
                ? styles.variableButtonNoPad
                : styles.variableButton
            }
          >
            <ButtonSecundary
              disabled={isLoadingReport}
              style={
                pendingExecs === true
                  ? styles.variableButtonNoPad
                  : styles.variableButton
              }
              title={
                permission === "time-tracking"
                  ? "Consultar Relatórios"
                  : "Exportar Relatório"
              }
              onPress={secondaryButtonAction}
            />
          </View>
          <View style={styles.aboutButton}>
            <ButtonPrimary
              title="Sobre o App"
              onPress={() => navigation.navigate("AboutScreen")}
            />
          </View>
          {pendingExecs && <WarningBox handleBack={handleBack} />}
          <View>
            <TouchableOpacity
              style={
                pendingExecs === true ? styles.fadedButton : styles.outButton
              }
              onPress={handleBack}
              disabled={pendingExecs}
            >
              <Text
                style={
                  pendingExecs === true ? styles.fadedButton : styles.outButton
                }
              >
                Sair
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  aboutButton: {
    alignContent: "center",
    justifyContent: "center",
    paddingBottom: 10,
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  fadedButton: {
    alignContent: "center",
    alignItems: "center",
    color: colors.text.secondary,
    fontSize: 16,
    justifyContent: "center",
    paddingBottom: 20,
    paddingTop: 40,
  },
  headerContainer: {
    elevation: 20,
  },
  image: {
    alignItems: "flex-start",
    backgroundColor: colors.theme.primary,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    justifyContent: "center",
    marginBottom: 20,
    paddingLeft: 20,
  },
  imageTime: {
    alignItems: "flex-end",
    elevation: 20,
    justifyContent: "center",
    marginBottom: 15,
    marginTop: -35,
    paddingRight: 15,
    position: "relative",
  },
  iniciateButton: {
    alignContent: "center",
    justifyContent: "center",
    paddingBottom: 10,
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  main: {
    backgroundColor: colors.basic.background,
    flexDirection: "column",
    flex: 6,
    minHeight: Dimensions.get("window").height,
    minWidth: Dimensions.get("window").width,
  },
  outButton: {
    alignContent: "center",
    alignItems: "center",
    color: colors.theme.primary,
    fontSize: 16,
    justifyContent: "center",
    paddingBottom: 20,
  },
  text: {
    color: colors.text.secondary,
    fontSize: 15,
    paddingHorizontal: 16,
    textAlign: "center",
  },
  textHospital: {
    color: colors.text.primary,
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: 1,
    paddingHorizontal: 16,
    textAlign: "center",
  },
  variableButton: {
    alignContent: "center",
    paddingBottom: 60,
    paddingHorizontal: 16,
  },
  variableButtonNoPad: {
    alignContent: "center",
    // paddingBottom: 60,
    paddingHorizontal: 16,
  },
});

export default HospitalInformation;
