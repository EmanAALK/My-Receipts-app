import React from "react";
import { observer } from "mobx-react";

//Stores
import receiptStore from "../../store/ReceiptStore";
import { FlatList } from "react-native";
import { Table, Row } from "react-native-table-component";

//Styling
import { Text } from "native-base";

const ReceiptItem = ({ folder, navigation }) => {
  let total = 0;
  const receipt = receiptStore.receipts.filter(
    (receipt) => receipt.folder.id === folder.id
  );

  const amount = receipt.map((receipt) => (total = total + receipt.price));

  const renderItem = ({ item }) => {
    return (
      <Table borderStyle={{ borderWidth: 1, borderColor: "lightgrey" }}>
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
      <Table borderStyle={{ borderWidth: 1, borderColor: "lightgrey" }}>
        <Row
          data={["Store", "price"]}
          style={{
            height: 30,
            backgroundColor: "white",
          }}
          textStyle={{ marginLeft: 30, color: "red" }}
        />
      </Table>
      <FlatList
        data={receipt}
        style={{ flex: 1 }}
        renderItem={renderItem}
        numColumns={1}
      />
      <Table borderStyle={{ borderWidth: 1, borderColor: "lightgrey" }}>
        <Row
          data={["Total", total]}
          style={{
            height: 30,
            backgroundColor: "white",
          }}
          textStyle={{ marginLeft: 30, color: "red" }}
        />
      </Table>
    </>
  );
};

export default observer(ReceiptItem);
