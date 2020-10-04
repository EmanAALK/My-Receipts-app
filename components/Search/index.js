import React, { useState } from "react";
import { observer } from "mobx-react";
import { SearchBar } from "react-native-elements";
//Stores
import folderStore from "../../store/FolderStore";
import authStore from "../../store/authStore";
import ReceiptStore from "../../store/ReceiptStore";
// Styling
import { PageTitle, BarStyle } from "./styles";
import { View } from "react-native-animatable";
import { ScrollView } from "react-native";
import DatePicker from "react-native-datepicker";
import SearchByFolder from "./SearchByFolder";
import SearchByReceipt from "./SearchByReceipt";
import { Left, Right, Row, Content, Text } from "native-base";
import DropDownPicker from "react-native-dropdown-picker";

const Search = ({ navigation }) => {
  const [query, setQuery] = useState();
  const [filter, setFilter] = useState(0);
  const [date, setDate] = useState("");
  const items = [
    { label: "All", value: 0 },
    { label: "Folder", value: 1 },
    { label: "Receipt", value: 2 },
    { label: "Date", value: 3 },
  ];
  const searchDate = ReceiptStore.receipts.filter(
    (receipt) => receipt.date === date || receipt.expDate === date
  );
  const folder = folderStore.folders.filter(
    (folder) => folder.userId === authStore.user.id
  );
  const searchFolder = folder.filter((folder) =>
    folder.name.toLowerCase().includes(query)
  );
  const searchReceipt = ReceiptStore.receipts.filter((receipt) =>
    receipt.name.toLowerCase().includes(query)
  );
  const handleSearch = (text) => {
    const formatQuery = text.toLowerCase();
    setQuery(formatQuery);
  };

  return (
    <>
      <Text
        style={{
          color: "#000000",
          fontSize: 25,
          marginTop: 14,
          marginBottom: 10,
          marginLeft: 35,
        }}
      >
        Search
      </Text>
      <View style={{ marginTop: 10 }}>
        {filter === 3 ? (
          <View style={{ width: "74%", height: 15 }}>
            <DatePicker
              style={{ width: 280, height: 20 }}
              date={date}
              mode='date'
              placeholder='select date'
              format='YYYY-MM-DD'
              confirmBtnText='Confirm'
              cancelBtnText='Cancel'
              showIcon={false}
              customStyles={{
                dateInput: {
                  height: 30,
                  marginTop: -14,
                  marginRight: 30,
                  marginLeft: 36,
                  borderRadius: 4,
                },
              }}
              onDateChange={(date) => {
                return setDate(date);
              }}
            />
          </View>
        ) : (
          <View style={{ width: "72%", height: 15 }}>
            <BarStyle>
              <SearchBar
                placeholder='Search'
                platform='ios'
                onChangeText={handleSearch}
                value={query}
                customStyles={{
                  searchInput: {
                    height: 40,
                  },
                }}
              />
            </BarStyle>
          </View>
        )}
        <DropDownPicker
          automaticallyAdjustContentInsets={false}
          style={{
            paddingVertical: 0,
          }}
          items={items}
          labelStyle={{
            fontSize: 14,
            textAlign: "left",
          }}
          defaultValue={filter}
          containerStyle={{
            height: 32,
            marginTop: -18,
            width: 85,
            marginLeft: "70%",
          }}
          itemStyle={{
            justifyContent: "flex-start",
          }}
          dropDownStyle={{ backgroundColor: "#ffffff" }}
          onChangeItem={(item) => setFilter(item.value)}
        />
        <ScrollView>
          {/* </Row> */}
          <View style={{ marginTop: 10 }}>
            {query !== "" && (
              <>
                {(filter === 0 || filter === 1) && (
                  <SearchByFolder
                    searchFolder={searchFolder}
                    navigation={navigation}
                  />
                )}
                {(filter === 0 || filter === 2) && (
                  <SearchByReceipt
                    searchReceipt={searchReceipt}
                    navigation={navigation}
                  />
                )}
                {filter === 3 && (
                  <SearchByReceipt
                    searchReceipt={searchDate}
                    navigation={navigation}
                  />
                )}
              </>
            )}
          </View>
        </ScrollView>
      </View>
    </>
  );
};
export default observer(Search);
