import React from "react";
import { observer } from "mobx-react";

//Components
import CreateReceiptForm from "../Forms/CreateReceiptForm";

//Styling
import { StyleSheet, Text, View, Image } from "react-native";

const CameraPhoto = ({ route, navigation }) => {
  const { photo } = route.params;
  //   navigation.navigate("CreateReceiptForm");

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Image source={{ uri: photo.uri }} style={{ width: 380, height: 550 }} />
    </View>
  );
};

export default observer(CameraPhoto);
