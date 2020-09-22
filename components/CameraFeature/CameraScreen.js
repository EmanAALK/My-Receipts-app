//Eman is super happy the camera worked!
// Mshary is glad to hear that!😁
// Mshary also thinks this is kind of cheesy!

import React, { useState, useRef, useEffect } from "react"; // unused import
import { observer } from "mobx-react";

//Camera
import { Camera } from "expo-camera";
import { captureRef } from "react-native-view-shot"; // unused import
// import { Video } from "expo-av";

//Components
import CameraPhoto from "./CameraPhoto"; // unused import
import CreateReceiptForm from "../Forms/CreateReceiptForm"; // unused import

import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Dimensions,
} from "react-native";

//Variables Declaration
const WINDOW_HEIGHT = Dimensions.get("window").height;
const closeButtonSize = Math.floor(WINDOW_HEIGHT * 0.032);
const captureSize = Math.floor(WINDOW_HEIGHT * 0.09);

/**
 * Remove all commented unused code.
 */

const CameraScreen = ({ navigation }) => {
  //Camera Access
  const [hasPermission, setHasPermission] = useState(null); //Access Permision <-- Permission misspelled
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  //   const cameraRef = useRef();
  const [cameraRef, setCameraRef] = useState(null);
  //   const [container, setContainer] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  //Save to Camera roll
  //   const saveToCameraRollAsync = async () => {
  //     try {
  //       let result = await captureRef(container, { format: "png" });

  //       let saveResult = await CameraRoll.saveToCameraRoll(result, "photo");
  //       console.log(saveResult);
  //       setState({ cameraRollUri: saveResult });
  //     } catch (snapshotError) {
  //       console.error(snapshotError);
  //     }
  //   };

  //Photo Snapping

  //   const onPictureSaved = async (photo) => {
  //     setState({ image: photo });
  //   };

  const onCameraReady = () => {
    setIsCameraReady(true);
  };
  // unused method
  const takePicture = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.5, base64: true, skipProcessing: true };
      const data = await cameraRef.current.takePictureAsync(
        options,
        onPictureSaved
      );
      const source = data.uri;
      if (source) {
        await cameraRef.current.pausePreview();
        setIsPreview(true);
        console.log("picture source", source); // also remove all console logs
        saveToCameraRollAsync();
      }
    }
  };

  //Camera Flipping
  // unused method
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
      <TouchableOpacity
        activeOpacity={0.7}
        disabled={!isCameraReady}
        onPress={async () => {
          if (cameraRef) {
            let photo = await cameraRef.takePictureAsync("photo");
            console.log("photo", photo);
            navigation.navigate("CreateReceiptForm", { photo: photo });
          }
        }}
        style={{
          borderWidth: 2,
          borderRadius: 50,
          borderColor: "white",
          height: 80,
          width: 80,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            borderWidth: 2,
            borderRadius: 40,
            borderColor: "white",
            height: 70,
            width: 70,
            backgroundColor: "white",
          }}
        ></View>
      </TouchableOpacity>
    </View>
  );

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to your album</Text>;
  }

  return (
    /* Camera */
    <SafeAreaView style={styles.container}>
      <Camera
        ref={(ref) => {
          setCameraRef(ref);
        }}
        // ref={cameraRef}
        style={styles.container}
        type={cameraType}
        flashMode={Camera.Constants.FlashMode.on}
        onCameraReady={onCameraReady}
        onMountError={(error) => {
          console.log("camera error", error);
        }}
      // autoFocus
      />
      <View style={styles.container}>
        {isPreview && renderCancelPreviewButton()}
        {!isPreview && renderCaptureControl()}
      </View>
    </SafeAreaView>
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

export default observer(CameraScreen);
