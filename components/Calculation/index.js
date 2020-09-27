import React, { useState } from "react";
import { observer } from "mobx-react";

//Styling
import { InputContainer, TextStyle, PageTitle, SelectButton } from "./styles";
import { View } from "native-base";

import { ButtonGroup } from "react-native-elements";

//Calculater
import CalculateByFolder from "./CalculateByFolder";
import CalculateByDate from "./CalculateByDate";
// import { View } from "react-native-animatable";

const Calculation = ({ navigation }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const updateIndex = (selectedIndex) => {
    setSelectedIndex(selectedIndex);
  };
  return (
    <>
      <PageTitle> My Expenses </PageTitle>
      <InputContainer>
        <ButtonGroup
          onPress={updateIndex}
          selectedIndex={selectedIndex}
          buttons={[`By Date`, `By Folder`]}
          containerStyle={{ height: 30, width: 220, marginTop: 10 }}
          selectedButtonStyle={{ backgroundColor: "#ffbf00" }}
        />
      </InputContainer>
      {selectedIndex === 0 && <CalculateByDate navigation={navigation} />}

      {selectedIndex === 1 && <CalculateByFolder navigation={navigation} />}
    </>
  );
};

export default observer(Calculation);
