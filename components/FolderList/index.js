import React, { useState } from "react";
import { observer } from "mobx-react";
// component
 import FolderItem from "./FolderItem";

 // Styling
 import { List, Spinner, Text } from "native-base";
 import { ButtonGroup } from "react-native-elements";
 import { List, Spinner, Text, View, ListItem } from "native-base";
 import { Alert } from "react-native";
 import { PageTitle } from "./styles";

 // store
 import folderStore from "../../store/FolderStore";
 import authStore from "../../store/authStore";

 //Icons
 import Icon from "react-native-vector-icons/AntDesign";
 import { Alert } from "react-native";
 import AntDesign from "react-native-vector-icons/AntDesign";

 const FolderList = ({ navigation }) => {
   if (folderStore.loading) return <Spinner />;
 @@ -66,6 +69,18 @@ const FolderList = ({ navigation }) => {

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