import React from "react";
import { observer } from "mobx-react";

//Styles
import { View, Text, Driver, Title, Image } from "react-native"; // unused import
import { Content, Card, ListItem, Button, Icon } from "react-native-elements"; // unused import

//Store
import folderStore from "../../store/FolderStore";

import moment from "moment"; // unused import

const ReceiptDetail = ({ route, navigation }) => {
  const { receipt } = route.params;
  // unused const
  const folder = folderStore.folders.find(
    (folder) => folder.userId === receipt.folderId
  );
  return (
    <>
      <Card>
        <Card.Title>{receipt.name}</Card.Title>
        <Card.Divider />
        <Card.Image source={receipt.image} />
        <Text style={{ marginBottom: 10 }}>
          Created at: {receipt.createdAt}
        </Text>
        <Text style={{ marginBottom: 10 }}>
          Date of purchase: {receipt.date}
        </Text>
        <Text style={{ marginBottom: 10 }}>
          Expiration Date: {receipt.Expdate}
        </Text>
        <Text style={{ marginBottom: 10 }}> Price: {receipt.price}</Text>
      </Card>
      <Image source={receipt.image} />
    </>
  );
};

export default observer(ReceiptDetail);
