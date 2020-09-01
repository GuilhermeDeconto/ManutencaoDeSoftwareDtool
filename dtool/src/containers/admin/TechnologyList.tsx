import React from "react";
import { TouchableOpacityProps, StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { BasicList } from "../../components";
import colors from "../../utils/colors";
import sizes from "../../utils/sizes";

export interface Props extends TouchableOpacityProps {
  data?: string[];
  onPressTrashIcon: (item: number) => void;
  onPressList: (item: string) => void;
}

const TechnologyList: React.FC<Props> = ({
  data,
  onPressList,
  onPressTrashIcon,
}) => {
  return (
    <View style={styles.contanier}>
      <BasicList
        technologyList={data}
        onPress={(index) => onPressList((data ?? [])[index])}
        onPressTrashIcon={onPressTrashIcon}
        icon={<Icon style={styles.icon} name="delete-outline" />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  contanier: {
    alignItems: "center",
    flex: 1,
  },
  icon: {
    alignSelf: "flex-end",
    color: colors.theme.failure,
    fontSize: sizes.headline.h1,
    justifyContent: "flex-end",
    marginHorizontal: 10,
  },
});

export default TechnologyList;
