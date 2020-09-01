import React from "react";
import { StyleSheet } from "react-native";
import { Textfield, TextfieldProps } from "react-native-material-kit";
import colors from "../utils/colors";

export type Props = TextfieldProps;

const InputCode = (props: any, ref: any) => {
  const [focused, setFocused] = React.useState(false);
  return (
    <Textfield
      {...props}
      autoCapitalize="characters"
      floatingLabelEnabled={false}
      highlightColor={colors.theme.primary}
      maxLength={1}
      onBlur={() => setFocused(false)}
      onFocus={() => setFocused(true)}
      placeholder="A"
      ref={ref}
      selectTextOnFocus
      style={styles.input}
      textInputStyle={styles.base}
      tint={focused ? colors.theme.primary : colors.basic.separator}
    />
  );
};

const styles = StyleSheet.create({
  base: {
    fontSize: 30,
    minWidth: 50,
    textAlign: "center",
    width: 50,
  },
  input: {
    marginHorizontal: 5,
  },
});

export default React.forwardRef(InputCode);
