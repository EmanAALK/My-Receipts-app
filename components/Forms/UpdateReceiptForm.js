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

const UpdateReceiptForm = ({ navigation, route }) => {
  const { oldReceipt } = route.params;
  const [receipt, setReceipt] = useState(oldReceipt);

  const handleSubmit = async () => {
    await receiptStore.updateReceipt(receipt);
    navigation.goBack();
  };

  const handleCancel = async () => {
    navigation.replace("Home");
  };

  return (
    <FormContainer>
      <FormTitle>Update The Receipt </FormTitle>
      <FormTextInput
        onChangeText={(name) => setReceipt({ ...receipt, name })}
        placeholder='Receipt Name'
        placeholderTextColor='#A6AEC1'
      />
      <FormTextInput
        onChangeText={(price) => setReceipt({ ...receipt, price })}
        placeholder='Receipt Price'
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
export default observer(UpdateReceiptForm);
