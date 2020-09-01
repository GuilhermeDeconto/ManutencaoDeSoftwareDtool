import React, { useState } from "react";
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Alert,
  ActivityIndicator,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import colors from "../../utils/colors";
import { TechnologyList } from "../../containers";
import { ButtonPlus } from "../../components";

export interface ScreenProps {
  storageResult: Array<Record<string, any>>;
  navigation: StackNavigationProp<any, any>;
}

const ListTechnology: React.FC<ScreenProps> = ({ navigation }) => {
  const [data] = useState([
    "AVC",
    "Acidente de Trânsito",
    "ELA",
    "PEF",
    "Cirurgia Bariátrica",
  ]);

  const handleListPress = async (item: string) => {
    Alert.alert(`selecionado: ${item}`);
    // TODO: sincronizar com a API
  };

  const eraseTechology = (item: number) => {
    Alert.alert(`apagar: ${item}`);
    // TODO: sincronizar com a API
  };

  return (
    <SafeAreaView>
      {data ? (
        <>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}
          >
            <View style={styles.body}>
              <View style={styles.main}>
                <TechnologyList
                  data={data ?? []}
                  onPressList={(item) => handleListPress(item)}
                  onPressTrashIcon={(index) => eraseTechology(index)}
                />
              </View>
            </View>
          </ScrollView>
          <View style={styles.buttonPlus}>
            <ButtonPlus
              onPress={() => navigation.navigate("NewTechnology")}
              style={styles.iconPlus}
            />
          </View>
        </>
      ) : (
        <ActivityIndicator size="large" />
      )}
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

export default ListTechnology;
