import React, { useState, useRef, useEffect } from "react";
import { observer } from "mobx-react";
import { Button, Image, Platform, Picker, View } from "react-native";

//Image Picker
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

//Date Picker
import DatePicker from "react-native-datepicker";
import RNPickerSelect from "react-native-picker-select";

//Components
import FolderItem from "./FolderItem";
import CameraModal from "../Modals/CameraModal";

//Stores
import receiptStore from "../../store/ReceiptStore";
import authStore from "../../store/authStore";
import folderStore from "../../store/FolderStore";

//Styles
import {
  FormContainer,
  FormTitle,
  FormTextInput,
  FormButtonText,
  FormButton,
  EditContainer,
} from "./styles";

const CreateReceiptForm = ({ route, navigation }) => {
  const { photo } = route.params;
  const [receipt, setReceipt] = useState({
    name: "",
    price: "",
    date: "",
    Expdate: "",
    image: "",
  });
  const handleCancel = async () => {
    navigation.navigate("Home");
  };

  //Album Access State
  const handleSubmit = async () => {
    let localUri = image;
    let filename = localUri.split("/").pop();
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    await receiptStore.createReceipt({
      ...receipt,

      image: { uri: localUri, name: filename, type },
    });
    navigation.replace("ReceiptList");
  };

  const folder = folderStore.folders
    .filter((folder) => folder.userId === authStore.user.id)
    .map((folder) => (folder = folder.name));

  let name = [];
  name = folder.map(function (i) {
    return { labe: i.name };
  });

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
    <>
      {/* {pickImage} */}
      <FormContainer>
        <FormTitle>Add Receipt</FormTitle>

        {/* Folder */}
        <RNPickerSelect
          onValueChange={(value) => console.log(value)}
          items={folder.map((name) => ({ label: name, value: name }))}
        />

        <FormTextInput
          onChangeText={(name) => setReceipt({ ...receipt, name })}
          placeholder='Receipt Name'
          placeholderTextColor='#A6AEC1'
        />

        <FormTextInput
          onChangeText={(price) => setReceipt({ ...receipt, price })}
          placeholder='Price'
          placeholderTextColor='#A6AEC1'
        />

        {/* Date */}
        <View style={{ flexDirection: "row" }}>
          <DatePicker
            style={{ width: 255 }}
            date={receipt.date}
            mode='date'
            placeholder='select date'
            format='YYYY-MM-DD'
            confirmBtnText='Confirm'
            cancelBtnText='Cancel'
            customStyles={{
              dateIcon: {
                position: "absolute",
                left: 0,
                top: 4,
                marginRight: 4,
                marginLeft: 0,
                borderColor: "#cea146",
              },
              dateInput: {
                marginLeft: 36,
              },
            }}
            onDateChange={(date) => {
              return setReceipt({ ...receipt, date });
            }}
          />
        </View>
        <View style={{ flexDirection: "row" }}>
          <DatePicker
            style={{ width: 255 }}
            date={receipt.Expdate}
            mode='Expiration date'
            placeholder='select expiration date'
            format='YYYY-MM-DD'
            confirmBtnText='Confirm'
            cancelBtnText='Cancel'
            customStyles={{
              dateIcon: {
                position: "absolute",
                left: 0,
                top: 4,
                marginRight: 4,
                marginLeft: 0,
                borderColor: "#cea146",
              },
              dateInput: {
                marginLeft: 36,
              },
            }}
            onDateChange={(Expdate) => {
              return setReceipt({ ...receipt, Expdate });
            }}
          />
        </View>

        {/* Image  */}

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
            <Image
              source={{ uri: image }}
              style={{ width: 200, height: 200 }}
            />
          )}
        </View>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Image
            source={{ uri: photo.uri }}
            style={{ width: 280, height: 480 }}
          />
        </View>

        <View style={{ flexDirection: "row" }}>
          <FormButton onPress={handleSubmit}>
            <FormButtonText>Save Changes</FormButtonText>
          </FormButton>

          <FormButton onPress={handleCancel}>
            <FormButtonText>Cancel</FormButtonText>
          </FormButton>
        </View>
      </FormContainer>
    </>
  );
};

export default observer(CreateReceiptForm);
