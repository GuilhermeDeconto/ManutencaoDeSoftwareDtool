import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import colors from "../utils/colors";

export type Props = TouchableOpacityProps;

const ButtonPlus: React.FC<Props> = ({ style, ...props }) => {
  return (
    <TouchableOpacity
      {...props}
      activeOpacity={0.5}
      style={[styles.container, style]}
    >
      <View>
        <Text style={styles.text}>+</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.theme.primary,
    borderRadius: 70,
    bottom: 90,
    elevation: 5,
    height: 70,
    justifyContent: "center",
    position: "absolute",
    right: 20,
    shadowColor: colors.text.primary,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.35,
    shadowRadius: 3,
    width: 70,
  },
  text: {
    color: colors.text.navigation,
    fontSize: 20,
    textAlign: "center",
  },
});

export default ButtonPlus;
