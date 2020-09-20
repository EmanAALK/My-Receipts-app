import React, { useState } from "react";
import { observer } from "mobx-react";

import { Text, View } from "native-base";
import { InputContainer, TextStyle } from "./styles";
import receiptStore from "../../store/ReceiptStore";
import folderStore from "../../store/FolderStore";
import authStore from "../../store/authStore";
import DropDownPicker from "react-native-dropdown-picker";
import FolderItem from "./FolderItem";
import { ScrollView } from "react-native";
import { Table, Row } from "react-native-table-component";

const CalculateByFolder = ({ navigation }) => {
  const [filter, setFilter] = useState([]);
  let total = 0;

  const folder = folderStore.folders.filter(
    (folder) => folder.userId === authStore.user.id
  );

  let items = folder.map((item) => ({ label: item.name, value: item.id }));
  items.push({ label: "All Folders", value: 0 });

  let filterFolder = folder.filter((folder) =>
    filter.find((filter) => folder.id === filter)
  );
  if (filter.includes(0)) filterFolder = folder;

  const folderList = filterFolder.map((folder) => (
    <FolderItem folder={folder} key={folder.id} navigation={navigation} />
  ));

  const receipt = receiptStore.receipts.filter((receipt) =>
    filterFolder.find((filter) => receipt.folder.id === filter.id)
  );

  const amount = receipt.map((receipt) => (total = total + receipt.price));

  return (
    <ScrollView>
      <View style={{ flexDirection: "row", alignSelf: "center" }}>
        <TextStyle>Folder :</TextStyle>

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
            marginTop: 10,
            width: 230,
          }}
          style={{
            backgroundColor: "white",
            paddingVertical: 0,
          }}
          itemStyle={{
            justifyContent: "flex-start",
          }}
          multiple={true}
          multipleText="%d items have been selected."
          dropDownStyle={{ backgroundColor: "#fafafa" }}
          onChangeItem={(item) => setFilter(item)}
        ></DropDownPicker>
      </View>

      {folderList}
      {filter !== [] && (
        <Table borderStyle={{ borderWidth: 1, borderColor: "lightgrey" }}>
          <Row
            data={["Total Amount", total]}
            style={{
              height: 30,
              backgroundColor: "#eddcd2",
              marginTop: 20,
            }}
            textStyle={{ marginLeft: 30, color: "red" }}
          />
        </Table>
      )}
    </ScrollView>
  );
};

export default observer(CalculateByFolder);
