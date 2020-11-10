import styled from 'styled-components/native';
import colors from "../utils/colors";
import { TouchableOpacity } from 'react-native-gesture-handler';


export const Button = styled(TouchableOpacity)`
alignItems: center,
borderRadius: 8,
flexDirection: row,
justifyContent: center,
minHeight: 50,
minWidth: 328,
position: relative,
`


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
text: {
  color: colors.basic.white,
    fontSize: sizes.buttonText.main,
      fontWeight: "600",
        left: 16,
          position: "absolute",
},
upload: {
  backgroundColor: colors.theme.primary,
},
