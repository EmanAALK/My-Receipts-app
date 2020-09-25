import React, { useState } from "react";
import { observer } from "mobx-react";

//Components
import ReceiptItem from "./ReceiptItem";

//Stores
import folderStore from "../../store/FolderStore";
import receiptStore from "../../store/ReceiptStore";
import authStore from "../../store/authStore";

//Styles
import {
  Content,
  Spinner,
  List,
  Text,
  Image,
  Button,
  Right,
} from "native-base";
import { View } from "react-native-animatable";
import Icon from "react-native-vector-icons/Feather";
import { Alert } from "react-native";

const ReceiptList = ({ navigation, route }) => {
  const [multipul, setMultipul] = useState(false);

  if (receiptStore.loading) return <Spinner />;
  const { folder } = route.params;
  let receiptList = [];


  const receiptList = receiptStore.receipts
    .filter((receipt) => receipt.folder.id === folder.id)
    .map((receipt) => (
      <>
        <ReceiptItem
          receipt={receipt}
          key={receipt.id}
          navigation={navigation}
          multipul={multipul}
        />
      </>
    ));

  if (folder.name === "archive Folder") {
    const receipt = receiptStore.receipts.filter(
      (receipt) => receipt.folder.userId === authStore.user.id
    );

    receiptList = receipt
      .filter((item) => item.archive)
      .map((receipt) => (
        <>
          <ReceiptItem
            receipt={receipt}
            key={receipt.id}
            navigation={navigation}
          />
        </>
      ));
  } else {
    receiptList = receiptStore.receipts
      .filter((receipt) => receipt.folder.id === folder.id)
      .filter((item) => !item.archive)
      .map((receipt) => (
        <>
          <ReceiptItem
            receipt={receipt}
            key={receipt.id}
            navigation={navigation}
          />
        </>
      ));
  }


  const deleteReceipt = () => {
    // console.log(
    //   ".... receiptStore.selectedReceipts",
    //   receiptStore.selectedReceipts
    // );
    receiptStore.selectedReceipts.map((receipt) => {
      receiptStore.deleteReceipt(receipt.id);
    });
  };

  const handleDelete = () => {
    setMultipul(!multipul);
    if (multipul && receiptStore.selectedReceipts.length !== 0) {
      Alert.alert("Delete", "Are you sure you want to delete this receipt?", [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            deleteReceipt();
          },
        },
      ]);
    } else receiptStore.selectedReceipts = [];
  };

  return (
    <>
      <Text style={{ marginLeft: 300 }} onPress={handleDelete}>
        {multipul ? "Delete" : "Select"}
      </Text>

      <Content style={{ backgroundColor: "white" }}>
        <List>{receiptList}</List>
      </Content>
    </>
  );
};

export default observer(ReceiptList);
