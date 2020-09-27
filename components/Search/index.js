import React, { useState } from "react";
import { observer } from "mobx-react";
import { SearchBar } from "react-native-elements";

//Stores
import folderStore from "../../store/FolderStore";
import authStore from "../../store/authStore";
import ReceiptStore from "../../store/ReceiptStore";

// Styling
import PageTitle from "./styles";
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
      <Text style={{ marginTop: 100 }}>Search</Text>

      <View>
        <View style={{ width: "74%", height: 15 }}>
          {filter === 3 ? (
            <DatePicker
              style={{ width: 255, marginTop: 8 }}
              date={date}
              mode='date'
              placeholder='select date'
              format='YYYY-MM-DD'
              confirmBtnText='Confirm'
              cancelBtnText='Cancel'
              confirmBtnText='search'
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
              onDateChange={(date) => {
                return setDate(date);
              }}
            />
          ) : (
            <View style={{ width: "95%", height: 15 }}>
              <SearchBar
                placeholder='Search'
                platform='ios'
                onChangeText={handleSearch}
                value={query}
              />
            </View>
          )}
        </View>

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
            marginTop: -7,
            width: 100,
            marginLeft: "70%",
          }}
          itemStyle={{
            justifyContent: "flex-start",
          }}
          dropDownStyle={{ backgroundColor: "#fafafa" }}
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
