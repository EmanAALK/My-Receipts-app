import React, { useState } from "react";
import { observer } from "mobx-react";

//Stores
import receiptStore from "../../store/ReceiptStore";
import folderStore from "../../store/FolderStore";
import authStore from "../../store/authStore";

//Components
import FolderItem from "./FolderItem";

//Styling
import { Text, View, Card, CardItem, Left, Right } from "native-base";
import { Table, Row } from "react-native-table-component";
import { ScrollView } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

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
  console.log(",,,,,folderList", folderList.length);

  const receipt = receiptStore.receipts.filter((receipt) =>
    filterFolder.find((filter) => receipt.folder.id === filter.id)
  );
  const amount = receipt.map((receipt) => (total = total + +receipt.price));
  return (
    <>
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
          marginTop: 25,
          marginLeft: 38,
          width: 220,
          marginBottom: 20,
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
        multipleText='%d folder has been selected'
        dropDownStyle={{ backgroundColor: "#fafafa" }}
        onChangeItem={(item) => setFilter(item)}
      ></DropDownPicker>

      <ScrollView>
        {folderList}
        {filter.length !== 0 && (
          <>
            <Card style={{ width: 300, alignSelf: "center" }}>
              <CardItem>
                <Left>
                  <Text style={{ color: "red" }}>Total Amount</Text>
                </Left>

                <Right>
                  <Text style={{ color: "red" }}>{total}</Text>
                </Right>
              </CardItem>
            </Card>
          </>
        )}
      </ScrollView>
    </>
  );
};
export default observer(CalculateByFolder);
