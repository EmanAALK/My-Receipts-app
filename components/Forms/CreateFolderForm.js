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

const CreateFolderForm = ({ navigation }) => {
  const [folder, setFolder] = useState({
    name: "",
  });

  const handleSubmit = async () => {
    await folderStore.createFolder(folder);
    navigation.replace("Home");
  };

  return (
    <FormContainer>
      <FormTitle>Add A Folder</FormTitle>
      <FormTextInput
        onChangeText={(name) => setFolder({ ...folder, name })}
        placeholder="Folder Name"
        placeholderTextColor="#A6AEC1"
      />

      <FormButton onPress={handleSubmit}>
        <FormButtonText>Save Changes</FormButtonText>
      </FormButton>
    </FormContainer>
  );
};

export default observer(CreateFolderForm);
