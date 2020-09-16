import React from "react";
import { observer } from "mobx-react";

//Styles
import {
  ListItem,
  Left,
  Content,
  List,
  View,
  Thumbnail,
  Image,
} from "native-base";

const ReceiptDetail = ({ route, navigation }) => {
  const { receipt } = route.params;
  const folder = folderStore.folders.find(
    (folder) => folder.userId === receipt.folderId
  );

  return (
    <Content style={{ backgroundColor: "white", marginTop: 20 }}>
      <List>
        <Left>
          <Text
            transparent
            light
            onPress={() =>
              navigation.navigate("Receipts List", { folder: folder })
            }
          ></Text>
        </Left>
        <Left>
          <View>
            <Thumbnail
              style={{ marginBottom: 1, marginRight: 1 }}
              source={receipt.image ? { uri: receipt.image } : defaultReceipt}
            />
          </View>
          <Text> Receipt Name: </Text>
          <Text> {receipt.name} </Text>
        </Left>
        <Left>
          <Text>Adding Date: </Text>
          <Text>{receipt.date}</Text>
          <Text>Adding Date: </Text>
          <Text>{receipt.date}</Text>
        </Left>
        <Left></Left>
      </List>
    </Content>
  );
};

export default observer(ReceiptDetail);
