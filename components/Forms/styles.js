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
  width: 250px;
  padding-right: 10px;
  margin-top: 8px;
`;

export const FormButton = styled.TouchableOpacity`
  padding-top: 8px;
  padding-bottom: 8px;
  padding-right: 2px;
  padding-left: 2px;
  background-color: #fff;
  border: lightgray;
  border-radius: 15px;
  width: 150px;
  margin-top: -30px;
  margin-right: 5px;
  align-items: center;
`;

export const SaveFormButton = styled.TouchableOpacity`
  padding-top: 8px;
  padding-bottom: 8px;
  padding-right: 2px;
  padding-left: 2px;
  background-color: #fff;
  border: lightgray;
  border-radius: 15px;
  width: 150px;
  margin-top: -30px;
  margin-right: 5px;
  margin-left: -2px;

  align-items: center;
`;

export const FormButtonText = styled.Text`
  color: #ffbf00;
  font-size: 16px;
`;

export const PageTitle = styled.Text`
  color: #000000;
  font-size: 25px;
  margin-top: 14px;
  margin-bottom: 10px;
  margin-left: 35px;
`;

export const Frame = styled.View`
  border-width: 0.25px;
  border-color: #e0e0e0;
  background-color: white;
  padding-bottom: 2px;
  padding-left: 25px;
  margin-top: 14px;
  margin-right: 40px;
  margin-left: 40px;
  align-content: center;
`;

export const BottomLine = styled.View`
  border-bottom-width: 0.25px;
  border-bottom-color: black;
  /* padding-bottom: 20px; */
  margin-top: 1px;
  margin-bottom: 6px;
  margin-right: 20px;
  margin-left: 0px;
  align-content: center;
`;

export const PDate = styled.Text`
  color: #000000;
  font-size: 13.5px;
  margin-top: 12;
  margin-right: -22px;
  margin-left: 1px;
`;

export const EDate = styled.Text`
  color: #000000;
  font-size: 13.5px;
  margin-top: 12;
  margin-right: -22px;
  margin-left: 1px;
`;

export const NoteTitle = styled.Text`
  color: #000000;
  opacity: 0.5;
  font-size: 16px;
  margin-top: 8px;
  margin-bottom: 10px;
  margin-left: 35px;
`;

export const EditAuthButton = styled.TouchableOpacity`
  padding-top: 9px;
  padding-bottom: 9px;
  background-color: #fff;
  border: lightgray;
  border-radius: 13px;
  width: 138px;
  margin-top: 5px;
  margin-left: 30px;
  margin-right: 20px;
  align-items: center;
`;

export const AuthButton = styled.TouchableOpacity`
  padding-top: 9px;
  padding-bottom: 9px;
  background-color: #fff;
  border: lightgray;
  border-radius: 13px;
  width: 138px;
  margin-top: 5px;
  margin-right: 2px;
  align-items: center;
`;
