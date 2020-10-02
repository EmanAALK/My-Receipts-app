import React, { useState } from "react";
import { observer } from "mobx-react";

//Stores
import folderStore from "../../store/FolderStore";
import authStore from "../../store/authStore";
import receiptStore from "../../store/ReceiptStore";

//Styles
import {
  FormContainer,
  FormTitle,
  FormTextInput,
  FormButtonText,
  FormButton,
} from "./styles";
import { View, Text, Driver, Title, Image, ScrollView } from "react-native";
import { Card } from "react-native-elements";
import DatePicker from "react-native-datepicker";
import RNPickerSelect from "react-native-picker-select";
import { TextInput } from "react-native-paper";
const UpdateReceiptForm = ({ navigation, route }) => {
  const { oldReceipt } = route.params;
  const [receipt, setReceipt] = useState(oldReceipt);
  console.log(",,,,,,,,oldReceipt", oldReceipt);

  const handleSubmit = async () => {
    // let localUri = receipt.image;
    // let filename = localUri.split("/").pop();
    // let match = /\.(\w+)$/.exec(filename);
    // let type = match ? `image/${match[1]}` : `image`;

    // console.log("........receipt.", receipt);
    await receiptStore.updateReceipt(receipt);
    //   ...receipt,
    //   image: { uri: localUri, name: filename, type },
    // });

    navigation.goBack();
  };

  const folder = folderStore.folders.filter(
    (folder) => folder.userId === authStore.user.id
  );

  const handleCancel = async () => {
    navigation.navigate("Home");
  };

  return (
    <ScrollView>
      <Card>
        <FormTextInput
          onChangeText={(name) => setReceipt({ ...receipt, name })}
          placeholder="Receipt Name"
          placeholderTextColor="#A6AEC1"
          value={receipt.name}
          style={{ alignSelf: "center", width: 200, textAlign: "center" }}
        />

        <Card.Divider />
        <Card.Image
          source={{ uri: receipt.image }}
          style={{ width: 300, height: 240 }}
        />

        <View style={{ flexDirection: "row", marginTop: 9, marginBottom: 5 }}>
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>Folder:</Text>

          <RNPickerSelect
            onValueChange={(folderId) => setReceipt({ ...receipt, folderId })}
            items={folder.map((folder) => ({
              label: folder.name,
              value: folder.id,
            }))}
            placeholderTextColor="black"
            value={receipt.folderId}
          />
        </View>
        <View style={{ flexDirection: "row", marginTop: 9, marginBottom: 5 }}>
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>
            Date of purchase:
          </Text>

          <DatePicker
            style={{ width: 150 }}
            date={receipt.date}
            mode="date"
            placeholder="select date"
            format="YYYY-MM-DD"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            showIcon={false}
            customStyles={{
              dateIcon: {
                position: "absolute",
                left: 0,
                top: 4,
                marginRight: 4,
                marginLeft: 0,
              },
              dateInput: {
                marginLeft: 10,
              },
            }}
            onDateChange={(date) => {
              return setReceipt({ ...receipt, date });
            }}
          />
        </View>
        <View style={{ flexDirection: "row", marginTop: 9, marginBottom: 5 }}>
          <Text style={{ fontWeight: "bold", fontSize: 18, paddingRight: 13 }}>
            Expiration Date:
          </Text>
          <DatePicker
            style={{ width: 150 }}
            date={receipt.expDate}
            mode="date"
            placeholder="select date"
            format="YYYY-MM-DD"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            showIcon={false}
            customStyles={{
              dateIcon: {
                position: "absolute",
                left: 0,
                top: 4,
                marginRight: 4,
                marginLeft: 0,
              },
              dateInput: {
                marginLeft: 10,
              },
            }}
            onDateChange={(expDate) => {
              return setReceipt({ ...receipt, expDate });
            }}
          />
        </View>
        <View style={{ flexDirection: "row", marginTop: 9, marginBottom: 5 }}>
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>Price:</Text>
          <FormTextInput
            onChangeText={(price) => setReceipt({ ...receipt, price })}
            placeholder="Receipt Price"
            placeholderTextColor="#A6AEC1"
            style={{ width: 140, marginLeft: 110 }}
            value={receipt.price}
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
      </Card>
    </ScrollView>
  );
};
export default observer(UpdateReceiptForm);
