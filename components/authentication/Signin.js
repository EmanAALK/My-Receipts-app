import React, { useState } from "react";
import { observer } from "mobx-react";

//Navigation
import RootNavigator from "../../components/Navigation/RootNavigator";

// store
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
import { TouchableOpacity } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";
import { Text } from "native-base";
import { Alert } from "react-native";
import receiptStore from "../../store/ReceiptStore";
import { Button } from "react-native-paper";

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
  const loguser = user.username;
  var res = loguser.toUpperCase();

  const handleSubmitN = async () => {
    await authStore.signin(user);

    if (authStore.user) {
      <RootNavigator />;

      Alert.alert(
        "Mood",
        "Good Evening," + " " + res + " " + " How Are You Feeling Today?",
        [
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
        ]
      );
    } else {
      setIsValidUser(false);
    }
  };

  const handleSubmitM = async () => {
    await authStore.signin(user);

    if (authStore.user) {
      <RootNavigator />;

      Alert.alert(
        "Mood",
        "Good Morning," + " " + res + " " + " How Are You Feeling Today?",
        [
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
        ]
      );
    } else {
      setIsValidUser(false);
    }
  };

  const handleSubmitA = async () => {
    await authStore.signin(user);

    if (authStore.user) {
      <RootNavigator />;

      Alert.alert(
        "Mood",
        "Good Afternoon," + " " + res + " " + " How Are You Feeling Today?",
        [
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
        ]
      );
    } else {
      setIsValidUser(false);
    }
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
      {authStore.getTime < 12 && (
        <AuthButton onPress={handleSubmitM}>
          <LinearGradient
            onPress={handleSubmitM}
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
      )}
      {authStore.getTime < 18 && authStore.getTime > 12 && (
        <AuthButton onPress={handleSubmitA}>
          <LinearGradient
            onPress={handleSubmitA}
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
      )}
      {authStore.getTime > 18 && (
        <AuthButton onPress={handleSubmitN}>
          <LinearGradient
            onPress={handleSubmitN}
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
      )}
      {/* <Text style={{ color: "green" }}> forget password </Text> */}
      {!isValidUser && (
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
