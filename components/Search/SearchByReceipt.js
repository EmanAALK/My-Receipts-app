import React, { useState } from "react";
import { observer } from "mobx-react";

// Styling
import { Text, CardItem, ListItem, List } from "native-base";
import { View } from "react-native-animatable";
import { FlatList } from "react-native";
import { Card } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Search = ({ navigation, searchReceipt }) => {
  const renderItem = ({ item }) => {
    return (
      <List
        style={{
          // alignSelf: "center",
          marginRight: 10,
          marginLeft: 10,
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
            paddingLeft: 10,
          }}
        >
          <Icon
            style={{ paddingRight: 10 }}
            name='receipt'
            size={20}
            color='lightgrey'
          />
          <Text
            onPress={() =>
              navigation.navigate("ReceiptDetail", { receipt: item })
            }
          >
            {item.name}
          </Text>
          <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 12 }} note>
              Purchase Date: {item.date}
            </Text>
            <Text style={{ fontSize: 12 }} note>
              Expiration Date: {item.expDate}
            </Text>
          </View>
        </ListItem>
      </List>
    );
  };

  return (
    <View style={{ marginTop: 10 }}>
      <FlatList data={searchReceipt} renderItem={renderItem} numColumns={1} />
    </View>
  );
};

export default observer(Search);
