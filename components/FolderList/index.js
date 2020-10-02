import React, { useState } from "react";
import { observer } from "mobx-react";
// component
import FolderItem from "./FolderItem";
// Styling
import { ButtonGroup } from "react-native-elements";
import { List, Spinner, Text, View, ListItem } from "native-base";
import { Alert, Modal, StyleSheet, TouchableHighlight } from "react-native";
import { PageTitle } from "./styles";

// store
import folderStore from "../../store/FolderStore";
import authStore from "../../store/authStore";

//Icons
import Icon from "react-native-vector-icons/AntDesign";

import AntDesign from "react-native-vector-icons/AntDesign";

const FolderList = ({ navigation }) => {
  if (folderStore.loading) return <Spinner />;

  const [multipul, setMultipul] = useState(false);

  const PinList = folderStore.folders
    .filter((folder) => folder.userId === authStore.user.id)
    .filter((folder) => folder.pin)
    .map((folder) => (
      <FolderItem
        folder={folder}
        key={folder.id}
        navigation={navigation}
        multipul={multipul}
      />
    ));

  const defualtFolderList = folderStore.folders
    .filter((folder) => folder.userId === authStore.user.id)
    .filter((folder) => folder.defaultFolder)
    .map((folder) => (
      <FolderItem
        folder={folder}
        key={folder.id}
        navigation={navigation}
        multipul={multipul}
      />
    ));

  const UnPinList = folderStore.folders
    .filter((folder) => folder.userId === authStore.user.id)
    .filter((folder) => !folder.pin && !folder.defaultFolder)
    .map((folder) => (
      <FolderItem
        folder={folder}
        key={folder.id}
        navigation={navigation}
        multipul={multipul}
      />
    ));
  const deleteReceipt = () => {
    folderStore.selectedFolders.map((folder) => {
      folderStore.deleteFolder(folder.id);
    });
  };
  const handleDelete = () => {
    setMultipul(!multipul);

    if (multipul && folderStore.selectedFolders.length !== 0) {
      Alert.alert("Delete", "Are you sure you want to delete this folder?", [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            deleteReceipt();
          },
        },
      ]);
    } else folderStore.selectedFolders = [];
  };

  return (
    <>
      <View style={{ flexDirection: "row" }}>
        <PageTitle>My Folders</PageTitle>
        <AntDesign
          onPress={() => navigation.navigate("CreateFolderForm")}
          name="addfolder"
          size={25}
          color="#ffbf00"
          style={{ marginTop: 20, marginBottom: 20, marginLeft: 170 }}
        />
      </View>

      <Text style={{ marginLeft: 300 }} onPress={handleDelete}>
        {multipul && folderStore.selectedFolders.length > 0
          ? "Delete"
          : "Select"}
      </Text>

      {/* { <ButtonGroup
         buttons={[
           <Text onPress={() => navigation.navigate("CreateFolderForm")}>
             Add Folder
          </Text>,
          <Text>
            <Icon
              onPress={() => navigation.navigate("Search")}
              name="search1"
              color="grey"
              size={25}
            />
          </Text>,
         ]}
         containerStyle={{ height: 30, marginTop: 10 }}
         selectedButtonStyle={{ backgroundColor: "grey" }}
       />  */}

      <List>{defualtFolderList}</List>
      <List style={{ marginTop: 20 }}>{PinList}</List>

      <List style={{ marginTop: 20 }}>{UnPinList}</List>
    </>
  );
};
export default observer(FolderList);
