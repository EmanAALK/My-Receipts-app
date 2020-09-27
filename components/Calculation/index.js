import React, { useState } from "react";
import { observer } from "mobx-react";

//Styling
import { InputContainer, TextStyle, PageTitle } from "./styles";
import { ButtonGroup } from "react-native-elements";
import { Text, View } from "native-base";
//Calculater
import CalculateByFolder from "./CalculateByFolder";
import CalculateByDate from "./CalculateByDate";

const selectColor = "#ffbf00";
const unSelectColor = "black";
const Calculation = ({ navigation }) => {
  const [dateColor, setDateColor] = useState(selectColor);
  const [folderColor, setFolderColor] = useState(unSelectColor);

  const [selectedIndex, setSelectedIndex] = useState(0);

  const updateIndex = (selectedIndex) => {
    setSelectedIndex(selectedIndex);
  };

  const handleDateChange = () => {
    setDateColor(selectColor);
    setFolderColor(unSelectColor);
    setSelectedIndex(0);
  };

  const handleFolderChange = () => {
    setDateColor(unSelectColor);
    setFolderColor(selectColor);
    setSelectedIndex(1);
  };

  return (
    <>
      <InputContainer>
        <PageTitle> Calculate Your Receipts </PageTitle>

        {/* <ButtonGroup
          onPress={updateIndex}
          selectedIndex={selectedIndex}
          buttons={[`By Date`, `By Folder`]}
          containerStyle={{ height: 30, marginTop: 10 }}
          selectedButtonStyle={{ backgroundColor: "#ffbf00" }}
        /> */}

        <View style={{ flexDirection: "row", marginTop: 20, marginBottom: 10 }}>
          <Text
            onPress={handleDateChange}
            style={{
              marginLeft: 30,
              color: dateColor,
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            By Date
          </Text>
          <Text
            onPress={handleFolderChange}
            style={{
              marginLeft: 30,
              color: folderColor,
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            By Folder
          </Text>
        </View>
      </InputContainer>
      {selectedIndex === 0 && <CalculateByDate navigation={navigation} />}

      {selectedIndex === 1 && <CalculateByFolder navigation={navigation} />}
    </>
  );
};

export default observer(Calculation);
