import React, { useState } from "react";
import { observer } from "mobx-react";
// component
import FolderItem from "./FolderItem";

// Styling
import { ButtonGroup } from "react-native-elements";
import { List, Spinner, Text, View, ListItem, Card } from "native-base";
import {
  Alert,
  Modal,
  StyleSheet,
  TouchableHighlight,
  ScrollView,
} from "react-native";
import {
  PageTitle,
  CancelModalButton,
  SaveModalButton,
  FormButtonText,
  EditButtonText,
  EditButton,
} from "./styles";
import * as Animatable from "react-native-animatable";
import { FormTextInput } from "../Forms/styles";

// store
import folderStore from "../../store/FolderStore";
import authStore from "../../store/authStore";

//Icons
import AntDesign from "react-native-vector-icons/AntDesign";

const FolderList = ({ navigation }) => {
  // if (folderStore.loading) return <Spinner />;

  const [multipul, setMultipul] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [msg, setMsg] = useState("");
  const [folder, setFolder] = useState({
    name: "",
  });

  const handleCancel = async () => {
    setIsValid(true);
    setModalVisible(!modalVisible);
  };

  const ShowModal = async () => {
    setModalVisible(!modalVisible);
  };

  const handleSubmit = async () => {
    const folderName = folderStore.folders
      .filter((folder) => folder.userId === authStore.user.id)
      .filter(
        (_folder) => _folder.name.toLowerCase() === folder.name.toLowerCase()
      );

    console.log(",,,,,foldername", folderName.length);
    if (folderName.length === 0) {
      if (folder.name === "") {
        setMsg("Invalid folder name ");
        setIsValid(false);
      } else {
        setModalVisible(!modalVisible);
        await folderStore.createFolder(folder);
      }
    } else {
      setMsg("Folder name already exists");
      setIsValid(false);
    }
  };

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
        <AntDesign
          onPress={ShowModal}
          name='addfolder'
          size={25}
          color='#ffbf00'
          style={{ marginTop: 35, marginBottom: -16, marginLeft: 315 }}
        />
      </View>

      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        style={{ marginBottom: 40 }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <FormTextInput
              onChangeText={(name) => setFolder({ ...folder, name })}
              placeholder='Folder Name'
              placeholderTextColor='#A6AEC1'
            />
            {!isValid && (
              <Animatable.View animation='fadeInLeft' duration={400}>
                <Text style={{ color: "red" }}>{msg}</Text>
              </Animatable.View>
            )}
            <SaveModalButton onPress={handleSubmit}>
              <FormButtonText>Save Changes</FormButtonText>
            </SaveModalButton>

            <CancelModalButton onPress={handleCancel}>
              <FormButtonText>Cancel</FormButtonText>
            </CancelModalButton>
          </View>
        </View>
      </Modal>

      <View style={{ flexDirection: "row" }}>
        <EditButtonText onPress={handleDelete}>
          {multipul && folderStore.selectedFolders.length > 0
            ? "Delete"
            : "Edit"}
        </EditButtonText>
      </View>
      <ScrollView>
        <List>
          <Card noShadow style={{ marginRight: 12, marginLeft: 12 }}>
            {defualtFolderList}
            {PinList}
          </Card>
        </List>

        <Card noShadow style={{ marginRight: 12, marginLeft: 12 }}>
          {UnPinList}
        </Card>
      </ScrollView>
    </>
  );
};
export default observer(FolderList);

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
