import React from "react";
import { observer } from "mobx-react";

//Stores
import receiptStore from "../../store/ReceiptStore";

//Styling
import { ListItem, Left, Right, Text, View, Button } from "native-base";

const ReceiptItem = ({ receipt, navigation }) => {
  return (
    <ListItem
      onPress={() => navigation.navigate("ReceiptDetail", { receipt: receipt })}
    >
      <Left>
        <Text>{receipt.name}</Text>
        <Text>{receipt.date}</Text>
        <Text>{receipt.folderId}</Text>
      </Left>
      <>
        <Right>
          {/* <DeleteButtonStyled
            onPress={() => receiptStore.deleteReceipt(receipt.id)}
          >
            Delete
          </DeleteButtonStyled> */}
        </Right>
      </>
    </ListItem>
  );
};

export default observer(ReceiptItem);
