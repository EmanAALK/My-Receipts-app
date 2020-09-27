import React, { useState } from "react";
import { observer } from "mobx-react";

//Stores
import folderStore from "../../store/FolderStore";

//Styling

// import { Card, CardItem, List, ListItem } from "react-native-elements";
import { IconStyled, BorderView } from "./styles";
import { Body, Left, Right, Text, ListItem } from "native-base";

import { Alert, ShadowStyleIOS } from "react-native";

//Icons
import Icon from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";

const FolderItem = ({ folder, navigation }) => {
  const [pin, setPin] = useState(pin);
  const deleteAlert = () => {
    Alert.alert("Delete", "Are you sure you want to delete this folder?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      { text: "OK", onPress: () => folderStore.deleteFolder(folder.id) },
    ]);
  };

  const handleChange = async () => {
    await folderStore.updateFolder({ ...folder, pin: !folder.pin });
  };

  return (
    <ListItem
      style={{ backgroundColor: "white", marginRight: 14, marginLeft: 14 }}
    >
      <Left>
        {folder.defaultFolder ? (
          <AntDesign
            name='folder1'
            size={20}
            color='#ffbf00'
            style={{ marginLeft: 10 }}
          />
        ) : (
          <AntDesign
            name='folder1'
            size={20}
            color='#ffbf00'
            style={{ marginLeft: 10 }}
          />
        )}
        <Text
          style={{ marginLeft: 10 }}
          onPress={() => navigation.navigate("ReceiptList", { folder: folder })}
        >
          {folder.name}
        </Text>
      </Left>

      {!folder.defaultFolder && (
        <Right style={{ flexDirection: "row" }}>
          <Icon
            onPress={deleteAlert}
            name='trash-2'
            fontSize={15}
            color='red'
          />

          <Icon
            onPress={() =>
              navigation.navigate("UpdateFolderForm", { oldFolder: folder })
            }
            name='edit-2'
            fontSize={15}
          />
          <IconStyled onPress={handleChange}>
            <IconStyled type='AntDesign' name='pushpino' size='5' />
          </IconStyled>
        </Right>
      )}
    </ListItem>
  );
};

export default observer(FolderItem);
