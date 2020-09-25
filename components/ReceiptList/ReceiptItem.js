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

  const handleChecked = () => {
    setIsChecked(!isChecked);

    if (!isChecked) {
      receiptStore.selectedReceipts.push(receipt);
    } else
      receiptStore.selectedReceipts = receiptStore.selectedReceipts.filter(
        (item) => item.id !== receipt.id
      );
  };





  const deleteAlert = () => {
    Alert.alert("Delete", "Are you sure you want to delete this receipt?", [
  const [updatedReceipt, setUpdatedReceipt] = useState(receipt);
  const [move, setMove] = useState(false);
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

    setUpdatedReceipt({
      ...updatedReceipt,
      archive: !updatedReceipt.archive,
    });

    await receiptStore.updateReceipt(updatedReceipt);
  };
  const handleMove = async (folderId) => {
    // menu.hide();
    setUpdatedReceipt({
      ...updatedReceipt,
      folderId,
    });
    console.log(",,,,,setUpdatedReceipt", setUpdatedReceipt);

    await receiptStore.updateReceipt(updatedReceipt);
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

  return (
    <ListItem
      onPress={() => navigation.navigate("ReceiptDetail", { receipt: receipt })}
    >
      {multipul && (
        <CheckBox
          checkedIcon="dot-circle-o"
          checkedColor="grey"
          uncheckedIcon="circle-o"
          checked={isChecked}
          onPress={handleChecked}
          value={false}
        />
      )}

      <Thumbnail
        style={{ marginBottom: 5, marginRight: 16, textAligin: "center" }}
        source={defaultimage}
      />

      <Left>
        <Text>{receipt.name}</Text>
      </Left>


//       <>
//         <Right>
//           <DeleteButtonStyled onPress={deleteAlert}>Delete</DeleteButtonStyled>
//           <DeleteButtonStyled
//             onPress={() =>
//               navigation.navigate("UpdateReceiptForm", { oldReceipt: receipt })
//             }
//           >
//             Update
//           </DeleteButtonStyled>
//         </Right>
//       </>

    </ListItem>
    <>
      <ListItem
        onPress={() =>
          navigation.navigate("ReceiptDetail", { receipt: receipt })
        }
      >
        <>
          <Left>
            <Icon name="receipt" size={25} color="lightgrey" />
            <Text style={{ paddingLeft: 20 }}>{receipt.name}</Text>
          </Left>

          <Menu
            ref={setMenuRef}
            button={
              <Text style={{ fontWeight: "bold" }} onPress={showMenu}>
                ...
              </Text>
            }
          >
            <MenuItem onPress={handleSubmit}>
              {receipt.archive ? "unArchive" : "Archive"}
            </MenuItem>
            <MenuItem onPress={() => setMove(!move)}>Move</MenuItem>
            {move && (
              <RNPickerSelect
                // onValueChange={(folderId) =>
                //   setUpdatedReceipt({ ...updatedReceipt, folderId })
                // }
                onValueChange={(folderId) => handleMove(folderId)}
                items={folder.map((folder) => ({
                  label: folder.name,
                  value: folder.id,
                }))}
              />
            )}

            <MenuItem onPress={deleteAlert}>Delete</MenuItem>
          </Menu>
        </>
      </ListItem>
    </>
  );
};

export default observer(ReceiptItem);
