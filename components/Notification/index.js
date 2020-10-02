import React from "react";
import { observer } from "mobx-react";
import moment from "moment";

// Styling
import { List, Spinner, Text } from "native-base";
import { View } from "react-native-animatable";
import { ScrollView } from "react-native";

// Store
import receiptStore from "../store/ReceiptStore";
import authStore from "../store/authStore";
import folderStore from "../store/folderStore";

// Component
import NotificationItem from "./NotificationItem";

const NotificationList = ({ navigation }) => {
  if (receiptStore.loading) return <Spinner />;
  if (folderStore.loading) return <Spinner />;

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
      <NotificationItem
        receipt={receipt}
        key={receipt.id}
        navigation={navigation}
      />
    ));
  return (
    <View style={{ marginTop: 30, marginBottom: 30 }}>
      <Text> Warranty/ies that will expire within 7 days: </Text>
      <ScrollView>
        <List>{isExpired}</List>
      </ScrollView>
    </View>
  );
};

export default observer(NotificationList);
