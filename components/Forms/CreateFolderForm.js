import React, { useState } from "react";
import { observer } from "mobx-react";

//Stores
import folderStore from "../../store/FolderStore";

//Styles
import {
  FormContainer,
  FormTitle,
  FormTextInput,
  FormButtonText,
  FormButton,
} from "./styles";

import { Text, View } from "react-native";

const CreateFolderForm = ({ navigation }) => {
  const [folder, setFolder] = useState({
    name: "",
  });

  const handleSubmit = async () => {
    await folderStore.createFolder(folder);
    navigation.replace("Home");
  };

  const handleCancel = async () => {
    navigation.replace("Home");
  };

  const [isSelected, setSelection] = useState(false);

  const handleCancelTwo = async () => {
    setSelection(!isSelected);
  };

  return (
    <FormContainer>
      {isSelected === false ? (
        <>
          <FormTitle>Add A Folder</FormTitle>
          <FormTextInput
            onChangeText={(name) => setFolder({ ...folder, name })}
            placeholder="Folder Name"
            placeholderTextColor="#A6AEC1"
          />
          <View style={{ flexDirection: "row" }}>
            <FormButton onPress={handleSubmit}>
              <FormButtonText>Save Changes</FormButtonText>
            </FormButton>

            <FormButton onPress={handleCancel}>
              <FormButtonText>Cancel</FormButtonText>
            </FormButton>
          </View>
        </>
      ) : (
        <>
          <FormTitle>Add A Folder Two</FormTitle>
          <FormTextInput
            onChangeText={(name) => setFolder({ ...folder, name })}
            placeholder="Folder Name"
            placeholderTextColor="#A6AEC1"
          />
          <View style={{ flexDirection: "row" }}>
            <FormButton onPress={handleSubmit}>
              <FormButtonText>Save Changes</FormButtonText>
            </FormButton>

            <FormButton onPress={handleCancel}>
              <FormButtonText>Cancel</FormButtonText>
            </FormButton>
          </View>
        </>
      )}
    </FormContainer>
  );
};

export default observer(CreateFolderForm);
