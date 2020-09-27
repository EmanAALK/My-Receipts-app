import React, { useState } from "react";
import { observer } from "mobx-react";

//Stores
import folderStore from "../../store/FolderStore";
import authStore from "../../store/authStore";
//Styling
import { Card, List } from "react-native-paper";
import { IconStyled } from "./styles";
import {
  Body,
  CardItem,
  Left,
  Right,
  Row,
  Text,
  Thumbnail,
  TouchableHighlight,
} from "native-base";
import { View } from "react-native-animatable";
import Icon from "react-native-vector-icons/Feather";
import Entypo from "react-native-vector-icons/Entypo";

import { Alert } from "react-native";
import defaultimage from "../../assets/defaultimageFolder2.png";

import AntDesign from "react-native-vector-icons/AntDesign";

const FolderItem = ({ folder, navigation }) => {
  const [pin, setPin] = useState(pin);

  const PinList = folderStore.folders
    .filter((folder) => folder.userId === authStore.user.id)
    .filter((folder) => folder.pin == true);

  const handleChange = async () => {
    await folderStore.updateFolder({ ...folder, pin: !folder.pin });
  };
  const maxAlert = () => {
    {
      folder.pin === false
        ? Alert.alert("Alert", "You can pin 2 folders only", [
            {
              text: "Ok",
              style: "ok",
            },
          ])
        : folderStore.updateFolder({ ...folder, pin: !folder.pin });
    }
  };

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
          {folder.defaultFolder ? (
            <Entypo name="folder" size={20} color="#ffbf00" />
          ) : (
            <AntDesign name="folderopen" size={20} color="#ffbf00" />
          )}
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
            <Icon
              onPress={deleteAlert}
              name="trash-2"
              fontSize={15}
              color="red"
            />

            <Icon
              onPress={() =>
                navigation.navigate("UpdateFolderForm", { oldFolder: folder })
              }
              name="edit-2"
              fontSize={15}
            />
            {PinList.length <= 1 ? (
              <IconStyled onPress={handleChange}>
                <IconStyled type="AntDesign" name="pushpino" size="5" />
              </IconStyled>
            ) : (
              <IconStyled onPress={maxAlert}>
                <IconStyled type="AntDesign" name="pushpino" size="5" />
              </IconStyled>
            )}
          </Right>
        )}
      </CardItem>
    </Card>
  );
};

export default observer(FolderItem);
