import styled from "styled-components/native";

export const AuthContainer = styled.View`
  flex: 1;
  align-self: stretch;
  justify-content: center;
  align-items: center;
  background-color: white;
  padding-right: 60px;
  padding-left: 60px;
`;

export const AuthTitle = styled.Text`
  color: #000000;
  font-size: 24px;
  margin-bottom: 20px;
  border-bottom-color: black;
`;

export const AuthTextInput = styled.TextInput`
  align-self: stretch;
  text-align: left;
  height: 40px;
  margin-bottom: 30px;
  color: black;
  border-bottom-color: black;
  border-bottom-width: 1px;
`;

export const AuthButton = styled.TouchableOpacity`
  align-self: stretch;
  align-items: center;
  padding: 12px;
  border-radius: 35px;
  background-color: #ffbf00;
  margin-top: 30px;
`;

export const AuthButtonText = styled.Text`
  color: #ffffff;
  font-weight: bold;
  font-size: 18px;
`;

export const AuthOther = styled.Text`
  color: black;
  margin-top: 10px;
`;
export const HomeBackground = styled.ImageBackground`
  width: 100%;
  height: 100%;
  align-items: center;
`;

export const ButtomStyling = styled.View`
  height: 130%;
  align-items: center;
  justify-content: center;
`;

export const SignInStyle = styled.Text`
  color: navy;
  font-size: 24;
  text-align: center;
`;

export const OverLayContainer = styled.View`
  flex: 1;
  background-color: rgba(100, 40, 60, 0.4);
`;

export const ButtonStyled = styled.Text`
  font-size: 20;
  color: #fff;
`;
