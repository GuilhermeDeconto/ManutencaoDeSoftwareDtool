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
  route?: { params?: { isForReports: boolean } };
}

interface Role {
  id: number;
  name: string;
}

const ChooseRole: React.FC<ScreenProps> = ({ navigation, route }) => {
  const [roles, setRoles] = useState([] as Role[]);
  const isForReports = route?.params?.isForReports;

  useEffect(() => {
    (async () => {
      const data = await localStorage.getData();
      setRoles(data.roles ?? []);
    })();
  }, []);

  let isChecked = false;
  const handleToggleChange = (value: boolean) => {
    isChecked = value;
  };

  const handleListPress = async (index: number) => {
    await localStorage.saveRole(roles[index].id, roles[index].name, isChecked);
    if (isForReports) {
      navigation.navigate("ReportsScreen");
    } else {
      navigation.navigate("SelectPatient");
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
              title="Lembrar função"
              tooltipText="Marque se este for o seu dispositivo pessoal."
            />
            <BasicList
              data={roles.map((role) => role.name)}
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

export default ChooseRole;
