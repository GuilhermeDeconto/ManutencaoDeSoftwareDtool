import React from "react";
import { Dimensions, Text, StyleSheet, View, Image } from "react-native";
// o uso de rne-modal-tooltip é temporário, devido a https://github.com/react-native-elements/react-native-elements/issues/1871, substituir por react-native-elements quando disponível
import Tooltip from "rne-modal-tooltip";
import colors from "../utils/colors";
import sizes from "../utils/sizes";

export interface Props {
  tooltipText: string;
}

const containerSizer = (base: number) => {
  const screenWidth = Dimensions.get("screen").width;

  if (screenWidth > 500) {
    return base + 50;
  }
  if (screenWidth > 400) {
    return base + 30;
  }
  return base;
};

const TooltipIcon: React.FC<Props> = ({ tooltipText }) => {
  const text = <Text style={styles.tooltipTextStyle}>{tooltipText}</Text>;
  return (
    <View style={styles.container}>
      <Tooltip
        backgroundColor={colors.text.primary}
        height={containerSizer(30)}
        popover={text}
        width={containerSizer(200)}
        withOverlay={false}
      >
        <Image source={require("../assets/lampIcon.png")} />
      </Tooltip>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
  tooltipTextStyle: {
    color: colors.basic.separator,
    fontSize: sizes.buttonText.note,
    justifyContent: "center",
    textAlign: "center",
  },
});

export default TooltipIcon;
