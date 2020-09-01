import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from "react-native";
import colors from "../utils/colors";
import sizes from "../utils/sizes";

export interface Props extends TextInputProps {
  title?: string;
  placeholder?: string;
  style?: ViewStyle;
}

const InputText: React.FC<Props> = ({
  title,
  placeholder,
  style,
  ...props
}) => {
  const [focused, setFocused] = React.useState(false);
  return (
    <View style={[styles.view, style]}>
      <Text
        style={[
          styles.title,
          {
            color: focused ? colors.theme.primary : colors.text.secondary,
          },
        ]}
      >
        {title}
      </Text>
      <TextInput
        {...props}
        autoCapitalize="characters"
        clearButtonMode="while-editing"
        onBlur={() => setFocused(false)}
        onFocus={() => setFocused(true)}
        placeholder={placeholder}
        selectTextOnFocus
        style={[styles.fieldBase, focused ? styles.focus : styles.noFocus]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  fieldBase: {
    fontSize: sizes.inputText.textField,
    textAlign: "left",
  },
  focus: {
    borderBottomColor: colors.theme.primary,
    borderBottomWidth: 2.5,
  },
  noFocus: {
    borderBottomColor: colors.text.secondary,
    borderBottomWidth: 1.5,
  },
  title: {
    color: colors.theme.primary,
    fontSize: sizes.buttonText.label,
    marginBottom: "-2%",
  },
  view: {
    width: "87%",
  },
});

export default InputText;
