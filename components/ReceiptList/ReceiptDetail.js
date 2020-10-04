import React, { useState } from "react";
import { observer } from "mobx-react";

//Styles
import { PageTitle, NoteTitle, Frame, BottomLine } from "./styles";
import { View, Text, Driver, Title, Image, ScrollView } from "react-native";
import { Content, Card, ListItem, Button, Icon } from "react-native-elements";

//Store
import folderStore from "../../store/FolderStore";

import moment from "moment";

const ReceiptDetail = ({ route, navigation }) => {
  const { receipt } = route.params;
  const [edit, setEdit] = useState(false);
  const [_receipt, setReceipt] = useState(receipt);

  const folder = folderStore.folders.find(
    (folder) => folder.id === receipt.folderId
  );

  // console.log("receipt check", receipt);
  console.log("folder check", folder);
  return (
    <>
      <ScrollView>
        {/* <BottomLine> */}
        <PageTitle
          onPress={() => navigation.navigate("ReceiptList", { folder: folder })}
        >
          {folder.name}
        </PageTitle>
        <NoteTitle>{receipt.name}</NoteTitle>
        {/* </BottomLine> */}
        <Text
          onPress={() =>
            navigation.navigate("UpdateReceiptForm", { oldReceipt: receipt })
          }
          style={{
            marginTop: -26,
            marginBottom: 12,
            marginLeft: 310,
            color: "#ffbf00",
          }}
        >
          Edit
        </Text>
        <Frame>
          <Card.Image
            source={{ uri: receipt.image }}
            style={{ marginTop: 35, marginLeft: 60, width: 180, height: 260 }}
          />

          <Text style={{ marginLeft: 60, marginTop: 30, marginBottom: 10 }}>
            Creation Date: {receipt.createdAt}
          </Text>
          <Text style={{ marginLeft: 60, marginTop: 10, marginBottom: 10 }}>
            Purchase Date: {receipt.date}
          </Text>
          <Text style={{ marginLeft: 60, marginTop: 10, marginBottom: 10 }}>
            Expiration Date: {receipt.expDate}
          </Text>
          <Text style={{ marginLeft: 60, marginTop: 10, marginBottom: 10 }}>
            Price: {receipt.price}
          </Text>
          {/* </Card> */}
          <Image source={receipt.image} />
        </Frame>
      </ScrollView>
    </>
  );
};

export default observer(ReceiptDetail);
