import React from "react";
import { observer } from "mobx-react";

//Styles
import { PageTitle, NoteTitle } from "./styles";
import { View, Text, Driver, Title, Image } from "react-native";
import { Content, Card, ListItem, Button, Icon } from "react-native-elements";

//Store
import folderStore from "../../store/FolderStore";

import moment from "moment";

const ReceiptDetail = ({ route, navigation }) => {
  const { receipt } = route.params;
  const folder = folderStore.folders.find(
    (folder) => folder.id === receipt.folderId
  );
  return (
    <>
      <PageTitle>{folder.name}</PageTitle>
      <NoteTitle>{receipt.name}</NoteTitle>
      {/* <Card.Title>{receipt.name}</Card.Title> */}
      <Card.Image
        source={{ uri: receipt.image }}
        style={{ marginTop: 35, marginLeft: 105, width: 180, height: 260 }}
      />
      {/* <Card
        style={{
          marginRight: 100,
          marginLeft: 100,
        }}
      > */}
      <Text style={{ marginLeft: 105, marginTop: 30, marginBottom: 10 }}>
        Creation Date: {receipt.createdAt}
      </Text>
      <Text style={{ marginLeft: 105, marginTop: 10, marginBottom: 10 }}>
        Purchase Date: {receipt.date}
      </Text>
      <Text style={{ marginLeft: 105, marginTop: 10, marginBottom: 10 }}>
        Expiration Date: {receipt.expDate}
      </Text>
      <Text style={{ marginLeft: 105, marginTop: 10, marginBottom: 10 }}>
        {" "}
        Price: {receipt.price}
      </Text>
      {/* </Card> */}
      <Image source={receipt.image} />
    </>
  );
};

export default observer(ReceiptDetail);
