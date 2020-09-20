import React, { useState } from "react";
import { observer } from "mobx-react";

//Styling
import { InputContainer, TextStyle, PageTitle } from "./styles";
import { ButtonGroup } from "react-native-elements";

//Calculater
import CalculateByFolder from "./CalculateByFolder";
import CalculateByDate from "./CalculateByDate";

const Calculation = ({ navigation }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const updateIndex = (selectedIndex) => {
    setSelectedIndex(selectedIndex);
  };
  return (
    <InputContainer>
      <PageTitle> Calculate Your Receipts </PageTitle>
    <>
      <TextStyle>Receipts Calculator</TextStyle>
      <ButtonGroup
        onPress={updateIndex}
        selectedIndex={selectedIndex}
        buttons={[`By Date`, `By Folder`]}
        containerStyle={{ height: 30, marginTop: 10 }}
        selectedButtonStyle={{ backgroundColor: "#ffbf00" }}
      />
      {selectedIndex === 0 && <CalculateByDate navigation={navigation} />}

      {selectedIndex === 1 && <CalculateByFolder navigation={navigation} />}
    </>
  );
};

export default observer(Calculation);
