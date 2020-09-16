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

const UpdateFolderForm = ({ navigation, route }) => {
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
      <FormTitle>Update The Folder </FormTitle>
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
    </FormContainer>
  );
};
export default observer(UpdateFolderForm);
