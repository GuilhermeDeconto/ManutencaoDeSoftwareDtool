import React from "react";
import { Dimensions, SafeAreaView, StyleSheet, View, Text } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ButtonSecundary, ButtonExecutions } from "../../components";
import colors from "../../utils/colors";
import sizes from "../../utils/sizes";

export interface ScreenProps {
  navigation: StackNavigationProp<any, any>;
}

const AddTechnology: React.FC<ScreenProps> = ({ navigation }) => {
  return (
    <SafeAreaView>
      <View style={styles.body}>
        <Text style={styles.baseText}>
          Crie um arquivo baseado na{" "}
          <Text style={styles.bold}>documentação</Text> e{" "}
          <Text style={styles.bold}>exemplos</Text> disponíveis e importe para o
          aplicativo, para que seja utilizado na contagem de tempo das
          atividades.
        </Text>
        <View style={styles.buttonContainer}>
          <ButtonExecutions
            onPress={() => "nothingyet"}
            action="upload"
            text="Importar tecnologia"
          />
          <View style={styles.secondaryButton}>
            <ButtonSecundary
              title="Exemplos"
              onPress={() => navigation.navigate("DocList")}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  baseText: {
    color: colors.text.primary,
    fontSize: sizes.headline.h6,
    paddingBottom: "30%",
    paddingLeft: "5%",
    paddingRight: "5%",
    paddingTop: "5%",
    textAlign: "justify",
  },

  body: {
    flex: 1,
    height: Dimensions.get("screen").height,
    justifyContent: "space-between",
    minWidth: Dimensions.get("screen").width,
  },

  bold: {
    fontWeight: "bold",
  },

  buttonContainer: {
    padding: "5%",
  },

  secondaryButton: {
    paddingTop: "5%",
  },
});

export default AddTechnology;
