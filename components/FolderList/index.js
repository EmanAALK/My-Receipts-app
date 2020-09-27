import React, { useState } from "react";
import { observer } from "mobx-react";

// component
import FolderItem from "./FolderItem";

// Styling
import { List, Spinner, Text } from "native-base";
import { ButtonGroup } from "react-native-elements";

// store
import folderStore from "../../store/FolderStore";
import authStore from "../../store/authStore";
import Icon from "react-native-vector-icons/AntDesign";
import { Alert } from "react-native";

const FolderList = ({ navigation }) => {
  if (folderStore.loading) return <Spinner />;
  const [multipul, setMultipul] = useState(false);

  const PinList = folderStore.folders
    .filter((folder) => folder.userId === authStore.user.id)
    .filter((folder) => folder.pin == true || folder.defaultFolder === true)
    .map((folder) => (
      <FolderItem folder={folder} key={folder.id} navigation={navigation} />
    ));

  const UnPinList = folderStore.folders
    .filter((folder) => folder.userId === authStore.user.id)
    .filter((folder) => folder.pin == false && !folder.defaultFolder)
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
      <Text style={{ marginLeft: 300 }} onPress={handleDelete}>
        {multipul && folderStore.selectedFolders.length > 0
          ? "Delete"
          : "Select"}
      </Text>
      <ButtonGroup
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
      />

      <List>{PinList}</List>
      <List>{UnPinList}</List>
    </>
  );
};

export default observer(FolderList);
