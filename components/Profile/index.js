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
} from "./styles";
import { View } from "react-native-animatable";
import { Text } from "native-base";
// images

const EditProfile = ({ navigation }) => {
  const user = authStore.user;
  const [_user, setUser] = useState(user);
  const [edit, setEdit] = useState(false);

  const handleSubmit = async () => {
    await authStore.updateUser(_user);
    navigation.goBack();
  };

  return (
    <>
      <AuthContainer>
        <View
          style={{ flexDirection: "row", marginTop: 100, marginBottom: 50 }}
        >
          <Text style={{ fontSize: 18 }} note>
            Username
          </Text>
          {edit ? (
            <AuthTextInput
              onChangeText={(username) => setUser({ ..._user, username })}
              // placeholder="username"
              placeholderTextColor="#A6AEC1"
              value={_user.username}
              style={{ width: 180, marginLeft: 30 }}
            />
          ) : (
            <Text style={{ marginLeft: 30 }}>{_user.username}</Text>
          )}
        </View>

        <View style={{ flexDirection: "row", marginTop: 5, marginBottom: 5 }}>
          <Text style={{ fontSize: 18 }} note>
            Email
          </Text>
          {edit ? (
            <AuthTextInput
              onChangeText={(email) => setUser({ ..._user, email })}
              placeholder="email"
              placeholderTextColor="#A6AEC1"
              value={_user.email}
              style={{ width: 180, marginLeft: 70 }}
            />
          ) : (
            <Text style={{ marginLeft: 68 }}>{_user.email}</Text>
          )}
        </View>
        <EditContainer>
          {edit ? (
            <View style={{ flexDirection: "row", alignSelf: "center" }}>
              <AuthButton onPress={handleSubmit}>
                <AuthButtonText>Edit</AuthButtonText>
              </AuthButton>
              <AuthButton onPress={() => setEdit(!edit)}>
                <AuthButtonText>Cancel</AuthButtonText>
              </AuthButton>
            </View>
          ) : (
            <AuthButton onPress={() => setEdit(!edit)}>
              <AuthButtonText>Edit</AuthButtonText>
            </AuthButton>
          )}
        </EditContainer>
      </AuthContainer>
    </>
  );
};

export default observer(EditProfile);
