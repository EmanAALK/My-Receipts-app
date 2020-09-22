import React, { useState, useRef, useEffect } from "react";
import { observer } from "mobx-react";
import { Button, Image, Platform, Picker, View } from "react-native";

//Image Picker
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

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
      }
    } catch (E) {}
  };

  return (
    /* {pickImage} */
    <>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          color: "black",
        }}
      >
        <Button title='Pick an image from camera roll' onPress={pickImage} />
        {image && (
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        )}
      </View>
    </>
  );
};

export default observer(PhotoPicker);
