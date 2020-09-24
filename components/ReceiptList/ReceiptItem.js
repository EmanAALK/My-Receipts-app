import React from "react";
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
import { Card } from "react-native-paper";
import defaultimage from "../../assets/defaultimage.png";
const ReceiptItem = ({ receipt, navigation }) => {
  const deleteAlert = () => {
    Alert.alert("Delete", "Are you sure you want to delete this receipt?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      { text: "OK", onPress: () => receiptStore.deleteReceipt(receipt.id) },
    ]);
  };
  return (
    <ListItem
      onPress={() => navigation.navigate("ReceiptDetail", { receipt: receipt })}
    >
      <Left>
        <Thumbnail
          style={{ marginBottom: 5, marginRight: 16, textAligin: "center" }}
          source={defaultimage}
        />
      </Left>
      <Left>
        <Text>{receipt.name}</Text>
      </Left>
      <>
        <Right>
          <DeleteButtonStyled onPress={deleteAlert}>Delete</DeleteButtonStyled>
          <DeleteButtonStyled
            onPress={() =>
              navigation.navigate("UpdateReceiptForm", { oldReceipt: receipt })
            }
          >
            Update
          </DeleteButtonStyled>
        </Right>
      </>
    </ListItem>
  );
};

export default observer(ReceiptItem);
