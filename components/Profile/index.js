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

  const handleSubmit = async () => {
    await authStore.updateUser(_user);
    navigation.goBack();
  };

  return (
    <AuthContainer>
      <AuthTitle>Edit Your Profile</AuthTitle>
      <EditContainer>
        <Text note>Username </Text>
        <View style={{ flexDirection: "row" }}>
          <AuthTextInput
            onChangeText={(username) => setUser({ ..._user, username })}
            // placeholder="username"
            placeholderTextColor='#A6AEC1'
            value={_user.username}
          />
        </View>
        <Text note>First Name </Text>
        <View style={{ flexDirection: "row" }}>
          <AuthTextInput
            onChangeText={(firstName) => setUser({ ..._user, firstName })}
            // placeholder="firstName"
            placeholderTextColor='#A6AEC1'
            value={_user.firstName}
          />
        </View>
        <Text note>Last Name </Text>
        <View style={{ flexDirection: "row" }}>
          <AuthTextInput
            onChangeText={(lastName) => setUser({ ..._user, lastName })}
            // placeholder="lastName"
            placeholderTextColor='#A6AEC1'
            value={_user.lastName}
          />
        </View>
        <Text note>Email </Text>
        <View style={{ flexDirection: "row" }}>
          <AuthTextInput
            onChangeText={(email) => setUser({ ..._user, email })}
            // placeholder="email"
            placeholderTextColor='#A6AEC1'
            value={_user.email}
          />
        </View>
      </EditContainer>

      <View style={{ flexDirection: "row" }}>
        <AuthButton onPress={handleSubmit}>
          <AuthButtonText>Edit</AuthButtonText>
        </AuthButton>
        <AuthButton onPress={navigation.goBack}>
          <AuthButtonText>Cancel</AuthButtonText>
        </AuthButton>
      </View>
    </AuthContainer>
  );
};

export default observer(EditProfile);
