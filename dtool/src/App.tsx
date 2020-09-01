import "react-native-gesture-handler";
import React from "react";
import { Provider } from "react-redux";

import { StatusBar, YellowBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import store from "./store";

import { HeaderButton, HeaderSearch } from "./components";
import {
  AddPatient,
  AddTechnology,
  AboutScreen,
  CarouselScreen,
  ChooseActivity,
  ChooseRole,
  ChooseTechnology,
  DocList,
  HospitalCode,
  HospitalInformation,
  StartScreen,
  SelectPatient,
  ListPatient,
  ListTechnology,
  ReportsScreen,
} from "./screens";
import colors from "./utils/colors";
import sizes from "./utils/sizes";
import * as localStorage from "./services/localStorage";

YellowBox.ignoreWarnings(["AsyncStorage has been extracted"]);

const Stack = createStackNavigator();

const addNewProcedure = async (navigation: StackNavigationProp<any, any>) => {
  const { technology, role } = await localStorage.getPreferences();
  if (!technology) {
    navigation.navigate("ChooseTechnology", { running: "AaddActivity" });
  } else if (!role) {
    navigation.navigate("ChooseRole");
  } else {
    navigation.navigate("SelectPatient");
  }
};

const baseHeaderStyle = {
  headerStyle: {
    backgroundColor: colors.theme.primary,
  },
  headerTintColor: colors.text.navigation,
  headerTitleStyle: {
    fontWeight: "normal",
    fontSize: sizes.headline.h1,
  },
  icon: {
    color: colors.text.navigation,
    fontSize: sizes.headline.h1,
  },
  buttonPlus: { bottom: 0, position: "relative", right: 0 },
};

const App = () => (
  <>
    <StatusBar
      barStyle="light-content"
      backgroundColor={colors.theme.primary}
    />
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Start"
            component={StartScreen}
            options={{
              ...baseHeaderStyle,
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="HospitalCode"
            component={HospitalCode}
            options={{
              title: "Hospital",
              ...baseHeaderStyle,
            }}
          />
          <Stack.Screen
            name="AddPatient"
            component={AddPatient}
            options={{
              title: "Novo paciente",
              ...baseHeaderStyle,
            }}
          />
          <Stack.Screen
            name="ChooseActivity"
            component={ChooseActivity}
            options={{
              title: "Atividade",
              ...baseHeaderStyle,
            }}
          />
          <Stack.Screen
            name="Home"
            component={HospitalInformation}
            options={{
              headerShown: false,
              ...baseHeaderStyle,
            }}
          />
          <Stack.Screen
            name="ChooseTechnology"
            component={ChooseTechnology}
            options={{
              title: "Tecnologia",
              headerTitle: () => (
                <HeaderSearch
                  title="Tecnologia"
                  style={baseHeaderStyle.headerTitleStyle}
                />
              ),
              ...baseHeaderStyle,
            }}
          />
          <Stack.Screen
            name="ChooseRole"
            component={ChooseRole}
            options={{
              headerTitle: () => (
                <HeaderSearch
                  title="Função"
                  style={baseHeaderStyle.headerTitleStyle}
                />
              ),
              ...baseHeaderStyle,
            }}
          />
          <Stack.Screen
            name="DocList"
            component={DocList}
            options={() => ({
              title: "Tecnologia Padrão",
              ...baseHeaderStyle,
            })}
          />
          <Stack.Screen
            name="ListPatient"
            component={ListPatient}
            options={({ navigation }) => ({
              title: "Paciente",
              headerRight: () => (
                <HeaderButton
                  iconName="ios-camera"
                  onPress={() => navigation.navigate("SelectPatient")}
                />
              ),
              ...baseHeaderStyle,
            })}
          />
          <Stack.Screen
            name="ListTechnology"
            component={ListTechnology}
            options={() => ({
              title: "Tecnologia",
              ...baseHeaderStyle,
            })}
          />
          <Stack.Screen
            name="NewTechnology"
            component={AddTechnology}
            options={{
              ...baseHeaderStyle,
              title: "Nova tecnologia",
            }}
          />
          <Stack.Screen
            name="SelectPatient"
            component={SelectPatient}
            options={() => ({
              title: "Paciente",
              ...baseHeaderStyle,
            })}
          />
          <Stack.Screen
            name="CarouselScreen"
            component={CarouselScreen}
            options={({ navigation }) => ({
              headerTitle: () => (
                <HeaderSearch
                  title="Em execução"
                  style={baseHeaderStyle.headerTitleStyle}
                />
              ),
              headerRight: () => (
                <HeaderButton
                  iconName="ios-add-circle-outline"
                  onPress={() => addNewProcedure(navigation)}
                />
              ),
              ...baseHeaderStyle,
            })}
          />
          <Stack.Screen
            name="AboutScreen"
            component={AboutScreen}
            options={{
              ...baseHeaderStyle,
              title: "Sobre o DTool",
            }}
          />
          <Stack.Screen
            name="ReportsScreen"
            component={ReportsScreen}
            options={() => ({
              title: "Relatórios",
              ...baseHeaderStyle,
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  </>
);

export default App;
