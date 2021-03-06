import React from "react";
import { observer } from "mobx-react";
import moment from "moment";

// Styling
import { Card } from "react-native-paper";
import { List, ListItem, Spinner, Text } from "native-base";
import { CardItem, Left, Right } from "native-base";
import { View } from "react-native-animatable";
import { PageTitle, NoteTitle } from "./styles";
import { ScrollView } from "react-native";

// store
import receiptStore from "../../store/ReceiptStore";
import authStore from "../../store/authStore";

const Notifications = ({ navigation }) => {
  if (receiptStore.loading) return <Spinner />;
  receiptStore.Badge = false;

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
        {/* <Card style={{ marginTop: 5, width: "94%", alignSelf: "center" }}> */}
        {/* <ScrollView> */}
        <ListItem
          style={{
            backgroundColor: "white",
            marginRight: 14,
            marginLeft: 14,
          }}
        >
          <CardItem>
            <Left>
              <Text
                onPress={() =>
                  navigation.navigate("ReceiptDetail", { receipt: receipt })
                }
              >
                {receipt.name}
              </Text>
              <Right style={{ marginLeft: 10 }}>
                <Text note>{receipt.expDate}</Text>
              </Right>
            </Left>
          </CardItem>
          {/* </Card> */}
        </ListItem>
        {/* </ScrollView> */}
      </>
    ));
  return (
    <View style={{ marginTop: 30, marginBottom: 30 }}>
      <Text
        style={{
          alignItems: "center",
        }}
      >
        Receipts Expiring in Seven Days:
      </Text>
      <ScrollView>
        {isExpired.length === 0 ? (
          <Text> No receipts</Text>
        ) : (
          <List>{isExpired}</List>
        )}
      </ScrollView>
    </View>
  );
};

export default observer(Notifications);
