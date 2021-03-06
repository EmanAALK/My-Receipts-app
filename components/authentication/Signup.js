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
import { Alert, Image } from "react-native";
import { Text } from "native-base";
import Logo from "../../assets/logo3.png";

const Signup = ({ navigation }) => {
  const [user, setUser] = useState({});
  const [isValid, setIsValid] = useState(true);

  const handleSubmit = async () => {
    await authStore.signup(user);
    if (authStore.user) navigation.replace("Home");
  };

  const handleSubmitN = async () => {
    await authStore.signup(user);
    if (authStore.user) {
      navigation.replace("Home");
    } else setIsValid(false);
    Alert.alert("Mood", "Good Evening, How Are You Feeling Today?", [
      {
        text: "Skip",
        style: "Skip",
      },
      {
        text: "Happy",
        onPress: GoodAlert,
      },
      {
        text: "Sad",
        onPress: BadAlert,
      },
    ]);
  };

  const handleSubmitM = async () => {
    await authStore.signup(user);
    if (authStore.user) {
      navigation.replace("Home");
    } else setIsValid(false);
    Alert.alert("Mood", "Good Morning, How Are You Feeling Today?", [
      {
        text: "Skip",
        style: "Skip",
      },
      {
        text: "Happy",
        onPress: GoodAlert,
      },
      {
        text: "Sad",
        onPress: BadAlert,
      },
    ]);
  };

  const handleSubmitA = async () => {
    await authStore.signup(user);
    if (authStore.user) {
      navigation.replace("Home");
    } else setIsValid(false);
    Alert.alert("Mood", "Good Afternoon, How Are You Feeling Today?", [
      {
        text: "Skip",
        style: "Skip",
      },
      {
        text: "Happy",
        onPress: GoodAlert,
      },
      {
        text: "Sad",
        onPress: BadAlert,
      },
    ]);
  };
  const BadAlert = () => {
    Alert.alert("Mood", "Hope it get better", [
      {
        text: "ok",
        style: "ok",
      },
    ]);
  };
  const GoodAlert = () => {
    Alert.alert("Mood", "Yay! We Are Happy For you!", [
      {
        text: "ok",
        style: "ok",
      },
    ]);
  };

  return (
    <AuthContainer>
      <Image
        source={Logo}
        style={{ width: 150, height: 100, marginBottom: 20 }}
      />
      <AuthTitle>Sign up</AuthTitle>
      <AuthTextInput
        onChangeText={(username) => setUser({ ...user, username })}
        placeholder="Username"
        placeholderTextColor="#A6AEC1"
        autoCapitalize="none"
      />

      <AuthTextInput
        onChangeText={(email) => setUser({ ...user, email })}
        placeholder="Email"
        placeholderTextColor="#A6AEC1"
      />
      <AuthTextInput
        onChangeText={(password) => setUser({ ...user, password })}
        placeholder="Password"
        placeholderTextColor="#A6AEC1"
        secureTextEntry={true}
      />
      {!isValid && <Text style={{ color: "red" }}>Invalid Fields </Text>}
      {authStore.getTime <= 12 && (
        <AuthButton onPress={handleSubmitM}>
          <LinearGradient
            onPress={handleSubmitM}
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
        </AuthButton>
      )}
      {authStore.getTime < 18 && authStore.getTime > 12 && (
        <AuthButton onPress={handleSubmitA}>
          <LinearGradient
            onPress={handleSubmitA}
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
        </AuthButton>
      )}

      {authStore.getTime >= 18 && (
        <AuthButton onPress={handleSubmitN}>
          <LinearGradient
            onPress={handleSubmitN}
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
        </AuthButton>
      )}
      <AuthOther onPress={() => navigation.navigate("Signin")}>
        Click Here to Sign In!
      </AuthOther>
    </AuthContainer>
  );
};

export default observer(Signup);
