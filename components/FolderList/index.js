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

const FolderList = ({ navigation }) => {
  if (folderStore.loading) return <Spinner />;

  const folderList = folderStore.folders
    .filter((folder) => folder.userId === authStore.user.id)
    .map((folder) => (
      <FolderItem folder={folder} key={folder.id} navigation={navigation} />
    ));

  return (
    <>
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

      <List>{folderList}</List>
    </>
  );
};

export default observer(FolderList);
