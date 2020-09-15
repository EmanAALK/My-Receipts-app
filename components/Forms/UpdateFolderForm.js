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

const UpdateFolderForm = ({ navigation, route }) => {
  const { oldFolder } = route.params;
  const [folder, setFolder] = useState(oldFolder);

  const handleSubmit = async () => {
    await folderStore.updateProfile(folder);
    navigation.goBack();
  };

  return (
    <FormContainer>
      <FormTitle>Update The Folder </FormTitle>
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
export default observer(UpdateFolderForm);
