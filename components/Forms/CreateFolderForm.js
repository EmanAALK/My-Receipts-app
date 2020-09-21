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
import { View } from "react-native-animatable";

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

  return (
    <FormContainer>
      <FormTitle>New Folder</FormTitle>
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

export default observer(CreateFolderForm);
