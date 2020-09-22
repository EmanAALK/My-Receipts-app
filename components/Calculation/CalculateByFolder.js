import React, { useState } from "react";
import { observer } from "mobx-react";

import { Text, View } from "native-base"; // unused import
import { InputContainer, TextStyle } from "./styles"; // unused import
import receiptStore from "../../store/ReceiptStore";
import folderStore from "../../store/FolderStore";
import authStore from "../../store/authStore";
import DropDownPicker from "react-native-dropdown-picker";
import FolderItem from "./FolderItem";
import { ScrollView } from "react-native";
import { Table, Row } from "react-native-table-component";
import { Card } from "react-native-paper"; // unused import

const CalculateByFolder = ({ navigation }) => {
  const [filter, setFilter] = useState([]);
  let total = 0;

  // 🐍
  const folder = folderStore.folders.filter(
    (folder) => folder.userId === authStore.user.id
  );

  // can be const
  let items = folder.map((item) => ({ label: item.name, value: item.id }));
  items.push({ label: "All Folders", value: 0 });

  // const
  // name is a bit confusing
  // doesn't tell me what this contains or what it's used for
  let filterFolder = folder.filter((folder) =>
    filter.find((filter) => folder.id === filter)
  );
  if (filter.includes(0)) filterFolder = folder;

  const folderList = filterFolder.map((folder) => (
    <FolderItem folder={folder} key={folder.id} navigation={navigation} />
  ));

  // 🐍
  const receipt = receiptStore.receipts.filter((receipt) =>
    filterFolder.find((filter) => receipt.folder.id === filter.id)
  );

  // not being used
  const amount = receipt.map((receipt) => (total = total + receipt.price));
  return (
    <>
      <ScrollView>
        <Text style={{ marginTop: 10, marginLeft: 30 }}>Folder :</Text>

        <DropDownPicker
          multiple={true}
          items={items}
          labelStyle={{
            fontSize: 14,
            textAlign: "left",
            color: "#000",
          }}
          containerStyle={{
            height: 35,
            marginTop: -25,
            marginLeft: 15,
            width: 200,
            alignSelf: "center",
          }}
          style={{
            backgroundColor: "white",
            paddingVertical: 0,
          }}
          itemStyle={{
            justifyContent: "flex-start",
          }}
          multiple={true}
          multipleText='%d items have been selected.'
          dropDownStyle={{ backgroundColor: "#fafafa" }}
          onChangeItem={(item) => setFilter(item)}
        ></DropDownPicker>

        {folderList}
        {/* the condition below can be simplified to `{filter.length && ...}` */}
        {filter !== [] && (
          <Table borderStyle={{ borderWidth: 1, borderColor: "lightgrey" }}>
            <Row
              data={["Total Amount", total]}
              style={{
                height: 30,
                // backgroundColor: "#FFCC22 ",
                marginTop: 20,
              }}
              textStyle={{ marginLeft: 30, color: "red" }}
            />
          </Table>
        )}
      </ScrollView>
    </>
  );
};

export default observer(CalculateByFolder);
