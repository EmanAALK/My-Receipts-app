import React from "react";
import { observer } from "mobx-react";

//Components
import ReceiptItem from "./ReceiptItem";

//Stores
import folderStore from "../../store/FolderStore"; // unused import
import receiptStore from "../../store/ReceiptStore";

//Styles
import { Content, Spinner, List, Text, Image, Button } from "native-base"; // unused import

const ReceiptList = ({ navigation, route }) => {
  if (receiptStore.loading) return <Spinner />;
  const { folder } = route.params;

  const receiptList = receiptStore.receipts
    .filter((receipt) => receipt.folder.id === folder.id)
    .map((receipt) => (
      <>
        <ReceiptItem
          receipt={receipt}
          key={receipt.id}
          navigation={navigation}
        />
      </>
    ));

  return (
    <Content style={{ backgroundColor: "white" }}>
      <List>{receiptList}</List>
    </Content>
  );
};

export default observer(ReceiptList);
