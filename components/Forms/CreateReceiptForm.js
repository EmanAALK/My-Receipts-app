import React, { useState, useRef, useEffect } from "react";
import { observer } from "mobx-react";
import {
  Button,
  Image,
  Platform,
  Picker,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Dimensions,
} from "react-native";

//Image Picker
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

//Camera
import { Camera } from "expo-camera";
// import { Video } from "expo-av";

//Date Picker
import DatePicker from "react-native-datepicker";
import RNPickerSelect from "react-native-picker-select";

//Components
import FolderItem from "./FolderItem";
import CameraModal from "../Modals/CameraModal";

//Stores
// import receiptStore from "../../store/ReceiptStore";
import authStore from "../../store/authStore";
import folderStore from "../../store/FolderStore";

//Styles
import {
  FormContainer,
  FormTitle,
  FormTextInput,
  FormButtonText,
  FormButton,
  EditContainer,
} from "./styles";

//Variables Declaration
const WINDOW_HEIGHT = Dimensions.get("window").height;
const closeButtonSize = Math.floor(WINDOW_HEIGHT * 0.032);
const captureSize = Math.floor(WINDOW_HEIGHT * 0.09);

const CreateReceiptForm = ({ navigation }) => {
  const [receipt, setReceipt] = useState({
    name: "",
    price: "",
    date: "",
    Expdate: "",
    image: "",
  });
  const handleCancel = async () => {
    navigation.navigate("Home");
  };

  //Album Access State
  const handleSubmit = async () => {
    let localUri = image;
    let filename = localUri.split("/").pop();
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    //   await receiptStore.createReceipt({
    //     ...receipt,

    //     image: { uri: localUri, name: filename, type },
    //   });
    //   navigation.replace("ReceiptList");
  };

  const folder = folderStore.folders
    .filter((folder) => folder.userId === authStore.user.id)
    .map((folder) => (folder = folder.name));

  let name = [];
  name = folder.map(function (i) {
    return { labe: i.name };
  });

  //   let name = [];
  //   name = folder.map(function (i) {
  //     return { labe: i.name };
  //   });

  //Image Picking
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    try {
      if (Platform.OS !== "web") {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        setImage(result.uri);
      }
    } catch (E) {}
  };

  //Camera Access
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  const cameraRef = useRef();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  //Photo Snapping
  const onCameraReady = () => {
    setIsCameraReady(true);
  };
  const takePicture = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.5, base64: true, skipProcessing: true };
      const data = await cameraRef.current.takePictureAsync(options);
      const source = data.uri;
      if (source) {
        await cameraRef.current.pausePreview();
        setIsPreview(true);
        console.log("picture source", source);
      }
    }
  };

  //Camera Flipping
  const switchCamera = () => {
    if (isPreview) {
      return;
    }
    setCameraType((prevCameraType) =>
      prevCameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  //Cancel Captured Photo
  const cancelPreview = async () => {
    await cameraRef.current.resumePreview();
    setIsPreview(false);
    setVideoSource(null);
  };

  const renderCancelPreviewButton = () => (
    <TouchableOpacity onPress={cancelPreview} style={styles.closeButton}>
      <View style={[styles.closeCross, { transform: [{ rotate: "45deg" }] }]} />
      <View
        style={[styles.closeCross, { transform: [{ rotate: "-45deg" }] }]}
      />
    </TouchableOpacity>
  );

  //Photo Capturing Controller
  const renderCaptureControl = () => (
    <View style={styles.control}>
      <TouchableOpacity disabled={!isCameraReady} onPress={switchCamera}>
        <Text style={styles.text}>{"Flip"}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.7}
        disabled={!isCameraReady}
        onPress={takePicture}
        style={styles.capture}
      />
    </View>
  );

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to your album</Text>;
  }

  return (
    <>
      <CameraModal />
      {pickImage}
      <FormContainer>
        <FormTitle>Add A Receipt</FormTitle>

        {/* {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )} */}

        {/* Folder */}
        <RNPickerSelect
          onValueChange={(value) => console.log(value)}
          items={folder.map((name) => ({ label: name, value: name }))}
        />

        <FormTextInput
          onChangeText={(name) => setReceipt({ ...receipt, name })}
          placeholder='Receipt Name'
          placeholderTextColor='#A6AEC1'
        />

        <FormTextInput
          onChangeText={(price) => setReceipt({ ...receipt, price })}
          placeholder='Price'
          placeholderTextColor='#A6AEC1'
        />

        {/* Date */}
        <DatePicker
          style={{ width: 255 }}
          date={receipt.date}
          mode='date'
          placeholder='select date'
          format='YYYY-MM-DD'
          confirmBtnText='Confirm'
          cancelBtnText='Cancel'
          customStyles={{
            dateIcon: {
              position: "absolute",
              left: 0,
              top: 4,
              marginRight: 4,
              marginLeft: 0,
              borderColor: "#cea146",
            },
            dateInput: {
              marginLeft: 36,
            },
          }}
          onDateChange={(date) => {
            return setReceipt({ ...receipt, date });
          }}
        />
        <DatePicker
          style={{ width: 255 }}
          date={receipt.Expdate}
          mode='Expiration date'
          placeholder='select date'
          format='YYYY-MM-DD'
          confirmBtnText='Confirm'
          cancelBtnText='Cancel'
          customStyles={{
            dateIcon: {
              position: "absolute",
              left: 0,
              top: 4,
              marginRight: 4,
              marginLeft: 0,
              borderColor: "#cea146",
            },
            dateInput: {
              marginLeft: 36,
            },
          }}
          onDateChange={(Expdate) => {
            return setReceipt({ ...receipt, Expdate });
          }}
        />

        {/* Image  */}
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            color: "black",
          }}
        >
          <Button title='Pick an image from camera roll' onPress={pickImage} />
          {image && (
            <Image
              source={{ uri: image }}
              style={{ width: 200, height: 200 }}
            />
          )}
        </View>

        <View style={{ flexDirection: "row" }}>
          <FormButton onPress={handleSubmit}>
            <FormButtonText>Save Changes</FormButtonText>
          </FormButton>

          <FormButton onPress={handleCancel}>
            <FormButtonText>Cancel</FormButtonText>
          </FormButton>
        </View>
      </FormContainer>

      {/* Camera */}
      <SafeAreaView style={styles.container}>
        <Camera
          ref={cameraRef}
          style={styles.container}
          type={cameraType}
          flashMode={Camera.Constants.FlashMode.on}
          onCameraReady={onCameraReady}
          onMountError={(error) => {
            console.log("camera error", error);
          }}
        />
        <View style={styles.container}>
          {isPreview && renderCancelPreviewButton()}
          {!isPreview && renderCaptureControl()}
        </View>
      </SafeAreaView>
    </>
  );
};

