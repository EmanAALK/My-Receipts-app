import React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import RootNavigator from "./components/Navigation/RootNavigator";

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    // primary: "rgb(255, 45, 85)",
    // background: "#F7F7F7",
    background: "white",
  },
};

const App = () => {
  console.disableYellowBox = true;

  return (
    <NavigationContainer theme={MyTheme}>
      <RootNavigator style={{ backgroundColor: "red" }} />
    </NavigationContainer>
  );
};
export default App;
