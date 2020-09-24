import styled from "styled-components/native";
import { Icon, Text, View, Button } from "native-base";

export const FormContainer = styled.View`
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

export const FormTitle = styled.Text`
  color: black;
  font-size: 18px;
  border-bottom-color: black;
  margin-top: 0px;
  margin-bottom: 50px;
`;

export const FormTextInput = styled.TextInput`
  align-self: stretch;
  text-align: left;
  height: 20px;
  margin-bottom: 15px;
  color: black;
  border-bottom-color: black;
  border-bottom-width: 0.25px;
  width: 300px;
  padding-right: 10px;
  margin-top: 8px;
`;

export const FormButton = styled.TouchableOpacity`
  padding: 10px;
  background-color: #fff;
  border: lightgray;
  border-radius: 25px;
  width: 150px;
  margin-top: 20px;
  margin-right: 2px;
  align-items: center;

  /* margin-bottom: 180px; */
`;

export const FormButtonText = styled.Text`
  color: #ffbf00;
  font-size: 18px;
`;
