import React from "react";
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
} from "react-native";
import colors from "../utils/colors";
import sizes from "../utils/sizes";

export interface Props extends TouchableOpacityProps {
  disabled?: boolean;
  title: string;
}

const ButtonPrimary: React.FC<Props> = ({ disabled, title, ...props }) => {
  const buttonStyle = disabled ? styles.buttonDisabled : styles.button;
  return (
    <TouchableOpacity
      {...props}
      activeOpacity={0.8}
      disabled={disabled}
      style={[styles.base, buttonStyle]}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: 8,
    justifyContent: "center",
    minHeight: 45,
  },
  button: {
    backgroundColor: colors.theme.primary,
  },
  buttonDisabled: {
    backgroundColor: colors.basic.separator,
  },
  text: {
    alignSelf: "center",
    color: colors.basic.background,
    fontSize: sizes.buttonText.main,
    fontWeight: "600",
  },
});

export default ButtonPrimary;
