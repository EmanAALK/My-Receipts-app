import styled from "styled-components/native";
import { Icon, Text, View } from "native-base";

export const FormContainer = styled.View`
  flex: 1;
  align-self: stretch;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  padding-right: 60px;
  padding-left: 60px;
`;

export const FormTitle = styled.Text`
  color: #cea146;
  font-size: 24px;
  margin-bottom: 20px;
  border-bottom-color: #000000;
`;

export const FormTextInput = styled.TextInput`
  align-self: stretch;
  text-align: left;
  height: 40px;
  margin-bottom: 30px;
  color: #000000;
  border-bottom-color: #cea146;
  border-bottom-width: 0.5px;
`;

export const FormButton = styled.TouchableOpacity`
  align-self: stretch;
  align-items: center;
  padding: 12px;
  border-radius: 35px;
  background-color: #cea146;
  margin-top: 60px;
`;

export const FormButtonText = styled.Text`
  color: #ffffff;
  font-size: 18px;
`;
