import React, { useState } from "react";
import { observer } from "mobx-react";

// Styling
import { Text, CardItem } from "native-base";
import { View } from "react-native-animatable";
import { FlatList } from "react-native";
import { Card } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Search = ({ navigation, searchReceipt }) => {
  const renderItem = ({ item }) => {
    return (
      <Card
        style={{
          alignSelf: "center",
          width: "89%",
          height: 90,
        }}
      >
        <CardItem
          style={{
            margin: 1,
            marginBottom: 0,
            paddingLeft: 30,
          }}
        >
          <Icon
            style={{ paddingRight: 10 }}
            name="receipt"
            size={20}
            color="lightgrey"
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
              Date of purchase: {item.date}
            </Text>
            <Text style={{ fontSize: 12 }} note>
              Expiration Date: {item.expDate}
            </Text>
          </View>
        </CardItem>
      </Card>
    );
  };

  return (
    <View style={{ marginTop: 10 }}>
      <FlatList data={searchReceipt} renderItem={renderItem} numColumns={1} />
    </View>
  );
};

export default observer(Search);
