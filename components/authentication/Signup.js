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
  AuthOther,
} from "./styles";
import { LinearGradient } from "expo-linear-gradient";

const Signup = ({ navigation }) => {
  const [user, setUser] = useState({});

  const handleSubmit = async () => {
    await authStore.signup(user);
    if (authStore.user) navigation.replace("Home");
  };

  return (
    <AuthContainer>
      <AuthTitle>Sign up</AuthTitle>
      <AuthTextInput
        onChangeText={(username) => setUser({ ...user, username })}
        placeholder='Username'
        placeholderTextColor='#A6AEC1'
        autoCapitalize='none'
      />
      <AuthTextInput
        onChangeText={(firstName) => setUser({ ...user, firstName })}
        placeholder='First name'
        placeholderTextColor='#A6AEC1'
      />
      <AuthTextInput
        onChangeText={(lastName) => setUser({ ...user, lastName })}
        placeholder='Last Name'
        placeholderTextColor='#A6AEC1'
      />
      <AuthTextInput
        onChangeText={(email) => setUser({ ...user, email })}
        placeholder='Email'
        placeholderTextColor='#A6AEC1'
      />
      <AuthTextInput
        onChangeText={(password) => setUser({ ...user, password })}
        placeholder='Password'
        placeholderTextColor='#A6AEC1'
        secureTextEntry={true}
      />

      <LinearGradient
        onPress={handleSubmit}
        // Button Linear Gradient
        colors={["#ffbf00", "#FFCC33", "#FFE085"]}
        style={{
          // start: ["-1", "-2"],
          // end: ["-2", "-2"],
          marginTop: 10,
          marginBottom: 10,
          padding: 14,
          alignItems: "center",
          borderRadius: 22,
          alignSelf: "stretch",
          alignItems: "center",
        }}
      >
        <AuthButtonText>Sign up</AuthButtonText>
      </LinearGradient>

      <AuthOther onPress={() => navigation.navigate("Signin")}>
        Click Here to Sign In!
      </AuthOther>
    </AuthContainer>
  );
};

export default observer(Signup);
