import React, { useState } from "react";
import {
  Alert,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { StackNavigationProp } from "@react-navigation/stack";
import colors from "../../utils/colors";
import { BasicList } from "../../components";

export interface ScreenProps {
  navigation: StackNavigationProp<any, any>;
}

let initialData = [
  {
    id: 1,
    name: "AVC",
    type: "CSV",
  },
  {
    id: 2,
    name: "LPCO",
    type: "CSV",
  },
  {
    id: 3,
    name: "LPCO",
    type: "CSV",
  },
];

const DocList: React.FC<ScreenProps> = () => {
  const [data] = useState(initialData);

  const handleListPress = (item: number) => {
    Alert.alert(`Selecionado: ${item}`);
  };

  const handleIconDownloadPress = (item: number) => {
    Alert.alert(`Download: ${item}`);
  };

  return (
    <SafeAreaView>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}
      >
        <View style={styles.body}>
          <View style={styles.main}>
            <BasicList
              docList={data}
              onPress={(item) => handleListPress(item)}
              onPressIconDownload={(item) => handleIconDownloadPress(item)}
              iconDownload={
                <Icon size={32} color={colors.theme.primary} name="get-app" />
              }
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
    flex: 1,
  },
  scrollView: {
    backgroundColor: colors.basic.background,
  },
});

export default DocList;
