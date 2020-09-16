import React from "react";
import { observer } from "mobx-react";

//Stores
import folderStore from "../../store/FolderStore";

//Styling
import { Card } from "react-native-elements";
import { IconStyled } from "./styles";
import { Row } from "native-base";

const FolderItem = ({ folder, navigation }) => {
  return (
    <Card>
      <Card.Title
      // onPress={() => navigation.navigate("ReceiptList", { receipt: receipt })}
      >
        {folder.name}
      </Card.Title>
      {/* <Card.Divider /> */}

      <Row style={{ alignContent: "center" }}>
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
      </Row>
    </Card>
  );
};

export default observer(FolderItem);
