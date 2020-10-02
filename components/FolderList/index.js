import React, { useState } from "react";
import { observer } from "mobx-react";
// component
import FolderItem from "./FolderItem";
// Styling
import { ButtonGroup } from "react-native-elements";
import { List, Spinner, Text, View, ListItem } from "native-base";
import {
  Alert,
  Modal,
  StyleSheet,
  TouchableHighlight,
  ScrollView,
} from "react-native";
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
      <PageTitle>My Folders</PageTitle>
      <View style={{ flexDirection: "row" }}>
        <Text
          style={{ marginLeft: 30, color: "#ffbf00" }}
          onPress={handleDelete}
        >
          {multipul && folderStore.selectedFolders.length > 0
            ? "Delete"
            : "Edit"}
        </Text>
        <AntDesign
          onPress={() => navigation.navigate("CreateFolderForm")}
          name="addfolder"
          size={25}
          color="#ffbf00"
          style={{ marginBottom: 20, marginLeft: 250 }}
        />
      </View>
      <ScrollView>
        <List>{defualtFolderList}</List>

        <List>{PinList}</List>

        <List>{UnPinList}</List>
      </ScrollView>
    </>
  );
};
export default observer(FolderList);
