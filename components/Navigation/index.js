import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

//components
import Signin from "../../components/authentication/Signin";
import Signup from "../../components/authentication/Signup";

const RootStack = createStackNavigator();

const Navigation = ({ navigation }) => (
  <RootStack.Navigator headerMode="none">
    <RootStack.Screen name="Signin" component={Signin} />
    <RootStack.Screen name="Signup" component={Signup} />
  </RootStack.Navigator>
);

export default Navigation;
