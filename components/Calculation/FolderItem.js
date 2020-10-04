import React from "react";
import { observer } from "mobx-react";

//Stores
import receiptStore from "../../store/ReceiptStore";
import { FlatList } from "react-native";
import { Table, Row } from "react-native-table-component";
import { View, Card, CardItem, Left, Body, Right } from "native-base";

//Styling
import { Text } from "native-base";

const FolderItem = ({ folder, navigation }) => {
  let total = 0;
  const receipt = receiptStore.receipts.filter(
    (receipt) => receipt.folderId === folder.id
  );
  receipt.map((receipt) => (total = total + +receipt.price));
  const renderItem = ({ item }) => {
    return (
      <Card style={{ width: 300, alignSelf: "center" }}>
        <CardItem>
          <Left>
            <Text>{item.name}</Text>
          </Left>
          <Body></Body>

          <Right>
            <Text>{item.price}</Text>
          </Right>
        </CardItem>
      </Card>
    );
  };

  return (
    <>
      <Text style={{ margin: 5, marginLeft: 40 }}>Folder: {folder.name}</Text>
      <Card
        style={{ width: 300, alignSelf: "center", backgroundColor: "#ffbf00" }}
      >
        <CardItem style={{ backgroundColor: "#ffbf00" }}>
          <Left>
            <Text>Store</Text>
          </Left>
          <Body></Body>

          <Right>
            <Text>price</Text>
          </Right>
        </CardItem>
      </Card>

      <FlatList
        data={receipt}
        style={{ flex: 1 }}
        renderItem={renderItem}
        numColumns={1}
      />

      <Card style={{ width: 300, alignSelf: "center" }}>
        <CardItem>
          <Left>
            <Text style={{ color: "blue" }}>total</Text>
          </Left>
          <Body></Body>

          <Right>
            <Text style={{ color: "blue" }}>{total}</Text>
          </Right>
        </CardItem>
      </Card>
    </>
  );
};

export default observer(FolderItem);
