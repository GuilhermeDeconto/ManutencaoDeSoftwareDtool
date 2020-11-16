import React from "react";
import {
  TouchableOpacityProps,
  StyleSheet,
  View,
} from "react-native";
import colors from "../utils/colors";
import { Container, CustomTextDisabled, CustomItem } from "./ButtonNavigationStyle"

export interface Props extends TouchableOpacityProps {
  type: "forward" | "back";
  disabled?: boolean;
}

const ButtonNavigation: React.FC<Props> = ({ type, disabled, ...props }) => {
  return (
    <Container disabled={disabled} {...props}>
      <View style={styles.content}>
        {type === "forward" && (
          <>
            <CustomTextDisabled style={disabled && styles.textDisabled}>
              Próximo
            </CustomTextDisabled>
            <CustomItem
              style={disabled && styles.iconDisabled}
              name="ios-arrow-forward"
            />
          </>
        )}

        {type === "back" && (
          <>
            <CustomItem
              style={disabled && styles.iconDisabled}
              name="ios-arrow-back"
            />
            <CustomTextDisabled style={disabled && styles.textDisabled}>
              Anterior
            </CustomTextDisabled>
          </>
        )}
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  content: {
    flexDirection: "row",
  },
  iconDisabled: {
    color: colors.text.tertiary,
  },
  textDisabled: {
    color: colors.text.tertiary,
  },
});

export default ButtonNavigation;
