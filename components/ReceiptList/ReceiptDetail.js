import React, { useState } from "react";
import { observer } from "mobx-react";

//Styles

import { View, Text, Driver, Title, Image, ScrollView } from "react-native";
import { Content, Card, ListItem, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/Feather";

//Store
import folderStore from "../../store/FolderStore";

import moment from "moment";
import { Right } from "native-base";
import { TextInput } from "react-native-paper";

const ReceiptDetail = ({ route, navigation }) => {
  const { receipt } = route.params;
  const [edit, setEdit] = useState(false);
  const [_receipt, setReceipt] = useState(receipt);

  const folder = folderStore.folders.find(
    (folder) => folder.id === receipt.folderId
  );
  return (
    <ScrollView>
      <Card>
        <Card.Title>{receipt.name}</Card.Title>

        <Card.Divider />
        <Card.Image
          source={{ uri: receipt.image }}
          style={{ width: 300, height: 240 }}
        />

        {/* <Text style={{ marginBottom: 10 }}>
          Created at: {receipt.createdAt}
        </Text> */}
        <View style={{ flexDirection: "row", marginTop: 9, marginBottom: 20 }}>
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>
            Date of purchase:
          </Text>

          <Text style={{ marginLeft: 10, fontSize: 18 }}>{receipt.date}</Text>
        </View>

        <View style={{ flexDirection: "row", marginTop: 9, marginBottom: 20 }}>
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>
            Expiration Date:
          </Text>

          <Text style={{ marginLeft: 23, fontSize: 18 }}>
            {receipt.expDate}
          </Text>
        </View>

        <View style={{ flexDirection: "row", marginTop: 9, marginBottom: 20 }}>
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>Price:</Text>
          <Text style={{ marginLeft: 110, fontSize: 18 }}>{receipt.price}</Text>
        </View>
        <Icon
          style={{ left: "90%" }}
          name="edit-3"
          size={20}
          color="lightgrey"
          onPress={() =>
            navigation.navigate("UpdateReceiptForm", { oldReceipt: receipt })
          }
        />
      </Card>
    </ScrollView>
    // =======
    //     <>
    //       <PageTitle>{folder.name}</PageTitle>
    //       <NoteTitle>{receipt.name}</NoteTitle>
    //       {/* <Card.Title>{receipt.name}</Card.Title> */}
    //       <Card.Image
    //         source={{ uri: receipt.image }}
    //         style={{ marginTop: 35, marginLeft: 105, width: 180, height: 260 }}
    //       />
    //       {/* <Card
    //         style={{
    //           marginRight: 100,
    //           marginLeft: 100,
    //         }}
    //       > */}
    //       <Text
    //         style={{ marginBottom: 10 }}
    //         onPress={() => navigation.navigate("ReceiptList", { folder: folder })}
    //       >
    //         At Folder: {folder.name}
    //       </Text>
    //       <Text style={{ marginLeft: 105, marginTop: 30, marginBottom: 10 }}>
    //         Creation Date: {receipt.createdAt}
    //       </Text>
    //       <Text style={{ marginLeft: 105, marginTop: 10, marginBottom: 10 }}>
    //         Purchase Date: {receipt.date}
    //       </Text>
    //       <Text style={{ marginLeft: 105, marginTop: 10, marginBottom: 10 }}>
    //         Expiration Date: {receipt.expDate}
    //       </Text>
    //       <Text style={{ marginLeft: 105, marginTop: 10, marginBottom: 10 }}>
    //         Price: {receipt.price}
    //       </Text>
    //       {/* </Card> */}
    //       <Image source={receipt.image} />
    //     </>
  );
};

export default observer(ReceiptDetail);
