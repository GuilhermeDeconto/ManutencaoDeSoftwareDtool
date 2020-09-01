import React, { useState } from "react";
import { Text, StyleSheet, Switch, View } from "react-native";
import colors from "../utils/colors";
import sizes from "../utils/sizes";
import { TooltipIcon } from "../components";

export interface Props {
  onValueChange?: (value: boolean) => void;
  title: string;
  tooltipText: string;
}

const RememberOption: React.FC<Props> = ({
  onValueChange,
  title,
  tooltipText,
}) => {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => {
    setIsEnabled(!isEnabled);
    if (onValueChange) {
      onValueChange(!isEnabled);
    }
  };

  return (
    <View style={styles.rememberOptionView}>
      <View style={styles.tooltip}>
        <Text style={styles.text}>{title}</Text>
        <TooltipIcon tooltipText={tooltipText} />
      </View>
      <Switch
        style={styles.check}
        trackColor={{
          false: colors.text.secondary,
          true: colors.theme.primary,
        }}
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  check: {
    paddingLeft: 200,
  },
  rememberOptionView: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: "2%",
    width: "100%",
  },
  text: {
    color: colors.text.primary,
    fontSize: sizes.buttonText.label,
    paddingRight: 10,
  },
  tooltip: {
    flexDirection: "row",
  },
});

export default RememberOption;
