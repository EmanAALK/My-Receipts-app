import React from "react";
import { observer } from "mobx-react";

//Styling
import { Left, Right, Text } from "native-base";
import { CardItem, Left, Right } from "native-base";
import { Card } from "react-native-paper";

const NotificationItem = ({ receipt, navigation }) => {
  return (
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
  );
};

export default observer(NotificationItem);
