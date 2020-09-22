import React, { useState } from "react";
import FolderItem from "./FolderItem";

//Stores
import receiptStore from "../../store/ReceiptStore";
import folderStore from "../../store/FolderStore";
import authStore from "../../store/authStore";

//Styling
import { View, Text, Right, Body, Left, Card, CardItem } from "native-base";
import { InputContainer, TextStyle, Total } from "./styles";
import { Table, Row } from "react-native-table-component";

//Pickers
import DatePicker from "react-native-datepicker";

const CalculateByDate = ({ navigation }) => {
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
        (total = total + receipt.price),
        (
          <Card>
            <CardItem>
              <Left>
                <Text>{receipt.name}</Text>
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
      <View
        style={{
          padding: 5,
          flexDirection: "row",
          marginTop: 5,
          alignSelf: "center",
        }}
      >
        <TextStyle>From : </TextStyle>
        <DatePicker
          showIcon={false}
          style={{ width: 255, marginTop: 5 }}
          date={fromDate}
          mode="date"
          placeholder="select date"
          format="YYYY-MM-DD"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: "absolute",
              left: 0,
              top: 4,
              marginRight: 4,
              marginLeft: 0,
              borderColor: "#cea146",
            },
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
          flexDirection: "row",
          alignSelf: "center",
        }}
      >
        <TextStyle> To : </TextStyle>

        <DatePicker
          showIcon={false}
          style={{ width: 255, textAlign: "left", marginLeft: 10 }}
          date={toDate}
          mode="date"
          placeholder="select date"
          format="YYYY-MM-DD"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          mode="date"
          placeholder="select date"
          format="YYYY-MM-DD"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: "absolute",
              left: 0,
              top: 4,
              marginRight: 4,
              marginLeft: 0,
              borderColor: "#cea146",
              borderWidth: 0.25,
            },
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
      {receiptList}
      {toDate && (
        <Card>
          <CardItem>
            <Left>
              <Text style={{ color: "red" }}>Total Amount</Text>
            </Left>
            <Body></Body>

            <Right>
              <Text style={{ color: "red" }}>{total}</Text>
            </Right>
          </CardItem>
        </Card>
      )}
    </>
  );
};

export default CalculateByDate;
