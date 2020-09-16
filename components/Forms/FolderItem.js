import React from "react";
import { observer } from "mobx-react";

// store
import folderStore from "../../store/FolderStore";
// style
import { Text, Spinner } from "native-base";

const FolderItem = ({ navigation, folder }) => {
  if (folderStore.loading) return <Spinner color="lightblue" />;

  return <Text>{folder.name}</Text>;
};

export default observer(FolderItem);
