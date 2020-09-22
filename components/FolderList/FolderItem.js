import React from "react";
import { observer } from "mobx-react";

//Stores
import folderStore from "../../store/FolderStore";

//Styling
import { Card, List } from "react-native-paper";
import { IconStyled } from "./styles";
import { Body, CardItem, Left, Right, Row, Text } from "native-base";
import { View } from "react-native-animatable";
import Icon from "react-native-vector-icons/Feather";
import { Alert } from "react-native";

const FolderItem = ({ folder, navigation }) => {
  const deleteAlert = () => {
    Alert.alert("Delete", "Are you sure you want to delete this folder?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      { text: "OK", onPress: () => folderStore.deleteFolder(folder.id) },
    ]);
  };
  return (
    <Card style={{ marginTop: 5, width: "94%", alignSelf: "center" }}>
      <CardItem>
        <Left>
          <Text
            onPress={() =>
              navigation.navigate("ReceiptList", { folder: folder })
            }
          >
            {folder.name}
          </Text>
        </Left>
        <Body></Body>
        {!folder.defaultFolder && (
          <Right style={{ flexDirection: "row" }}>
            <Icon onPress={deleteAlert} name='trash-2' size='15' color='red' />

            <Icon
              onPress={() =>
                navigation.navigate("UpdateFolderForm", { oldFolder: folder })
              }
              name='edit-2'
              size='15'
            />
          </Right>
        )}
      </CardItem>
    </Card>
  );
};

export default observer(FolderItem);
