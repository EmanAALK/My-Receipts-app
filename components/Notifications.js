import React from "react";
import { observer } from "mobx-react";
import moment from "moment";
// Styling
import { Card } from "react-native-paper";
import { List, Spinner, Text, ListItem } from "native-base";
import { Body, CardItem, Left, Right, Row } from "native-base";
// store
import receiptStore from "../store/ReceiptStore";
import folderStore from "../store/FolderStore";
import authStore from "../store/authStore";
import { View } from "react-native-animatable";
import NotificationStackscreen from "../components/Navigation/NotificationStackscreen";
const Notifications = ({ navigation }) => {
  if (receiptStore.loading) return <Spinner />;

  // get all expiration dates of receipts (objects)
  const receiptList = receiptStore.receipts.filter(
    (receipt) => receipt.folder.userId === authStore.user.id
  );

  //date today + 7 days
  const dateBeforeWeek = moment(
    new Date(Date.now() + 8 * 24 * 60 * 60 * 1000)
  ).format("YYYY-MM-DD");

  //if today date + 7 days === expiration date? show on notification screen
  const isExpired = receiptList
    .filter((receipt) => receipt.expDate < dateBeforeWeek)
    .map((receipt) => (
      <>
        <Card style={{ marginTop: 5, width: "94%", alignSelf: "center" }}>
          <CardItem>
            <Left>
              <Text
                onPress={() =>
                  navigation.navigate("ReceiptDetail", { receipt: receipt })
                }
              >
                {receipt.name}
              </Text>
              <Right>
                <Text note>{receipt.expDate}</Text>
              </Right>
            </Left>
          </CardItem>
        </Card>
      </>
    ));
  return (
    <View style={{ marginTop: 30, marginBottom: 30 }}>
      <Text> Warranty/ies that will expire within 7 days: </Text>

      <List>{isExpired}</List>
    </View>
  );
};

export default observer(Notifications);
