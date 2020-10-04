import React, { useState, useRef, useEffect } from "react";
import { observer } from "mobx-react";
import { Button, Image, Platform, Picker, View, CardItem } from "react-native";

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
  SaveFormButton,
  BottomLine,
  PageTitle,
  Frame,
  PDate,
  EDate,
} from "./styles";
import { ScrollView } from "react-native";
import { Text } from "native-base";
import * as Animatable from "react-native-animatable";

const CreateReceiptForm = ({ route, navigation }) => {
  const { image } = route.params;
  const [isValid, setIsValid] = useState(true);
  const [isValidDate, setIsValidDate] = useState(true);

  const [receipt, setReceipt] = useState({
    name: "",
    price: "",
    date: "",
    expDate: "",
    image: "",
    folderId: "",
  });

  //Handle Submit Function

  const handleSubmit = async () => {
    let localUri = image;
    let filename = localUri.split("/").pop();
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    console.log("........receipt.", receipt);

    if (receipt.folderId === "" || receipt.name === "") {
      await setIsValid(false);
    } else {
      setIsValid(true);

      // if (receipt.date && receipt.expDate) {
      if (receipt.date > receipt.expDate) await setIsValidDate(false);
      else setIsValidDate(true);
      // }

      if (isValid && isValidDate) {
        await receiptStore.createReceipt({
          ...receipt,
          image: { uri: localUri, name: filename, type },
        });
        navigation.navigate("Home");
      }
    }
    console.log("...isValidDate", isValidDate);
    console.log("...isValid", isValid);
  };

  const folder = folderStore.folders.filter(
    (folder) => folder.userId === authStore.user.id
  );

  const handleCancel = async () => {
    navigation.navigate("Home");
  };
  return (
    <>
      <PageTitle> New Receipt </PageTitle>
      <ScrollView>
        <Frame>
          {/* <FormContainer> */}
          {/* Image */}

          <Image
            source={{ uri: image }}
            style={{
              width: 160,
              height: 240,
              marginTop: 20,
              marginBottom: 20,
              marginLeft: 42,
            }}
          ></Image>

          <BottomLine>
            <RNPickerSelect
              onValueChange={(folderId) => setReceipt({ ...receipt, folderId })}
              placeholder={{ label: "Select a folder" }}
              placeholderTextColor='"#E0E0E0"'
              items={folder.map((folder) => ({
                label: folder.name,
                value: folder.id,
              }))}
            />
          </BottomLine>
          {/* </BorderBottomColor> */}
          <FormTextInput
            onChangeText={(name) => setReceipt({ ...receipt, name })}
            placeholder='Receipt Name'
            placeholderTextColor='"#E0E0E0"'
            style={{ marginTop: 18 }}
          />

          <FormTextInput
            onChangeText={(price) => setReceipt({ ...receipt, price })}
            placeholder='Receipt Price'
            placeholderTextColor='"#E0E0E0"'
          />

          {/* Date */}
          <View style={{ flexDirection: "row" }}>
            <PDate>Purchase Date:</PDate>
            <DatePicker
              style={{
                width: 182,
                marginTop: 2,
                marginBottom: 15,
                marginLeft: -6,
              }}
              date={receipt.date}
              mode='date'
              placeholder='select date'
              format='YYYY-MM-DD'
              confirmBtnText='Confirm'
              cancelBtnText='Cancel'
              showIcon={false}
              customStyles={{
                dateInput: {
                  height: 30,
                  borderRadius: 4,
                  marginLeft: 36,
                },
              }}
              onDateChange={(date) => {
                return setReceipt({ ...receipt, date });
              }}
            />
          </View>
          <View style={{ flexDirection: "row" }}>
            <EDate>Expiration Date:</EDate>
            <DatePicker
              style={{
                width: 182,
                marginTop: 2,
                marginBottom: 15,
                marginLeft: -9,
              }}
              date={receipt.expDate}
              mode='date'
              placeholder='select date'
              format='YYYY-MM-DD'
              confirmBtnText='Confirm'
              cancelBtnText='Cancel'
              showIcon={false}
              customStyles={{
                dateInput: {
                  height: 30,
                  borderRadius: 4,
                  marginLeft: 36,
                },
              }}
              onDateChange={(expDate) => {
                return setReceipt({ ...receipt, expDate });
              }}
            />
          </View>

          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          ></View>
          {/* </CardItem> */}
          {/* </FormContainer> */}
        </Frame>
        {!isValid && (
          <Animatable.View animation='fadeInLeft' duration={400}>
            <FormTitle
              style={{ color: "red", marginBottom: 0, alignSelf: "center" }}
            >
              Invalid entries{" "}
            </FormTitle>
          </Animatable.View>
        )}
        {!isValidDate && (
          <Animatable.View animation='fadeInLeft' duration={400}>
            <FormTitle
              style={{
                color: "red",
                marginTop: 5,
                marginBottom: 5,
                alignSelf: "center",
              }}
            >
              Check date
            </FormTitle>
          </Animatable.View>
        )}

        {/* Save/Cancel Buttons */}
        <View
          style={{
            flexDirection: "row",
            marginLeft: 38,
            marginTop: 48,
            marginBottom: 30,
          }}
        >
          <SaveFormButton onPress={handleSubmit}>
            <FormButtonText>Save Changes</FormButtonText>
          </SaveFormButton>

          <FormButton onPress={handleCancel}>
            <FormButtonText>Cancel</FormButtonText>
          </FormButton>
        </View>
      </ScrollView>
    </>
  );
};

export default observer(CreateReceiptForm);
