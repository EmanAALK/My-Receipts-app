import React, { useState } from "react";
import { observer } from "mobx-react";
import DatePicker from "react-native-datepicker";
import { Button, Image, View, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

//Stores
import receiptStore from "../../store/ReceiptStore";

//Styles
import {
  FormContainer,
  FormTitle,
  FormTextInput,
  FormButtonText,
  FormButton,
} from "./styles";

const CreateReceiptForm = ({ navigation }) => {
  const [receipt, setReceipt] = useState({
    name: "",
    price: "",
    date: "",
    Expdate: "",
    image: "",
  });

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
    <FormContainer>
      <FormTitle>Add Your Trip</FormTitle>
      <FormTextInput
        onChangeText={(name) => setReceipt({ ...receipt, name })}
        placeholder="Receipt Name"
        placeholderTextColor="#A6AEC1"
      />

      <FormTextInput
        onChangeText={(price) => setReceipt({ ...receipt, price })}
        placeholder="Price"
        placeholderTextColor="#A6AEC1"
      />

      <DatePicker
        style={{ width: 255 }}
        date={receipt.date}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
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
      <DatePicker
        style={{ width: 255 }}
        date={receipt.Expdate}
        mode="Expiration date"
        placeholder="select date"
        format="YYYY-MM-DD"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
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
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          color: "black",
        }}
      >
        <Button title="Pick an image from camera roll" onPress={pickImage} />
        {image && (
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        )}
      </View>

      <FormButton onPress={handleSubmit}>
        <FormButtonText>Save Changes</FormButtonText>
      </FormButton>
    </FormContainer>
  );
};

export default observer(CreateReceiptForm);
