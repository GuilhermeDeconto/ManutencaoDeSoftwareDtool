import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
} from "react-native";
import { IconDelete } from "./ButtonDeleteStyle";

export type Props = TouchableOpacityProps;

const ButtonDelete: React.FC<Props> = ({ ...props }) => {
  return (
    <TouchableOpacity {...props}>
      <Text>
        <IconDelete name="delete-outline" />
      </Text>
    </TouchableOpacity>
  );
};
export default ButtonDelete;
