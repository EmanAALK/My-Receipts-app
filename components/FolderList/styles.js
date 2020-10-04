import styled from "styled-components/native";
import { Icon } from "native-base";

export const FolderItemStyled = styled.Text`
  color: #000000;
  font-size: 18px;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const PageTitle = styled.Text`
  color: #000000;
  font-size: 25px;
  margin-top: 14px;
  margin-bottom: 10px;
  margin-left: 35px;
`;

export const IconStyled = styled(Icon)`
  color: #000000;
`;

export const CancelModalButton = styled.TouchableOpacity`
  background-color: #fff;
  border: lightgray;
  border-radius: 12px;
  width: 120px;
  padding-top: 6px;
  padding-bottom: 6px;
  margin-top: -38px;
  margin-right: -114px;
  margin-left: 20px;
  align-items: center;
`;

export const SaveModalButton = styled.TouchableOpacity`
  padding-top: 6px;
  padding-bottom: 6px;
  background-color: white;
  border: lightgray;
  border-radius: 12px;
  width: 120px;
  margin-top: 16px;
  margin-bottom: 5px;
  margin-right: 148px;
  margin-left: -6px;

  align-items: center;
`;

export const FormButtonText = styled.Text`
  color: #ffbf00;
  font-size: 15px;
`;

export const EditButtonText = styled.Text`
  margin-bottom: 12px;
  margin-left: 36px;
  color: #ffbf00;
  font-size: 18px;
`;

export const EditButton = styled.TouchableOpacity`
  border-width: 5px;
  border-color: white;
  /* margin-bottom: 12px;
  margin-left: 36px; */
`;
