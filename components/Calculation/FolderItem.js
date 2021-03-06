import React from "react";
import { observer } from "mobx-react";

//Stores
import receiptStore from "../../store/ReceiptStore";
import { FlatList } from "react-native";
import { Table, Row } from "react-native-table-component";

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
      <Table
        borderStyle={{ borderWidth: 1, borderColor: "lightgrey" }}
        style={{ width: 350, alignSelf: "center" }}
      >
        <Row
          data={[item.name, item.price]}
          style={{
            height: 30,
            backgroundColor: "white",
          }}
          textStyle={{ marginLeft: 30 }}
        />
      </Table>
    );
  };

  return (
    <>
      <Text style={{ margin: 10 }}>Folder: {folder.name}</Text>
      <Table
        borderStyle={{ borderWidth: 1, borderColor: "lightgrey" }}
        style={{ width: 350, alignSelf: "center" }}
      >
        <Row
          data={["Store", "price"]}
          style={{
            height: 30,
            backgroundColor: "white",
          }}
          textStyle={{ marginLeft: 30, color: "blue" }}
        />
      </Table>
      <FlatList
        data={receipt}
        style={{ flex: 1 }}
        renderItem={renderItem}
        numColumns={1}
      />
      <Table
        borderStyle={{ borderWidth: 1, borderColor: "lightgrey" }}
        style={{ width: 350, alignSelf: "center" }}
      >
        <Row
          data={["Total", total]}
          style={{
            height: 30,
            backgroundColor: "white",
            width: 350,
            alignSelf: "center",
          }}
          textStyle={{ marginLeft: 30, color: "blue" }}
        />
      </Table>
    </>
  );
};

export default observer(FolderItem);
