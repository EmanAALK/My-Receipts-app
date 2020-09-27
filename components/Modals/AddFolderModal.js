import React, { useState } from "react";
import { observer } from "mobx-react";

//Stores
import folderStore from "../../store/FolderStore";

//Styling
import {
  FormContainer,
  FormTitle,
  FormTextInput,
  FormButtonText,
  FormButton,
} from "./styles";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import { Text, View } from "react-native";

const CreateFolderModal = ({ navigation, route }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { oldFolder } = route.params;
  const [folder, setFolder] = useState(oldFolder);

  const handleSubmit = async () => {
    await folderStore.updateFolder(folder);
    navigation.goBack();
  };

  const handleCancel = async () => {
    navigation.replace("Home");
  };

  return (
    <FormContainer>
      <FormTitle>ِEdit Folder </FormTitle>
      <FormTextInput
        onChangeText={(name) => setFolder({ ...folder, name })}
        placeholder='Folder Name'
        placeholderTextColor='#A6AEC1'
      />

      <View style={{ flexDirection: "row" }}>
        <FormButton onPress={handleSubmit}>
          <FormButtonText>Save Changes</FormButtonText>
        </FormButton>

        <FormButton onPress={handleCancel}>
          <FormButtonText>Cancel</FormButtonText>
        </FormButton>
      </View>
    </FormContainer>
  );
};

export default observer(CreateFolderModal);
