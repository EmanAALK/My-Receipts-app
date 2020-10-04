import React, { useState } from "react";
import { observer } from "mobx-react";

// Styling
import { Text, CardItem, List, ListItem } from "native-base";
import { View } from "react-native-animatable";
import { FlatList } from "react-native";
// import { List } from "react-native-paper";
import AntDesign from "react-native-vector-icons/AntDesign";

const Search = ({ navigation, searchFolder }) => {
  const renderItem = ({ item }) => {
    return (
      <List
        style={{
          alignSelf: "center",
          marginTop: 10,
          marginBottom: 5,
          width: "89%",
          height: 50,
        }}
      >
        <ListItem
          style={{
            margin: 1,
            marginBottom: 0,
            paddingLeft: 5,
          }}
        >
          <AntDesign
            style={{ paddingRight: 10 }}
            name='folder1'
            size={20}
            color='#ffbf00'
          />
          <Text
            onPress={() => navigation.navigate("ReceiptList", { folder: item })}
          >
            {item.name}
          </Text>
        </ListItem>
      </List>
    );
  };

  return (
    <View style={{ marginTop: 10 }}>
      <FlatList data={searchFolder} renderItem={renderItem} numColumns={1} />
    </View>
  );
};

export default observer(Search);
