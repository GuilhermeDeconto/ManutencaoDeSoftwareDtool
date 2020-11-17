import styled from 'styled-components/native';
import colors from "../utils/colors";
import { TouchableOpacity } from 'react-native-gesture-handler';
import Text from 'react-native';
import sizes from "../utils/sizes";


export const Button = styled(TouchableOpacity)`
alignItems: center,
borderRadius: 8,
flexDirection: row,
justifyContent: center,
minHeight: 50,
minWidth: 328,
position: relative,
`

export const CustomText = styled(Text)`
color: ${colors.basic.white},
fontSize: ${sizes.buttonText.main},
fontWeight: 600,
left: 16,
position: absolute,
`
