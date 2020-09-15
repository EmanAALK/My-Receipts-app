import React from "react";
import folderStore from "../../store/FolderStore";
import FolderItem from "./FolderItem";
import { observer } from "mobx-react";
import { List, Spinner } from "native-base";

// create a new nailshop
const FolderList = ({ navigation }) => {
  if (folderStore.loading) return <Spinner />;

  const folderList = folderStore.folders.map((folder) => (
    <FolderItem folder={folder} key={folder.id} navigation={navigation} />
  ));

  return <List>{folderList}</List>;
};

export default observer(FolderList);
