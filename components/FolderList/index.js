import React from "react";
import { observer } from "mobx-react";

// component
import FolderItem from "./FolderItem";

// Styling
import { List, Spinner, Text } from "native-base";

// store
import folderStore from "../../store/FolderStore";
import authStore from "../../store/authStore";

const FolderList = ({ navigation }) => {
  if (folderStore.loading) return <Spinner />;

  const folderList = folderStore.folders.map((folder) => (
    <FolderItem folder={folder} key={folder.id} navigation={navigation} />
  ));

  return <List>{folderList}</List>;
};

export default observer(FolderList);
