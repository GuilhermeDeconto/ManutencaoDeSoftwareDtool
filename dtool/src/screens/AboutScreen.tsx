import React from "react";
import {
  Dimensions,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import sizes from "../utils/sizes";
import colors from "../utils/colors";
import screens from "src/constants/screens";

export interface ScreenProps {
  navigation: StackNavigationProp<any, any>;
}

const AboutScreen: React.FC<ScreenProps> = () => {
  return (
    <ScrollView>
      <SafeAreaView>
        <View style={styles.body}>
          <View style={styles.mainView}>
            <Text style={styles.text}>{screens.AboutScreen.agesText}</Text>
          </View>
          <View style={styles.mainView}>
            <Text style={styles.textTopic}>Alunos:</Text>
            <Text style={styles.text}>
              Alex Brustolin Teixeira, Bianca Camargo, Bruno Marcelino, Camila
              Rocha, Eduardo André Soares, Felipe Silveira, Gabriel Gioscia
              Velloso, Igor Sgorla Brehm, Jessica Manoel, João Brentano, Lucas
              Castro, Marlon Furtado, Micael Fischmann, Rafael Araujo e Vinicius
              Branco.
            </Text>
          </View>
          <View style={styles.mainView}>
            <Text style={styles.textTopic}>Stakeholders:</Text>
            <Text style={styles.text}>
              Ana Paula Beck da Silva Etges e Ricardo Bertoglio Cardoso.
            </Text>
          </View>
          <View style={(styles.mainView, styles.inlineTitle)}>
            <Text style={styles.textTopic}>Professor Orientador:</Text>
            <Text style={styles.text}> Daniel Callegari</Text>
          </View>
          <View style={(styles.mainView, styles.inlineTitle)}>
            <Text style={styles.textTopic}>Semestre:</Text>
            <Text style={styles.text}> 2020/1</Text>
          </View>
          <View style={styles.image}>
            <Image source={require("../assets/logo-pucrs.png")} />
            <Image source={require("../assets/logo-ages.png")} />
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  body: {
    minHeight: Dimensions.get("window").height,
    padding: 10,
  },
  image: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  inlineTitle: {
    alignItems: "baseline",
    flexDirection: "row",
    marginVertical: 10,
  },
  mainView: {
    marginVertical: 10,
    textAlign: "left",
  },
  text: {
    alignItems: "flex-start",
    color: colors.text.primary,
    fontSize: 18,
    textAlign: "justify",
  },
  textTopic: {
    alignItems: "flex-start",
    color: colors.text.primary,
    fontSize: sizes.inputText.textField,
    fontWeight: "bold",
  },
});

export default AboutScreen;