//Camera Screen Styling
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  closeButton: {
    position: "absolute",
    top: 35,
    left: 15,
    height: closeButtonSize,
    width: closeButtonSize,
    borderRadius: Math.floor(closeButtonSize / 2),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#c4c5c4",
    opacity: 0.7,
    zIndex: 2,
  },
  media: {
    ...StyleSheet.absoluteFillObject,
  },
  closeCross: {
    width: "68%",
    height: 1,
    backgroundColor: "black",
  },
  control: {
    position: "absolute",
    flexDirection: "row",
    bottom: 38,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  capture: {
    backgroundColor: "#f5f6f5",
    borderRadius: 5,
    height: captureSize,
    width: captureSize,
    borderRadius: Math.floor(captureSize / 2),
    marginHorizontal: 31,
  },
  recordIndicatorContainer: {
    flexDirection: "row",
    position: "absolute",
    top: 25,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    opacity: 0.7,
  },
  recordTitle: {
    fontSize: 14,
    color: "#ffffff",
    textAlign: "center",
  },
  recordDot: {
    borderRadius: 3,
    height: 6,
    width: 6,
    backgroundColor: "#ff0000",
    marginHorizontal: 5,
  },
  text: {
    color: "#fff",
  },
});

export default observer(CreateReceiptForm);
