import React from "react";
import {
  TouchableOpacityProps,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import colors from "../utils/colors";
import { Button, CustomText } from "./ButtonExecutionsStyle"

export interface Props extends TouchableOpacityProps {
  disabled?: boolean;
  text: string;
  action: string;
}

const ButtonExecutions: React.FC<Props> = ({
  disabled,
  text,
  action,
  ...props
}) => {
  let iconName = "";

  switch (action) {
    case "start":
      iconName = "play-circle-outline";
      break;
    case "stop":
      iconName = "pause-circle-outline";
      break;
    case "cancel":
      iconName = "delete";
      break;
    case "finish":
      iconName = "save";
      break;
    case "restart":
      iconName = "play-circle-outline";
      break;
    case "upload":
      iconName = "file-upload";
      break;
    default:
      break;
  }

  const buttonStyle = [
    styles.base,
    action === "start" && styles.start,
    action === "stop" && styles.stop,
    action === "cancel" && styles.cancel,
    action === "finish" && styles.finish,
    action === "restart" && styles.restart,
    action === "upload" && styles.upload,
  ];

  return (
    <Button
      {...props}
      activeOpacity={0.8}
      disabled={disabled}
      style={[buttonStyle]}
    >
      <CustomText>{text}</CustomText>
      <Icon
        name={iconName}
        size={32}
        color={colors.basic.white}
        style={styles.icon}
      />
    </Button>
  );
};

const styles = StyleSheet.create({
  base: {
    alignItems: "center",
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    minHeight: 50,
    minWidth: 328,
    position: "relative",
  },
  cancel: {
    backgroundColor: colors.theme.failure,
  },
  finish: {
    backgroundColor: colors.theme.primary,
  },
  icon: {
    position: "absolute",
    right: 16,
  },
  restart: {
    backgroundColor: colors.text.header,
  },
  start: {
    backgroundColor: colors.theme.primary,
  },
  stop: {
    backgroundColor: colors.theme.accent,
  },
  upload: {
    backgroundColor: colors.theme.primary,
  },
});

export default ButtonExecutions;
