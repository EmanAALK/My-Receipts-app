import React, { useState, useRef, useEffect } from "react";
import { observer } from "mobx-react";

//Styling
import { Button, Image, Platform, Picker, View, Text } from "react-native";
import { ConfirmButton, ConfirmButtonText } from "./styles";
import Icon from "react-native-vector-icons/FontAwesome";

//Image Picker
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

//Components
import CameraScreen from "./CameraScreen";

const PhotoPicker = ({ navigation }) => {
  //Image Picking
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    try {
      if (Platform.OS !== "web") {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        setImage(result.uri);
        console.log("Hellow");
        navigation.navigate("CreateReceiptForm", { image: result.uri });
      }
    } catch (E) {}
  };

  return (
    <>
      <Icon
        name='photo'
        styles={{ marginTop: 100 }}
        size={40}
        color={"gray"}
        backgroundColor='transparent'
        onPress={pickImage}
      ></Icon>
    </>
  );
};

export default observer(PhotoPicker);
