import React, { useState } from "react";
import { observer } from "mobx-react";
import { SearchBar } from "react-native-elements";

import FolderItem from "../FolderList/FolderItem";
import folderStore from "../../store/FolderStore";
import DropDownPicker from "react-native-dropdown-picker";
import ReceiptStore from "../../store/ReceiptStore";
// Styling
import { Row, Text, CardItem } from "native-base";
import { View } from "react-native-animatable";
import { FlatList, ScrollView } from "react-native";
import { Card } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import DatePicker from "react-native-datepicker";
import CalendarPicker from "react-native-calendar-picker";

const Search = ({ navigation }) => {
  const [query, setQuery] = useState();
  const [filter, setFilter] = useState(0);
  const items = [
    { label: "All", value: 0 },
    { label: "Folder", value: 1 },
    { label: "Receipt", value: 2 },
    { label: "Date", value: 3 },
  ];

  const searchFolder = folderStore.folders.filter((folder) =>
    folder.name.toLowerCase().includes(query)
  );

  const searchReceipt = ReceiptStore.receipts.filter((receipt) =>
    receipt.name.toLowerCase().includes(query)
  );
  const handleSearch = (text) => {
    const formatQuery = text.toLowerCase();

    setQuery(formatQuery);
  };

  const renderItem = ({ item }) => {
    return (
      <Card
        style={{
          alignSelf: "center",

          marginBottom: 5,
          width: "89%",
          height: 50,
        }}
      >
        <CardItem
          style={{
            margin: 1,
            marginBottom: 0,
            paddingLeft: 30,
          }}
        >
          <Text>{item.name}</Text>
        </CardItem>
      </Card>
    );
  };

  return (
    <>
      <Row style={{ marginLeft: 4, marginRight: 12, marginBottom: 0 }}>
        <View style={{ width: "74%", height: 15 }}>
          {filter === 3 ? (
            <DatePicker
              style={{ width: 255, marginTop: 8 }}
              // date={receipt.date}
              mode="date"
              placeholder="select date"
              format="YYYY-MM-DD"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              // maxDate={Date}
              confirmBtnText="search"
              customStyles={{
                dateIcon: {
                  position: "absolute",
                  left: 0,
                  top: 4,
                  marginRight: 4,
                  marginLeft: 0,
                  borderColor: "#cea146",
                },
                dateInput: {
                  marginLeft: 36,
                },
              }}
              // onDateChange={(date) => {
              //   return setReceipt({ ...receipt, date });
              // }}
            />
          ) : (
            <SearchBar
              placeholder="Type Here..."
              lightTheme
              onChangeText={handleSearch}
              value={query}
              // style={{ backgroundColor: "white" }}
            />
          )}
        </View>
        <DropDownPicker
          Icon={<Icon name="filter-variant" color="grey" size="25" />}
          items={items}
          labelStyle={{
            fontSize: 14,
            textAlign: "left",
          }}
          defaultValue={filter}
          containerStyle={{
            height: 32,
            marginTop: 10,
            width: 100,
          }}
          style={{
            paddingVertical: 0,
          }}
          itemStyle={{
            justifyContent: "flex-start",
          }}
          dropDownStyle={{ backgroundColor: "#fafafa" }}
          onChangeItem={(item) => setFilter(item.value)}
        />
      </Row>

      {query !== "" && (
        <ScrollView>
          {(filter === 0 || filter === 1) && (
            <FlatList
              data={searchFolder}
              renderItem={renderItem}
              numColumns={1}
            />
          )}

          {(filter === 0 || filter === 2) && (
            <FlatList
              data={searchReceipt}
              renderItem={renderItem}
              numColumns={1}
            />
          )}
        </ScrollView>
      )}
    </>
  );
};

export default observer(Search);
