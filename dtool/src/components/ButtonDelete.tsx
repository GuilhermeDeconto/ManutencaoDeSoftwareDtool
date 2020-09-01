import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../utils/colors";

export type Props = TouchableOpacityProps;

const ButtonDelete: React.FC<Props> = ({ ...props }) => {
  return (
    <TouchableOpacity {...props}>
      <Text>
        <Icon style={styles.ButtonDelete} name="delete-outline" />
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  ButtonDelete: {
    alignSelf: "flex-end",
    color: colors.theme.failure,
    fontSize: 30,
    justifyContent: "flex-end",
    marginHorizontal: 10,
  },
});

export default ButtonDelete;
