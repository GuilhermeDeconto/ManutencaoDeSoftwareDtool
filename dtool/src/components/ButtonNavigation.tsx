import React from "react";
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import colors from "../utils/colors";
import sizes from "../utils/sizes";

export interface Props extends TouchableOpacityProps {
  type: "forward" | "back";
  disabled?: boolean;
}

const ButtonNavigation: React.FC<Props> = ({ type, disabled, ...props }) => {
  return (
    <TouchableOpacity style={styles.container} disabled={disabled} {...props}>
      <View style={styles.content}>
        {type === "forward" && (
          <>
            <Text style={[styles.text, disabled && styles.textDisabled]}>
              Próximo
            </Text>
            <Icon
              style={[styles.icon, disabled && styles.iconDisabled]}
              name="ios-arrow-forward"
            />
          </>
        )}

        {type === "back" && (
          <>
            <Icon
              style={[styles.icon, disabled && styles.iconDisabled]}
              name="ios-arrow-back"
            />
            <Text style={[styles.text, disabled && styles.textDisabled]}>
              Anterior
            </Text>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
  },
  content: {
    flexDirection: "row",
  },
  icon: {
    color: colors.text.primary,
    fontSize: sizes.headline.h1,
    paddingHorizontal: 8,
  },
  iconDisabled: {
    color: colors.text.tertiary,
  },
  text: {
    color: colors.text.primary,
    fontSize: sizes.buttonText.main,
    fontWeight: "500",
  },
  textDisabled: {
    color: colors.text.tertiary,
  },
});

export default ButtonNavigation;
