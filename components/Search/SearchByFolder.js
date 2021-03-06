import React, { useState } from "react";
import { observer } from "mobx-react";

// Styling
import { Text, CardItem } from "native-base";
import { View } from "react-native-animatable";
import { FlatList } from "react-native";
import { Card } from "react-native-paper";
import AntDesign from "react-native-vector-icons/AntDesign";

const Search = ({ navigation, searchFolder }) => {
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
          <AntDesign
            style={{ paddingRight: 10 }}
            name="folderopen"
            size={20}
            color="#ffbf00"
          />
          <Text
            onPress={() => navigation.navigate("ReceiptList", { folder: item })}
          >
            {item.name}
          </Text>
        </CardItem>
      </Card>
    );
  };

  return (
    <View style={{ marginTop: 10 }}>
      <FlatList data={searchFolder} renderItem={renderItem} numColumns={1} />
    </View>
  );
};

export default observer(Search);
