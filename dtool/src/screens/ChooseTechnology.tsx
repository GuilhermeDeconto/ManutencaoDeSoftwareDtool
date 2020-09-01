import React, { useEffect, useState } from "react";
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";

import * as localStorage from "../services/localStorage";
import colors from "../utils/colors";
import { BasicList } from "../components";
import { RememberOption } from "../containers";

export interface ScreenProps {
  navigation: StackNavigationProp<any, any>;
  route: any;
}

interface Technology {
  id: number;
  name: string;
}

const ChooseTechnology: React.FC<ScreenProps> = ({ route, navigation }) => {
  const [technologies, setTechnologies] = useState([] as Technology[]);
  useEffect(() => {
    (async () => {
      const data = await localStorage.getData();
      setTechnologies(data.technologies ?? []);
    })();
  }, []);

  let isChecked = false;
  const handleToggleChange = (value: boolean) => {
    isChecked = value;
  };

  const handleListPress = async (index: number) => {
    await localStorage.saveTechnology(technologies[index].id, isChecked);
    if (route.params?.running) {
      navigation.navigate("ChooseRole");
    } else {
      navigation.reset({ index: 0, routes: [{ name: "Home" }] });
    }
  };

  return (
    <SafeAreaView>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}
      >
        <View style={styles.body}>
          <View style={styles.main}>
            <RememberOption
              onValueChange={handleToggleChange}
              title="Lembrar tecnologia"
              tooltipText="Marque se este for o seu dispositivo pessoal."
            />
            <BasicList
              data={technologies.map((tech: Technology) => tech.name)}
              onPress={handleListPress}
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
  main: {
    alignItems: "center",
    flex: 6,
    marginVertical: 50,
  },
  scrollView: {
    backgroundColor: colors.basic.background,
  },
});

export default ChooseTechnology;
