import { Dimensions } from "react-native";

const fontSizer = (base: number) => {
  const screenWidth = Dimensions.get("screen").width;

  if (screenWidth > 500) {
    return base + 10;
  }
  if (screenWidth > 400) {
    return base + 5;
  }
  return base;
};

const headline = {
  h1: fontSizer(20),
  h5: fontSizer(15),
  h6: fontSizer(13),
};

const buttonText = {
  main: fontSizer(13),
  label: fontSizer(12),
  note: fontSizer(8),
};

const inputText = {
  title: fontSizer(15),
  textField: fontSizer(16),
};

export default { headline, buttonText, inputText };
