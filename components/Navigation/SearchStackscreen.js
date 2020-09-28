import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { observer } from "mobx-react";

//Styling
import Icon from "react-native-vector-icons/Ionicons";
import PhotoPicker from "../CameraFeature/PhotoPicker";

// component
import CreateReceiptForm from "../Forms/CreateReceiptForm";
import CameraModal from "../Modals/CameraModal";
import CameraScreen from "../CameraFeature/CameraScreen";
import Search from "../Search";

const SearchStack = createStackNavigator();

const color = "#ffbf00";
const iconsColor = "#C2C2C2";

const SearchStackScreen = ({ navigation }) => (
  <SearchStack.Navigator
    initialRouteName="Search"
    title={false}
    screenOptions={{
      headerTintColor: "white",
      backgroundColor: "white",
      headerStyle: {
        backgroundColor: "white",
        height: 80,
      },
      headerTitleStyle: {
        fontWeight: "bold",
      },
      backgroundColor: "white",
    }}
  >
    <SearchStack.Screen
      name="search"
      component={Search}
      options={{
        title: false,

        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            color={iconsColor}
            backgroundColor="transparent"
            activeColor="transparent"
            onPress={() => navigation.openDrawer()}
          ></Icon.Button>
        ),
      }}
    />
  </SearchStack.Navigator>
);

export default observer(SearchStackScreen);
