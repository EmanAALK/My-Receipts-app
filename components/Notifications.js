// import React from "react";

// // Styling
// import { Text } from "native-base";

// const Notification = ({ navigation }) => {
//   return <Text>Notification</Text>;
// };

// export default Notification;

import React from "react";
import { observer } from "mobx-react";
import moment from "moment";
// Styling
import { List, Spinner, Text, ListItem } from "native-base";

// store
import receiptStore from "../store/ReceiptStore";
import authStore from "../store/authStore";

const Notifications = ({ navigation, receipt }) => {
  if (receiptStore.loading) return <Spinner />;

  const ExpDateList = receiptStore.receipts
    .filter((receipt) => receipt.folder.userId === authStore.user.id)
    .map((receipt) => (receipt = receipt.Expdate));
  console.log("Date", ExpDateList);

  // notify before a week
  var dateBeforeWeek = moment(
    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  ).format("YYYY-MM-DD"); //date today + 7 days
  console.log("check week full", dateBeforeWeek);

  // // notify before three days
  var dateBeforeThree = moment(
    new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
  ).format("YYYY-MM-DD"); //date today + 7 days
  console.log("check three days full", dateBeforeThree);

  const isExpired = ExpDateList.filter(
    (expdate) => expdate === dateBeforeWeek || expdate === dateBeforeThree
  );

  return (
    <ListItem>
      <Text
        transparent
        light
        onPress={() =>
          navigation.navigate("ReceiptDetail", { receipt: receipt })
        }
      >
        {isExpired}
      </Text>
    </ListItem>
  );
};

export default observer(Notifications);
