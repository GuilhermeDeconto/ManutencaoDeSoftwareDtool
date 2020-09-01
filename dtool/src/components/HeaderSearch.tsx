import React from "react";
import { Text, StyleSheet, View } from "react-native";
import colors from "../utils/colors";

export interface Props {
  style?: object;
  title: string;
}

const HeaderSearch: React.FC<Props> = ({ title, style }) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, style]}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignContent: "stretch",
    flex: 1,
    justifyContent: "center",
  },
  text: {
    alignSelf: "stretch",
    color: colors.text.navigation,
    right: 10,
  },
});

export default HeaderSearch;
