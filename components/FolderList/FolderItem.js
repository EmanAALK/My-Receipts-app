import React, { useState } from "react";
import { observer } from "mobx-react";

//Stores
import folderStore from "../../store/FolderStore";
import authStore from "../../store/authStore";

//Styling

import { View } from "react-native-animatable";
import { Alert, ShadowStyleIOS } from "react-native";
import { IconStyled, BorderView } from "./styles";
import { Card, List, TextInput } from "react-native-paper";
import Menu, { MenuItem, MenuDivider } from "react-native-material-menu";
import { Body, CardItem, Left, Right, Row, Text, ListItem ,Thumbnail} from "native-base";
import defaultimage from "../../assets/defaultimageFolder2.png";
import { CheckBox } from "react-native-elements";
import Icon from "react-native-vector-icons/AntDesign";

//Icons
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";



const color = "#ffbf00";

const FolderItem = ({ folder, navigation, multipul }) => {
  const [isChecked, setIsChecked] = useState(multipul);
  const [pin, setPin] = useState(pin);
  const [edit, setEdit] = useState(false);
  const [updatedFolder, setUpdatedFolder] = useState(folder);

  const PinList = folderStore.folders
    .filter((folder) => folder.userId === authStore.user.id)
    .filter((folder) => folder.pin == true);

  const handleChecked = () => {
    setIsChecked(!isChecked);
    if (!isChecked) {
      folderStore.selectedFolders.push(folder);
    } else
      folderStore.selectedFolders = folderStore.selectedFolders.filter(
        (item) => item.id !== folder.id
      );
  };

  let menu = null;

  const setMenuRef = (ref) => {
    menu = ref;
  };
  const showMenu = () => {
    menu.show();
  };

  const handleSubmit = async () => {
    menu.hide();
    await folderStore.updateFolder(updatedFolder);
    setEdit(!edit);
  };
  const handleEdit = async () => {
    menu.hide();
    setEdit(!edit);
  };
  const deleteAlert = () => {
    Alert.alert("Delete", "Are you sure you want to delete this folder?", [
      {
        text: "Cancel",
        style: "cancel",
        onPress: () => {
          menu.hide();
        },
      },
      {
        text: "OK",
        onPress: () => {
          folderStore.deleteFolder(folder.id);
          menu.hide();
        },
      },
    ]);
  };

  const maxAlert = () => {
    {
      !folder.pin
        ? Alert.alert("Alert", "You can pin 2 folders only", [
            {
              text: "Ok",
              style: "ok",
            },
          ])
        : folderStore.updateFolder({ ...folder, pin: !folder.pin });
    }
  };

  const handleChange = async () => {
    menu.hide();

    await folderStore.updateFolder({ ...folder, pin: !folder.pin });
  };

  return (
    <Card style={{ marginTop: 5, width: "94%", alignSelf: "center" }}>
      <CardItem>
        <Left>
          {multipul && !folder.defaultFolder && (
            <CheckBox
              checkedIcon="dot-circle-o"
              checkedColor="grey"
              uncheckedIcon="circle-o"
              size={15}
              checked={isChecked}
              onPress={handleChecked}
              value={false}
            />
          )}
          {folder.defaultFolder ? (
            <Entypo name="folder" size={20} color="#ffbf00" />
          ) : (
            <AntDesign name="folderopen" size={20} color="#ffbf00" />
          )}

          {edit ? (
            <>
              <TextInput
                style={{
                  height: 40,
                  backgroundColor: "white",
                  width: 230,
                }}
                onChangeText={(name) =>
                  setUpdatedFolder({ ...updatedFolder, name })
                }
                placeholder={folder.name}
              />

              <AntDesign
                name="edit"
                size={20}
                color="lightgrey"
                style={{ marginTop: 23 }}
                onPress={handleSubmit}
              />
            </>
          ) : (
            <Text
              onPress={() =>
                navigation.navigate("ReceiptList", { folder: folder })
              }
            >
              {folder.name}
            </Text>
          )}
        </Left>
        {folder.pin && (
          <Icon
            type="pushpin"
            name="pushpino"
            size={17}
            color={color}
            onPress={handleChange}
          />
        )}

        {!folder.defaultFolder && (
          <Menu
            ref={setMenuRef}
            style={{ width: 90, marginLeft: 15 }}
            button={
              <Text style={{ fontWeight: "bold" }} onPress={showMenu}>
                ...
              </Text>
            }
          >
            {PinList.length <= 1 ? (
              <MenuItem onPress={handleChange}>
                {folder.pin ? "Unpin" : "Pin"}
              </MenuItem>
            ) : (
              <MenuItem onPress={maxAlert}>
                {folder.pin ? "Unpin" : "Pin"}
              </MenuItem>
            )}
            <MenuItem onPress={handleEdit}>Rename</MenuItem>

            <MenuItem onPress={deleteAlert}>Delete</MenuItem>
          </Menu>
        )}
      </CardItem>
    </Card>
  );
};

export default observer(FolderItem);
