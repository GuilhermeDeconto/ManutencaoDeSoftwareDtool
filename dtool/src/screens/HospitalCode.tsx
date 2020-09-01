import React from "react";
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Text,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { StackNavigationProp } from "@react-navigation/stack";

import * as appService from "../services/appService";

import colors from "../utils/colors";
import sizes from "../utils/sizes";

import { ButtonPrimary, ErrorText } from "../components";
import { CodeEntry } from "../containers";

export interface ScreenProps {
  navigation: StackNavigationProp<any, any>;
}

const HospitalCode: React.FC<ScreenProps> = ({ navigation }) => {
  const [code, setCode] = React.useState("");
  const [codeError, setCodeError] = React.useState("");

  const validateCode = async () => {
    try {
      const permission = await appService.processAccessCode(code);

      if (permission === "time-tracking") {
        navigation.navigate("ChooseTechnology");
      } else {
        navigation.reset({ index: 0, routes: [{ name: "Home" }] });
      }
    } catch (error) {
      if (error.message === "not-found") {
        setCodeError("Código de hospital inválido");
      } else if (error.message === "network") {
        setCodeError("Problema de conexão");
      } else {
        setCodeError("Tente novamente");
      }
    }
  };

  const clearError = () => setCodeError("");

  return (
    <SafeAreaView>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}
      >
        <View style={styles.body}>
          <View style={styles.main}>
            <Icon name="business" size={64} color={colors.text.primary} />
            <Text style={styles.description}>Informe o código de acesso:</Text>
            <CodeEntry
              onComplete={(value) => setCode(value)}
              onChange={clearError}
            />
            <ErrorText text={codeError} style={styles.error} />
          </View>
          <View style={styles.footer}>
            <ButtonPrimary
              title="Confirmar"
              disabled={code.trim().length === 0}
              onPress={() => validateCode()}
            />
          </View>
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
  description: {
    color: colors.text.primary,
    fontSize: sizes.headline.h5,
  },
  error: {
    flex: 1,
  },
  footer: {
    alignContent: "flex-end",
    flex: 3,
    paddingHorizontal: 16,
    paddingVertical: 20,
    width: "100%",
  },
  main: {
    alignItems: "center",
    flex: 5,
    marginVertical: 50,
  },
  scrollView: {
    backgroundColor: colors.basic.background,
  },
});

export default HospitalCode;
