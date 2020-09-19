import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { observer } from "mobx-react";

import Icon from "react-native-vector-icons/Ionicons";

// component
import CreateReceiptForm from "../Forms/CreateReceiptForm";
const AddReceiptStack = createStackNavigator();
const color = "#e2cfc4";

const AddReceiptStackScreen = ({ navigation }) => (
  <AddReceiptStack.Navigator
    initialRouteName="AddReceipt"
    screenOptions={{
      headerTintColor: "#fff",
      headerStyle: {
        backgroundColor: color,
        height: 55,
      },
      headerTitleStyle: {
        fontWeight: "bold",
      },
    }}
  >
    <AddReceiptStack.Screen
      name="CreateReceiptForm"
      component={CreateReceiptForm}
      options={{
        title: false,

        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor={color}
            onPress={() => navigation.openDrawer()}
          ></Icon.Button>
        ),
      }}
    />
  </AddReceiptStack.Navigator>
);

export default observer(AddReceiptStackScreen);
