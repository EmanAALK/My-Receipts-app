import React from "react";
import { observer } from "mobx-react";

//Stores
import folderStore from "../../store/FolderStore";

//Styling
import { Card } from "react-native-elements";
import { IconStyled } from "./styles";
import { Row, Text } from "native-base";
import { View } from "react-native-animatable";

const FolderItem = ({ folder, navigation }) => {
  return (
    <Card>
      <Card.Title
        onPress={() => navigation.navigate("ReceiptList", { folder: folder })}
      >
        {folder.name}
      </Card.Title>
      <Card.Divider />
      <View style={{ flexDirection: "row" }}>
        <IconStyled onPress={() => folderStore.deleteFolder(folder.id)}>
          <IconStyled type="Fontisto" name="trash" />
        </IconStyled>
        <IconStyled
          onPress={() =>
            navigation.navigate("UpdateFolderForm", { oldFolder: folder })
          }
        >
          <IconStyled type="MaterialIcons" name="update" />
        </IconStyled>
      </View>
    </Card>
  );
};

export default observer(FolderItem);
