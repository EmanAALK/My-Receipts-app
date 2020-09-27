import React, { useState } from "react";
import { observer } from "mobx-react";

// component
import FolderItem from "./FolderItem";

// Styling
import { List, Spinner, Text, View, ListItem } from "native-base";
import { PageTitle } from "./styles";

// store
import folderStore from "../../store/FolderStore";
import authStore from "../../store/authStore";

//Icons
import AntDesign from "react-native-vector-icons/AntDesign";

const FolderList = ({ navigation }) => {
  if (folderStore.loading) return <Spinner />;

  const PinList = folderStore.folders
    .filter((folder) => folder.userId === authStore.user.id)
    .filter((folder) => folder.pin == true)
    .map((folder) => (
      <FolderItem folder={folder} key={folder.id} navigation={navigation} />
    ));

  const UnPinList = folderStore.folders
    .filter((folder) => folder.userId === authStore.user.id)
    .filter((folder) => folder.pin == false)
    .map((folder) => (
      <FolderItem folder={folder} key={folder.id} navigation={navigation} />
    ));

  return (
    <>
      <View style={{ flexDirection: "row" }}>
        <PageTitle>My Folders</PageTitle>
        <AntDesign
          onPress={() => navigation.navigate("CreateFolderForm")}
          name='addfolder'
          size={25}
          color='#ffbf00'
          style={{ marginTop: 20, marginBottom: 20, marginLeft: 170 }}
        />
      </View>

      <List>{PinList}</List>
      <List>{UnPinList}</List>
    </>
  );
};

export default observer(FolderList);
