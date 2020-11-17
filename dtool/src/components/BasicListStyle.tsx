import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import colors from "../utils/colors";
import sizes from "../utils/sizes";

export const Container = styled(View)`
alignItems: center,
flexDirection: row,
paddingBottom: 200,
width: 100%,
`

export const IconButton = styled(TouchableOpacity)`
position: absolute,
right: 10,
`

export const TextItem = styled(Text)`
color: ${colors.text.primary},
flexDirection: row,
fontSize: ${sizes.buttonText.main},
fontStyle: normal,
fontWeight: normal,
padding: 16,
`

export const TextPatient = styled(Text)`
color: ${colors.text.primary},
flexDirection: row,
fontSize: ${sizes.buttonText.main},
fontStyle: normal,
fontWeight: normal,
padding: 16,
fontWeight: bold,
`

export const TextPatientSubtitle = styled(Text)`
color: ${colors.text.tertiary},
fontSize: ${sizes.buttonText.label},
flexDirection: row,
fontStyle: normal,
fontWeight: normal,
padding: 16,
`
