import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { observer } from "mobx-react";

import Icon from "react-native-vector-icons/Ionicons";

// component
import CreateReceiptForm from "../Forms/CreateReceiptForm";
const AddReceiptStack = createStackNavigator();

const AddReceiptStackScreen = ({ navigation }) => (
  <AddReceiptStack.Navigator
    initialRouteName='AddReceipt'
    // title={false}
    screenOptions={{
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: "white",
        height: 90,
      },
      headerTitleStyle: {
        fontWeight: "bold",
      },
      backgroundColor: "white",
    }}
  >
    <AddReceiptStack.Screen
      name='CreateReceiptForm'
      component={CreateReceiptForm}
      options={{
        title: false,

        headerLeft: () => (
          <Icon.Button
            name='ios-menu'
            size={25}
            color={"lightgray"}
            backgroundColor='white'
            onPress={() => navigation.openDrawer()}
          ></Icon.Button>
        ),
      }}
    />
  </AddReceiptStack.Navigator>
);

export default observer(AddReceiptStackScreen);
