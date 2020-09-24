import styled from "styled-components/native";
import { Icon, Button } from "native-base";

export const TextStyle = styled.Text`
  color: navy;
  font-size: 24px;
  text-align: center;
  padding-top: 20px;
`;
export const AuthContainer = styled.View`
  flex: 1;
  align-self: stretch;
  justify-content: center;
  align-items: center;
  background-color: white;
  padding-right: 60px;
  padding-left: 60px;
`;
export const EditContainer = styled.View`
  background-color: white;
  padding-right: 10px;
  padding-left: 10px;
`;

export const AuthTitle = styled.Text`
  color: black;
  font-size: 18px;
  border-bottom-color: black;
  margin-top: 0px;
  margin-bottom: 50px;
`;
export const AuthTextInput = styled.TextInput`
  align-self: stretch;
  text-align: left;
  height: 20px;
  margin-bottom: 15px;
  color: black;
  border-bottom-color: black;
  border-bottom-width: 0.25px;
  width: 300px;
  margin-top: 8px;
`;
export const AuthButton = styled.TouchableOpacity`
  padding: 10px;
  background-color: #fff;
  border: lightgray;
  border-radius: 25px;
  width: 150px;
  margin-top: 40px;
  margin-right: 2px;
  align-items: center;
`;

export const AuthButtonText = styled.Text`
  color: #ffbf00;
  font-size: 18px;
`;
export const AuthOther = styled.Text`
  color: black;
  margin-top: 15px;
`;
export const TrashIcon = styled(Icon)`
  color: red;
`;
export const SmallText = styled.Text`
  font-size: 10px;
  font-weight: bold;
  color: black;
  margin-left: 10px;
  padding-top: 15;
`;
export const LabelTitle = styled.Text`
  color: black;
  font-size: 14px;
  border-bottom-color: black;
  padding-left: 50px;
  /* width: 100; */
`;
