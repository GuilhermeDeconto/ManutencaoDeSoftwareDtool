import React, { ReactElement } from "react";
import {
  FlatList,
  View
} from "react-native";
import { Doc, Patient } from "../services/types";
import ErrorText from "./ErrorText";
import { Container, IconButton,  TextItem,  TextPatient, TextPatientSubtitle } from "./BasicListStyle";

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
    <Container>
      {data?.length ||
      patientList?.length ||
      technologyList?.length ||
      docList?.length ? (
        <FlatList
          data={data || patientList || technologyList || docList}
          renderItem={({ item, index }) =>
            patientList || technologyList || docList ? (
              <Container>
                <IconButton
                  onPress={() => {onPress && onPress(index)}}
                >
                  <TextPatient>
                    {item?.name || item}
                  </TextPatient>
                  <TextPatientSubtitle>
                    {!technologyList && (item?.type || `${item?.id} |`)}{" "}
                    {item?.sex}
                  </TextPatientSubtitle>
                </IconButton>
                {icon && (
                  <IconButton
                    activeOpacity={0.9}
                    onPress={() => {onPressTrashIcon && onPressTrashIcon(index)}}
                  >
                    {icon}
                  </IconButton>
                )}
                {iconDownload && (
                  <IconButton
                    activeOpacity={0.9}
                    onPress={() => {onPressIconDownload && onPressIconDownload(index)}}
                  >
                    {iconDownload}
                  </IconButton>
                )}
              </Container>
            ) : (
              <View>
                <IconButton
                  onPress={() => {onPress && onPress(index)}}
                >
                  <TextItem >{item}</TextItem>
                </IconButton>
              </View>
            )
          }
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <ErrorText text={components.BasicList.errorText} />
      )}
    </Container>
  );
};

export default BasicList;
