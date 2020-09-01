import React from "react";
import { Text, TextProps, StyleSheet } from "react-native";
import colors from "../utils/colors";
import sizes from "../utils/sizes";

export interface Props extends TextProps {
  text?: string;
}

const ErrorText: React.FC<Props> = ({ text, ...props }) => (
  <Text {...props} style={styles.text}>
    {text}
  </Text>
);

const styles = StyleSheet.create({
  text: {
    color: colors.theme.failure,
    flexDirection: "row",
    fontSize: sizes.buttonText.label,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default ErrorText;
