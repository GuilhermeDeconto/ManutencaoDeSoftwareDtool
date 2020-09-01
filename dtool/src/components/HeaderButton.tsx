import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import colors from "../utils/colors";
import sizes from "../utils/sizes";

export interface Props extends TouchableOpacityProps {
  iconName: string;
  style?: ViewStyle;
}

const HeaderButton: React.FC<Props> = ({ iconName, style, ...props }) => {
  return (
    <TouchableOpacity style={styles.container} {...props}>
      <Text>
        <Icon style={[styles.icon, style]} size={32} name={iconName} />
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: 22,
  },
  icon: {
    alignSelf: "flex-end",
    color: colors.text.navigation,
    fontSize: sizes.headline.h1,
  },
});

export default HeaderButton;
