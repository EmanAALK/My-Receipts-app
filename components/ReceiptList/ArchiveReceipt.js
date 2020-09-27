import React from "react";
import { observer } from "mobx-react";

//Components
import ReceiptItem from "./ReceiptItem";

//Stores
import folderStore from "../../store/FolderStore";
import receiptStore from "../../store/ReceiptStore";
import authStore from "../../store/authStore";

//Styles
import { Content, Spinner, List, Text, Image, Button } from "native-base";

const ReceiptList = ({ navigation }) => {
  if (receiptStore.loading) return <Spinner />;
  if (folderStore.loading) return <Spinner />;

  const receipt = receiptStore.receipts.filter(
    (receipt) => receipt.folder.userId === authStore.user.id
  );

  const receiptList = receipt
    .filter((item) => item.archive)
    .map((receipt) => (
      <ReceiptItem receipt={receipt} key={receipt.id} navigation={navigation} />
    ));

  return (
    <Content style={{ backgroundColor: "white" }}>
      <List>{receiptList}</List>
    </Content>
  );
};

export default observer(ReceiptList);
