import React, { useState, useRef, useEffect } from "react";
import { observer } from "mobx-react";

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
import { Card } from "react-native-elements";
import {
  Button,
  Image,
  Platform,
  Picker,
  View,
  ScrollView,
} from "react-native";
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
      <ScrollView>
        <Card>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={{ uri: image }}
              style={{ width: 300, height: 240 }}
            ></Image>
          </View>
        </Card>
        <FormContainer>
          <RNPickerSelect
            onValueChange={(folderId) => setReceipt({ ...receipt, folderId })}
            items={folder.map((folder) => ({
              label: folder.name,
              value: folder.id,
            }))}
          />

          <FormTextInput
            onChangeText={(name) => setReceipt({ ...receipt, name })}
            placeholder="Receipt Name"
            placeholderTextColor="#A6AEC1"
          />

          <FormTextInput
            onChangeText={(price) => setReceipt({ ...receipt, price })}
            placeholder="Receipt Price"
            // keyboardType="numeric"
            numeric
            keyboardType={"numeric"}
            placeholderTextColor="#A6AEC1"
          />

          {/* Date */}
          <View style={{ flexDirection: "row" }}>
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
          </View>
          <View style={{ flexDirection: "row" }}>
            <DatePicker
              style={{ width: 255 }}
              date={receipt.expDate}
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
              onDateChange={(expDate) => {
                return setReceipt({ ...receipt, expDate });
              }}
            />
          </View>

          {!isValid && (
            <Animatable.View animation="fadeInLeft" duration={400}>
              <FormTitle style={{ color: "red", marginBottom: 0 }}>
                Invalid entries{" "}
              </FormTitle>
            </Animatable.View>
          )}
          {!isValidDate && (
            <Animatable.View animation="fadeInLeft" duration={400}>
              <FormTitle
                style={{ color: "red", marginTop: 5, marginBottom: 5 }}
              >
                Check date
              </FormTitle>
            </Animatable.View>
          )}
          {/* Save/Cancel Buttons */}
          <View style={{ flexDirection: "row" }}>
            <FormButton onPress={handleSubmit}>
              <FormButtonText>Save Changes</FormButtonText>
            </FormButton>

            <FormButton onPress={handleCancel}>
              <FormButtonText>Cancel</FormButtonText>
            </FormButton>
          </View>
        </FormContainer>
      </ScrollView>
    </>
  );
};

export default observer(CreateReceiptForm);
