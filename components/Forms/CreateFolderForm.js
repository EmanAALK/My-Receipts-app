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
import * as Animatable from "react-native-animatable";

import { Text, View } from "react-native";

const CreateFolderForm = ({ navigation }) => {
  const [isValid, setIsValid] = useState(true);
  const [msg, setMsg] = useState("");

  const [folder, setFolder] = useState({
    name: "",
  });

  const handleSubmit = async () => {
    const folderName = folderStore.folders.filter(
      (_folder) => _folder.name.toLowerCase() === folder.name.toLowerCase()
    );

    console.log(",,,,,foldername", folderName.length);
    if (folderName.length === 0) {
      if (folder.name === "") {
        setMsg("Invalid folder name ");
        setIsValid(false);
      } else {
        await folderStore.createFolder(folder);
        navigation.replace("Home");
      }
    } else {
      setMsg("Folder name already exists");
      setIsValid(false);
    }
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
          {!isValid && (
            <Animatable.View animation="fadeInLeft" duration={400}>
              <Text style={{ color: "red" }}>{msg}</Text>
            </Animatable.View>
          )}
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
