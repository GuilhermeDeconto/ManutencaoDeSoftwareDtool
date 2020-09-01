import React from "react";
import { StyleSheet } from "react-native";
import { Dropdown } from "react-native-material-dropdown";
import sizes from "../utils/sizes";

export interface Props {
  disabled?: boolean;
  label: string;
  onChange: (index: string) => void;
}

const GenderSelect: React.FC<Props> = ({ disabled, label, onChange }) => {
  const data = [
    {
      value: "Feminino",
    },
    {
      value: "Masculino",
    },
  ];

  return (
    <Dropdown
      containerStyle={styles.container}
      data={data}
      disabled={disabled}
      label={label}
      labelFontSize={sizes.buttonText.label}
      onChangeText={(index) => onChange(index)}
      fontSize={sizes.inputText.textField}
      value="Selecione"
    />
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    minHeight: 45,
    minWidth: "87%",
  },
});

export default GenderSelect;
