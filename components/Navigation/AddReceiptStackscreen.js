import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { observer } from "mobx-react";

import Icon from "react-native-vector-icons/Ionicons";

// component
import CreateReceiptForm from "../Forms/CreateReceiptForm";
import CameraModal from "../Modals/CameraModal";

const AddReceiptStack = createStackNavigator();
const color = "#e2cfc4";

const AddReceiptStackScreen = ({ navigation }) => (
  <AddReceiptStack.Navigator
    initialRouteName='AddReceipt'
    // title={false}
    screenOptions={{
      headerTintColor: "white",
      backgroundColor: "white",
      headerStyle: {
        backgroundColor: "white",
        height: 100,
        backgroundColor: color,
        height: 55,
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
            color={"gray"}
            backgroundColor='transparent'
            backgroundColor={color}
            onPress={() => navigation.openDrawer()}
          ></Icon.Button>
        ),
      }}
    />
  </AddReceiptStack.Navigator>
);

export default observer(AddReceiptStackScreen);
