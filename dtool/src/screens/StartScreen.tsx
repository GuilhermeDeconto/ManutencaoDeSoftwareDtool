import React, { useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";

import * as appService from "../services/appService";

export interface ScreenProps {
  navigation: StackNavigationProp<any, any>;
}

const StartScreen: React.FC<ScreenProps> = ({ navigation }) => {
  const showFirstScreen = async () => {
    const firstScreen = await appService.startupScreen();

    switch (firstScreen) {
      case "execution":
        navigation.reset({ index: 0, routes: [{ name: "CarouselScreen" }] });
        break;
      case "home":
        navigation.reset({ index: 0, routes: [{ name: "Home" }] });
        break;
      case "readCode":
        navigation.reset({ index: 0, routes: [{ name: "HospitalCode" }] });
        break;
      case "technology":
        navigation.reset({ index: 0, routes: [{ name: "ChooseTechnology" }] });
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    showFirstScreen();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ActivityIndicator size="large" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
});

export default StartScreen;
