import React from "react";
import { observer } from "mobx-react";

// component
import FolderItem from "./FolderItem";

// Styling
import { List, Spinner, Text } from "native-base";

// store
import receiptStore from "../../store/ReceiptStore";
import authStore from "../../store/authStore";

const NotificationList = ({ navigation }) => {
  if (receiptStore.loading) return <Spinner />;

  const receiptList = receiptStore.receipts
    .filter((receipt) => receipt.userId === authStore.user.id)
    .map((receipt) => (receipt = receipt.date));

  return (
    <>
      {/* <Text onPress={() => navigation.navigate("CreateFolderForm")}>
        + folder
      </Text> */}

      <List>{receiptList}</List>
    </>
  );
};

export default observer(NotificationList);
