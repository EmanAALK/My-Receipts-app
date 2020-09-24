import React, { useState } from "react";
import { observer } from "mobx-react";

//Navigation
import RootNavigator from "../../components/Navigation/RootNavigator";

// Stores
import authStore from "../../store/authStore";

//Styles
import {
  AuthContainer,
  AuthTitle,
  AuthTextInput,
  AuthButton,
  AuthButtonText,
  AuthOther,
} from "./styles";
import Feather from "react-native-vector-icons/Feather";
import { LinearGradient } from "expo-linear-gradient";
import { Text } from "native-base";
import * as Animatable from "react-native-animatable";
import { TouchableOpacity } from "react-native-gesture-handler";

const Signin = ({ navigation }) => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [isValidUser, setIsValidUser] = useState(true);
  const [showPass, setShowPass] = useState(false);
  const toggleShowPass = () => {
    setShowPass(!showPass);
  };

  const handleSubmit = async () => {
    await authStore.signin(user);

    if (authStore.user) {
      <RootNavigator />;
    } else {
      setIsValidUser(false);
    }
  };
  return (
    <AuthContainer>
      <AuthTitle>Welcome!</AuthTitle>
      <AuthTextInput
        onChangeText={(username) => setUser({ ...user, username })}
        placeholder="Username"
        placeholderTextColor="#A6AEC1"
        autoCapitalize="none"
        value={user.username}
      />
      <AuthTextInput
        onChangeText={(password) => setUser({ ...user, password })}
        placeholder="Password"
        placeholderTextColor="#A6AEC1"
        secureTextEntry={showPass ? false : true}
        value={user.password}
      />
      <TouchableOpacity onPress={toggleShowPass}>
        {showPass ? (
          <Feather name="eye" color="grey" size={15} />
        ) : (
          <Feather name="eye-off" color="grey" size={15} />
        )}
      </TouchableOpacity>
      <AuthButton onPress={handleSubmit}>
        <LinearGradient
          onPress={handleSubmit}
          // Button Linear Gradient
          colors={["#ffbf00", "#FFCC33", "#FFE085"]}
          style={{
            marginTop: 10,
            marginBottom: 10,
            padding: 14,
            alignItems: "center",
            borderRadius: 22,
            alignSelf: "stretch",
            alignItems: "center",
          }}
        >
          <AuthButtonText>Sign In</AuthButtonText>
        </LinearGradient>
      </AuthButton>
      {isValidUser ? (
        <Text style={{ color: "green" }}> forget password </Text>
      ) : (
        <Animatable.View animation="fadeInLeft" duration={400}>
          <Text style={{ color: "red" }}>Invalid username or password </Text>
        </Animatable.View>
      )}
      <AuthOther onPress={() => navigation.navigate("Signup")}>
        Click Here to Register!
      </AuthOther>
    </AuthContainer>
  );
};
export default observer(Signin);
