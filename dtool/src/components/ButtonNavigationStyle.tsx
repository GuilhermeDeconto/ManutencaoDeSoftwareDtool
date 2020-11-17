import styled from 'styled-components/native';
import colors from "../utils/colors";
import { TouchableOpacity } from 'react-native-gesture-handler';
import Text, { View } from 'react-native';
import sizes from "../utils/sizes";
import Icon from "react-native-vector-icons/Ionicons";

export const Container = styled(TouchableOpacity)`
paddingVertical: 8
`

export const ChildContainer = styled(View)`
flexDirection: row
`

export const CustomTextDisabled = styled(Text)`
color: ${colors.text.tertiary},
fontSize: ${sizes.buttonText.main},
fontWeight: 500,
`

export const CustomTextNormal = styled(Text)`
color: ${colors.text.primary},
fontSize: ${sizes.buttonText.main},
fontWeight: 500,
`

export const CustomItem = styled(Icon)`
color: ${colors.text.primary},
fontSize: ${sizes.headline.h1},
paddingHorizontal: 8,
`
export const CustomItemDisabled = styled(Icon)`
color: ${colors.text.primary},
fontSize: ${sizes.headline.h1},
paddingHorizontal: 8,
`
