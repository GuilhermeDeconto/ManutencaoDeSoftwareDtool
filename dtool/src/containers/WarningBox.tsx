import React from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import containers from "src/constants/containers";
import colors from "../utils/colors";
import sizes from "../utils/sizes";

export interface Props {
  handleBack?: () => void;
}

const WarningBox: React.FC<Props> = ({ handleBack }) => {
  return (
    <View style={styles.warning}>
      <Text style={styles.text}>{containers.WarningBox.principalText}</Text>
      <TouchableOpacity onPress={handleBack}>
        <Text style={styles.warningButton}>Tentar enviar agora</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: colors.text.primary,
    fontSize: sizes.buttonText.note,
    fontWeight: "bold",
    textAlign: "center",
  },
  warning: {
    alignItems: "center",
    backgroundColor: colors.theme.accent,
    borderRadius: 8,
    marginHorizontal: "10%",
    marginVertical: "2%",
    opacity: 0.7,
    padding: "2%",
  },
  warningButton: {
    color: colors.theme.failure,
    fontSize: sizes.buttonText.label,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});

export default WarningBox;
