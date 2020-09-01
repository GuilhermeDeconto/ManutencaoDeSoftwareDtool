import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import colors from "../utils/colors";

export type Props = TouchableOpacityProps;

const ButtonPatientList: React.FC<Props> = ({ style, ...props }) => {
  return (
    <TouchableOpacity
      {...props}
      activeOpacity={0.5}
      style={[styles.container, style]}
    >
      <View>
        <Icon name="people" style={[styles.icon, style]} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.theme.primary,
    borderRadius: 70,
    bottom: 170,
    elevation: 5,
    height: 70,
    justifyContent: "center",
    position: "absolute",
    right: 20,
    shadowColor: colors.text.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.35,
    shadowRadius: 3,
    width: 70,
  },
  icon: {
    color: colors.basic.white,
    fontSize: 30,
    justifyContent: "center",
    paddingHorizontal: 22,
    width: 300,
  },
});

export default ButtonPatientList;
