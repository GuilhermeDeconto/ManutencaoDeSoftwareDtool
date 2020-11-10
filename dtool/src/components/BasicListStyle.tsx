import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import colors from "../utils/colors";
import sizes from "../utils/sizes";

export const container = styled(View)`
alignItems: "center",
flexDirection: "row",
paddingBottom: 200,
width: "100%",
`

export const iconButton = styled(TouchableOpacity)`
position: "absolute",
right: 10,
`

export const textItem = styled(Text)`
color: ${colors.text.primary},
flexDirection: "row",
fontSize: ${sizes.buttonText.main},
fontStyle: "normal",
fontWeight: "normal",
padding: 16,
`

export const textPatient = styled(Text)`
color: ${colors.text.primary},
flexDirection: "row",
fontSize: ${sizes.buttonText.main},
fontStyle: "normal",
fontWeight: "normal",
padding: 16,
fontWeight: "bold",
`

export const textPatientSubtitle = styled(Text)`
color: ${colors.text.tertiary},
fontSize: ${sizes.buttonText.label},
flexDirection: "row",
fontStyle: "normal",
fontWeight: "normal",
padding: 16,
`
