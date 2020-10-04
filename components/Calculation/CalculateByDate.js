import React, { useState } from "react";
//Stores
import receiptStore from "../../store/ReceiptStore";
import folderStore from "../../store/FolderStore";
import authStore from "../../store/authStore";
//Styling
import {
  View,
  Text,
  Right,
  Body,
  Left,
  List,
  Card,
  CardItem,
} from "native-base";
import { TextStyle } from "./styles";
//Pickers
import DatePicker from "react-native-datepicker";
import { ScrollView } from "react-native";

const CalculateByDate = ({ navigation }) => {
  if (receiptStore.loading) return <Spinner />;
  if (folderStore.loading) return <Spinner />;

  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();

  let total = 0;
  const folder = folderStore.folders.filter(
    (folder) => folder.userId === authStore.user.id
  );
  const receipt = receiptStore.receipts.filter((receipt) =>
    folder.find((filter) => receipt.folder.id === filter.id)
  );
  const receiptList = receipt
    .filter((receipt) => receipt.date >= fromDate && receipt.date <= toDate)
    .map(
      (receipt) => (
        (total = total + +receipt.price),
        (
          <Card>
            <CardItem>
              <Left>
                <Text
                  onPress={() =>
                    navigation.navigate("ReceiptDetail", { receipt: receipt })
                  }
                >
                  {receipt.name}
                </Text>
              </Left>
              <Body>
                <Text note>{receipt.date}</Text>
              </Body>
              <Right>
                <Text>{receipt.price}</Text>
              </Right>
            </CardItem>
          </Card>
        )
      )
    );
  return (
    <>
      <ScrollView>
        <List style={{ backgroundColor: "white" }}>
          <View
            style={{
              padding: 5,
              flexDirection: "row",
              marginTop: 16,
            }}
          >
            <TextStyle>From : </TextStyle>
            <DatePicker
              showIcon={false}
              style={{ width: 255, marginTop: 5 }}
              date={fromDate}
              mode='date'
              placeholder='select date'
              format='YYYY-MM-DD'
              confirmBtnText='Confirm'
              cancelBtnText='Cancel'
              customStyles={{
                dateInput: {
                  marginLeft: 5,
                  borderWidth: 0.25,
                },
              }}
              onDateChange={(date) => {
                setFromDate(date);
              }}
            />
          </View>

          <View
            style={{
              padding: 5,
              marginTop: 14,
              flexDirection: "row",
            }}
          >
            <TextStyle> To : </TextStyle>

            <DatePicker
              showIcon={false}
              style={{
                width: 255,
                textAlign: "left",
                marginBottom: 15,
                marginLeft: 18,
              }}
              date={toDate}
              mode='date'
              placeholder='select date'
              format='YYYY-MM-DD'
              confirmBtnText='Confirm'
              cancelBtnText='Cancel'
              mode='date'
              placeholder='select date'
              format='YYYY-MM-DD'
              confirmBtnText='Confirm'
              cancelBtnText='Cancel'
              customStyles={{
                dateInput: {
                  marginLeft: 5,
                  borderWidth: 0.25,
                },
              }}
              onDateChange={(date) => {
                setToDate(date);
              }}
            />
          </View>
        </List>
        {receiptList}
        {toDate && (
          <Card>
            <CardItem>
              <Left>
                <Text style={{ color: "red" }}>Total Amount</Text>
              </Left>

              <Right>
                <Text style={{ color: "red" }}>{total}</Text>
              </Right>
            </CardItem>
          </Card>
        )}
      </ScrollView>
    </>
  );
};
export default CalculateByDate;
