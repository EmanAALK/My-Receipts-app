import React from "react";
import { observer } from "mobx-react";

//Components
import ReceiptItem from "./ReceiptItem";

//Stores
import folderStore from "../../stores/FolderStore";
import receiptStore from "../../stores/receiptStore";

//Styles
import { Content, Spinner, List, Text, Image, Button } from "native-base";

const ReceiptList = ({ navigation }) => {
  if (receiptStore.loading) return <Spinner />;
  if (!folderStore.folder) return <Spinner />;

  const receiptList = receiptStore.receipts
    .filter((receipt) => folderStore.folder.id !== receipt.folderId)
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
