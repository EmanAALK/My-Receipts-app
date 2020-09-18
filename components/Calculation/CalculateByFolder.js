import React, { useState } from "react";
import { Text, View } from "native-base";
import { InputContainer, TextStyle } from "./styles";
import receiptStore from "../../store/ReceiptStore";
import folderStore from "../../store/FolderStore";
import authStore from "../../store/authStore";
import DropDownPicker from "react-native-dropdown-picker";

const CalculateByFolder = ({ navigation }) => {
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
    <InputContainer>
      <>
        <DropDownPicker
          items={[
            {
              label: "All",
              value: 0,
            },
            {
              label: "Folder",
              value: 1,
            },
            {
              label: "Receipt",
              value: 2,
            },
          ]}
          labelStyle={{
            fontSize: 14,
            textAlign: "left",
            color: "#000",
          }}
          //   defaultValue={filter}
          containerStyle={{
            height: 32,
            marginTop: 10,
            width: 230,
          }}
          style={{
            backgroundColor: "#fafafa",
          }}
          itemStyle={{
            justifyContent: "flex-start",
          }}
          dropDownStyle={{ backgroundColor: "#fafafa" }}
          //   onChangeItem={(item) => setFilter(item.value)}
          style={{ paddingVertical: 0 }}
        ></DropDownPicker>
      </>

      <Text>{total}</Text>
    </InputContainer>
  );
};

export default CalculateByFolder;
