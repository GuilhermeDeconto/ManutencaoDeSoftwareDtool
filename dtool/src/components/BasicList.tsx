import React, { ReactElement } from "react";
import {
  StyleSheet,
  FlatList,
  View,
  TouchableOpacity,
  Text,
} from "react-native";
import { Doc, Patient } from "../services/types";
import sizes from "../utils/sizes";
import colors from "../utils/colors";
import ErrorText from "./ErrorText";

import components from "src/constants/components";

export interface Props {
  data?: Array<any>;
  docList?: Doc[];
  patientList?: Patient[];
  technologyList?: string[];
  onPress?: (index: number) => void;
  onPressTrashIcon?: (item: number) => void;
  onPressIconDownload?: (item: number) => void;
  icon?: ReactElement;
  iconDownload?: ReactElement;
}

const BasicList: React.FC<Props> = ({
  data,
  icon,
  iconDownload,
  onPress,
  onPressTrashIcon,
  onPressIconDownload,
  patientList,
  docList,
  technologyList,
}) => {
  return (
    <View style={styles.contanier}>
      {data?.length ||
      patientList?.length ||
      technologyList?.length ||
      docList?.length ? (
        <FlatList
          data={data || patientList || technologyList || docList}
          renderItem={({ item, index }) =>
            patientList || technologyList || docList ? (
              <View style={styles.itemContainer}>
                <TouchableOpacity
                  style={styles.itemContainer}
                  onPress={() => onPress!(index)}
                >
                  <Text style={[styles.item, styles.patientName]}>
                    {item?.name || item}
                  </Text>
                  <Text style={[styles.item, styles.patientSubtitle]}>
                    {!technologyList && (item?.type || `${item?.id} |`)}{" "}
                    {item?.sex}
                  </Text>
                </TouchableOpacity>
                {icon && (
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => onPressTrashIcon!(index)}
                    style={styles.iconButton}
                  >
                    {icon}
                  </TouchableOpacity>
                )}
                {iconDownload && (
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => onPressIconDownload!(index)}
                    style={styles.iconButton}
                  >
                    {iconDownload}
                  </TouchableOpacity>
                )}
              </View>
            ) : (
              <View>
                <TouchableOpacity
                  style={styles.itemContainer}
                  onPress={() => onPress!(index)}
                >
                  <Text style={styles.item}>{item}</Text>
                </TouchableOpacity>
              </View>
            )
          }
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <ErrorText text={components.BasicList.errorText} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  contanier: {
    alignItems: "center",
    flexDirection: "row",
    paddingBottom: 200,
    width: "100%",
  },
  iconButton: {
    position: "absolute",
    right: 10,
  },
  item: {
    color: colors.text.primary,
    flexDirection: "row",
    fontSize: sizes.buttonText.main,
    fontStyle: "normal",
    fontWeight: "normal",
    padding: 16,
  },
  itemContainer: {
    alignItems: "center",
    borderBottomColor: colors.basic.separator,
    borderBottomWidth: 1,
    flexDirection: "row",
    width: "100%",
  },
  patientName: {
    fontWeight: "bold",
  },
  patientSubtitle: {
    color: colors.text.tertiary,
    fontSize: sizes.buttonText.label,
  },
});

export default BasicList;
