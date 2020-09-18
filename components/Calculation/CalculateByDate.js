import React, { useState } from "react";
import { Text, View } from "native-base";
import DatePicker from "react-native-datepicker";
import { InputContainer, TextStyle } from "./styles";
import receiptStore from "../../store/ReceiptStore";
import folderStore from "../../store/FolderStore";
import authStore from "../../store/authStore";

const CalculateByDate = ({ navigation }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  let total = 0;

  const folder = folderStore.folders.filter(
    (folder) => folder.userId === authStore.user.id
  );

  const amount = receiptStore.receipts.map(
    (receipt) => (total = total + receipt.price)
  );

  const updateIndex = (selectedIndex) => {
    setSelectedIndex(selectedIndex);
  };
  return (
    <>
      <View
        style={{
          padding: 5,
          flexDirection: "row",
          marginTop: 30,
          alignSelf: "center",
        }}
      >
        <TextStyle>From : </TextStyle>
        <DatePicker
          style={{ width: 255 }}
          date=""
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
            console.log(",,,,,,", date);
          }}
        />
      </View>
      <View style={{ padding: 5, flexDirection: "row", alignSelf: "center" }}>
        <TextStyle>To : </TextStyle>
        <DatePicker
          style={{ width: 255, textalign: "left" }}
          date=""
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
            console.log(",,,,,,", date);
          }}
        />
      </View>

      <View style={{ marginTop: 10, marginLeft: 10 }}>
        <Text>Total Amount : {total} </Text>
      </View>
    </>
  );
};

export default CalculateByDate;
