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
  const [selectedIndex, setSelectedIndex] = useState(0);

  const folderList = folderStore.folders
    .filter((folder) => folder.userId === authStore.user.id)
    .map((folder) => (
      <FolderItem folder={folder} key={folder.id} navigation={navigation} />
    ));
  const updateIndex = (selectedIndex) => {
    setSelectedIndex(selectedIndex);
  };
  return (
    <>
      <ButtonGroup
        onPress={updateIndex}
        buttons={[
          <Text>
            <Icon name="search1" color="grey" size="25" />
          </Text>,
          `+Folder`,
        ]}
        containerStyle={{ height: 30, marginTop: 10 }}
        selectedButtonStyle={{ backgroundColor: "grey" }}
      />
      {selectedIndex === 0 && navigation.navigate("Search")}
      {selectedIndex === 1 && navigation.navigate("CreateFolderForm")}

      <List>{folderList}</List>
    </>
  );
};

export default observer(FolderList);
