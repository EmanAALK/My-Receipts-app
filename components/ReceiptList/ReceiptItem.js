import React, { useState } from "react";
import { observer } from "mobx-react";

//Stores
import receiptStore from "../../store/ReceiptStore";

//Styling
import {
  ListItem,
  Left,
  Right,
  Text,
  View,
  Button,
  Thumbnail,
} from "native-base";
import { CheckBox } from "react-native-elements";
import { Card } from "react-native-paper";
import defaultimage from "../../assets/defaultimage.png";

const ReceiptItem = ({ receipt, navigation, multipul }) => {
  const [isChecked, setIsChecked] = useState(multipul);
  console.log(",,,,,,,,,,isChecked", isChecked);

  const handleChecked = () => {
    setIsChecked(!isChecked);

    if (!isChecked) {
      receiptStore.selectedReceipts.push(receipt);
    } else
      receiptStore.selectedReceipts = receiptStore.selectedReceipts.filter(
        (item) => item.id !== receipt.id
      );
  };

  return (
    <ListItem
      onPress={() => navigation.navigate("ReceiptDetail", { receipt: receipt })}
    >
      {multipul && (
        <CheckBox
          checkedIcon="dot-circle-o"
          checkedColor="grey"
          uncheckedIcon="circle-o"
          checked={isChecked}
          onPress={handleChecked}
          value={false}
        />
      )}

      <Thumbnail
        style={{ marginBottom: 5, marginRight: 16, textAligin: "center" }}
        source={defaultimage}
      />

      <Left>
        <Text>{receipt.name}</Text>
      </Left>
    </ListItem>
  );
};

export default observer(ReceiptItem);
