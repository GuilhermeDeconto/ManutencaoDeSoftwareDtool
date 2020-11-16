import React from "react";
import {
  TouchableOpacityProps,
  StyleSheet,
  View,
} from "react-native";
import { Container, CustomTextDisabled, CustomItem, CustomTextNormal, CustomItemDisabled, ChildContainer } from "./ButtonNavigationStyle"

export interface Props extends TouchableOpacityProps {
  type: "forward" | "back";
  disabled?: boolean;
}

const ButtonNavigation: React.FC<Props> = ({ type, disabled, ...props }) => {
  return (
    <Container disabled={disabled} {...props}>
      <ChildContainer >
        {type === "forward" && (
          <>
            {!disabled &&
              <View>
                <CustomTextNormal>
                  Próximo
              </CustomTextNormal>
                <CustomItem
                  name="ios-arrow-forward"
                />
              </View>

            }
            {disabled &&
              <View>
                <CustomTextDisabled>
                  Próximo
              </CustomTextDisabled>
                <CustomItemDisabled
                  name="ios-arrow-forward"
                />
              </View>

            }
          </>
        )}

        {type === "back" && (
          <>
            {!disabled &&
              <View>
                <CustomTextNormal>
                  Anterior
              </CustomTextNormal>
                <CustomItem
                  name="ios-arrow-back"
                />
              </View>

            }
            {disabled &&
              <View>
                <CustomTextDisabled>
                  Anterior
              </CustomTextDisabled>
                <CustomItemDisabled
                  name="ios-arrow-back"
                />
              </View>

            }
          </>
        )}
      </ChildContainer>
    </Container>
  );
};

export default ButtonNavigation;
