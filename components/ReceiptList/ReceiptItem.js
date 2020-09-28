import React, { useState } from "react";
import { observer } from "mobx-react";
//Stores
import receiptStore from "../../store/ReceiptStore";
import folderStore from "../../store/FolderStore";
import authStore from "../../store/authStore";
//Styling
import {
  ListItem,
  Left,
  Right,
  Text,
  View,
  // Button,
  Thumbnail,
} from "native-base";
import { CheckBox } from "react-native-elements";
import { Card, Divider, Button } from "react-native-paper";
import defaultimage from "../../assets/defaultimage.png";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import DropDownPicker from "react-native-dropdown-picker";
import { Alert } from "react-native";
import Menu, { MenuItem, MenuDivider } from "react-native-material-menu";
import RNPickerSelect from "react-native-picker-select";

const ReceiptItem = ({ receipt, navigation, multipul }) => {
  const [isChecked, setIsChecked] = useState(multipul);
  const [updatedReceipt, setUpdatedReceipt] = useState(receipt);
  const [move, setMove] = useState(false);
  console.log(",,,,multipul", multipul);
  const handleChecked = () => {
    setIsChecked(!isChecked);
    if (!isChecked) {
      receiptStore.selectedReceipts.push(receipt);
    } else
      receiptStore.selectedReceipts = receiptStore.selectedReceipts.filter(
        (item) => item.id !== receipt.id
      );
  };
  let menu = null;
  const folder = folderStore.folders.filter(
    (folder) => folder.userId === authStore.user.id
  );
  const setMenuRef = (ref) => {
    menu = ref;
  };
  const showMenu = () => {
    menu.show();
  };
  const handleSubmit = async () => {
    menu.hide();
    await receiptStore.updateReceipt({
      ...updatedReceipt,
      archive: !updatedReceipt.archive,
    });
  };
  const deleteAlert = () => {
    // menu.hide();
    Alert.alert("Delete", "Are you sure you want to delete this Receipt?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      { text: "OK", onPress: () => receiptStore.deleteReceipt(receipt.id) },
    ]);
  };
  return (
    <>
      <ListItem
        onPress={() =>
          navigation.navigate("ReceiptDetail", { receipt: receipt })
        }
      >
        <Left>
          <Icon name="receipt" size={25} color="lightgrey" />
          <Text style={{ paddingLeft: 20 }}>{receipt.name}</Text>
        </Left>
      </ListItem>
      <ListItem
        onPress={() =>
          navigation.navigate("ReceiptDetail", { receipt: receipt })
        }
      >
        {multipul && (
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
        <Left>
          <Icon name="receipt" size={25} color="lightgrey" />
          <Text style={{ paddingLeft: 20 }}>{receipt.name}</Text>
        </Left>
        <Menu
          ref={setMenuRef}
          button={
            <Text style={{ fontWeight: "bold" }} onPress={showMenu}></Text>
          }
        >
          <MenuItem onPress={handleSubmit}>
            {receipt.archive ? "unArchive" : "Archive"}
          </MenuItem>
          <MenuItem onPress={deleteAlert}>Delete</MenuItem>
        </Menu>
      </ListItem>
    </>
  );
};
export default observer(ReceiptItem);
