import React from "react";
import { Text, StyleSheet, View } from "react-native";
import colors from "../utils/colors";
import sizes from "../utils/sizes";

export interface Props {
  patientID?: string;
  patientInitials?: string;
  patientSex?: string;
}

const PatientHeader: React.FC<Props> = ({
  patientID,
  patientInitials,
  patientSex,
}) => {
  return (
    <View style={styles.patientHeaderView}>
      <View style={styles.avatar}>
        <Text numberOfLines={2} style={styles.textAvatar}>
          {patientInitials || "?"}
        </Text>
      </View>
      <View style={styles.headerVertical}>
        <Text style={styles.text}>
          {patientID || "Prontuário não informado"}
        </Text>
        <Text style={styles.textSecondary}>
          {patientSex || "Sexo não informado"}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    alignItems: "center",
    backgroundColor: colors.theme.primary,
    borderRadius: 40,
    height: 80,
    justifyContent: "center",
    width: 80,
  },
  headerVertical: {
    flexDirection: "column",
    flexWrap: "wrap",
    paddingLeft: 10,
  },
  patientHeaderView: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingHorizontal: "5%",
    width: "100%",
  },
  text: {
    color: colors.text.primary,
    fontSize: sizes.buttonText.label,
  },
  textAvatar: {
    color: colors.text.navigation,
    fontSize: sizes.buttonText.label,
  },
  textSecondary: {
    color: colors.text.secondary,
    fontSize: sizes.buttonText.note,
  },
});

export default PatientHeader;
