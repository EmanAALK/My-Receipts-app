import React, { useState } from "react";
import { observer } from "mobx-react";

//store
import authStore from "../../store/authStore";

//styles
import {
  AuthContainer,
  AuthTitle,
  AuthTextInput,
  AuthButton,
  AuthButtonText,
  EditContainer,
  EditAuthButton,
  BottomLine,
} from "./styles";
import { View } from "react-native-animatable";
import { Text } from "native-base";

// images

const EditProfile = ({ navigation }) => {
  const user = authStore.user;
  const [_user, setUser] = useState(user);
  const [edit, setEdit] = useState(false);

  const handleSubmit = async () => {
    console.log("..._user", _user);
    await authStore.updateUser(_user);
    navigation.goBack();
  };

  return (
    <AuthContainer>
      <AuthTitle>My Profile</AuthTitle>
      <EditContainer>
        <Text note>Username </Text>
        <View style={{ flexDirection: "row" }}>
          {edit ? (
            <AuthTextInput
              onChangeText={(username) => setUser({ ..._user, username })}
              // placeholder="username"
              placeholderTextColor='#A6AEC1'
              value={_user.username}
            />
          ) : (
            <BottomLine>
              <Text style={{ marginTop: 10, fontSize: 14 }}>
                {_user.username}
              </Text>
            </BottomLine>
          )}
        </View>

        <Text note>Email </Text>
        <View style={{ flexDirection: "row" }}>
          {edit ? (
            <AuthTextInput
              onChangeText={(email) => setUser({ ..._user, email })}
              placeholder='email'
              placeholderTextColor='#A6AEC1'
              value={_user.email}
            />
          ) : (
            <BottomLine>
              <Text style={{ marginTop: 10, fontSize: 14 }}>{_user.email}</Text>
            </BottomLine>
          )}
        </View>
      </EditContainer>
      {edit ? (
        <View style={{ flexDirection: "row" }}>
          <EditAuthButton onPress={handleSubmit}>
            <AuthButtonText>Save</AuthButtonText>
          </EditAuthButton>
          <AuthButton onPress={() => setEdit(!edit)}>
            <AuthButtonText>Cancel</AuthButtonText>
          </AuthButton>
        </View>
      ) : (
        <EditAuthButton onPress={() => setEdit(!edit)}>
          <AuthButtonText>Edit</AuthButtonText>
        </EditAuthButton>
      )}
    </AuthContainer>
  );
};

export default observer(EditProfile);
