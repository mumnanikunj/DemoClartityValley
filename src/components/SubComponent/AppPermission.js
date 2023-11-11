import { Alert, Linking, Platform } from "react-native";
import { check, request, PERMISSIONS, } from "react-native-permissions";
import Toast from "react-native-simple-toast";

function requestPermission(permission) {
  if (permission == "microphone") {
    Platform.OS == "ios"

      ?
      request(PERMISSIONS.IOS.MICROPHONE || PERMISSIONS.IOS.SPEECH_RECOGNITION).then((result) => {
        if (result == "granted") {
        }
      })
      : request(PERMISSIONS.ANDROID.RECORD_AUDIO).then((result) => {
        if (result == "granted") {
        }
      })
  }
  if (permission == "media") {
    Platform.OS == "ios"
      ? request(PERMISSIONS.IOS.PHOTO_LIBRARY).then((result) => {
        if (result == "granted") {
        }
      })
      : request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE || PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE).then((result) => {
        if (result == "granted") {
        }
      });
  }
  if (permission == "Camera") {
    Platform.OS == "ios"
      ? request(PERMISSIONS.IOS.CAMERA).then((result) => {
        if (result == "granted") {
        }
      })
      : request(PERMISSIONS.ANDROID.CAMERA).then((result) => {
        if (result == "granted") {
        }
      });
  }

}




export function CheckPermissionsAudio() {
  if (Platform.OS == "android") {
    check(PERMISSIONS.ANDROID.RECORD_AUDIO).then((results) => {
      switch (results) {
        case "denied":
          requestPermission("microphone");
          break;
        case "blocked":
          Alert.alert(
            "Hold on!",
            "We are not able to access your microphone ! For further process you need to enable location permission from settings.",
            [{ text: "Setting", onPress: () => Linking.openSettings() }],
            { cancelable: true }
          );
          break;

        case "unavailable":
          Toast.showWithGravity(
            "microphone service not available",
            Toast.SHORT,
            Toast.BOTTOM
          );
          break;

        case "granted":
        default:
          break;
      }
    });
  } else if (Platform.OS == "ios") {
    check(PERMISSIONS.IOS.MICROPHONE || PERMISSIONS.IOS.SPEECH_RECOGNITION).then((results) => {
      switch (results) {
        case "denied":
          requestPermission("microphone");
          break;
        case "blocked":
          Alert.alert(
            "Hold on!",
            "We are not able to access your microphone ! For further process you need to enable microphone permission from settings.",
            [{ text: "Setting", onPress: () => Linking.openSettings() }],
            { cancelable: true }
          );
          break;

        case "unavailable":
          Toast.showWithGravity(
            "microphone service not available",
            Toast.SHORT,
            Toast.BOTTOM
          );
          break;

        case "granted":
          break;

        default:
          break;
      }
    });
  }
}
export function checkMedia() {
  console.log('Enter Permission Storage ');
  if (Platform.OS == "android") {
    check(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE || PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE).then((results) => {
      switch (results) {
        case "denied":
          requestPermission("media");
          break;
        case "blocked":
          Alert.alert(
            "Hold on!",
            "We are not able to access your Media ! For further process you need to enable Media permission from settings.",
            [{ text: "Setting", onPress: () => Linking.openSettings() }],
            { cancelable: true }
          );
          break;

        case "unavailable":
          Toast.showWithGravity(
            "Media service not available",
            Toast.SHORT,
            Toast.BOTTOM
          );
          break;

        case "granted":
        default:
          break;
      }
    });
  } else if (Platform.OS == "ios") {
    check(PERMISSIONS.IOS.PHOTO_LIBRARY || PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY).then((results) => {
      switch (results) {
        case "denied":
          requestPermission("media");
          break;
        case "blocked":
          Alert.alert(
            "Hold on!",
            "We are not able to access your media ! For further process you need to enable meadi permission from settings.",
            [{ text: "Setting", onPress: () => Linking.openSettings() }],
            { cancelable: true }
          );
          break;

        case "unavailable":
          Toast.showWithGravity(
            "media service not available",
            Toast.SHORT,
            Toast.BOTTOM
          );
          break;

        case "granted":
          break;

        default:
          break;
      }
    });
  }
}

export function checkCamera() {
  console.log('Enter Permission Camera');
  if (Platform.OS == "android") {
    check(PERMISSIONS.ANDROID.CAMERA).then((results) => {
      switch (results) {
        case "denied":
          requestPermission("Camera");
          break;
        case "blocked":
          Alert.alert(
            "Hold on!",
            "We are not able to access your Camera ! For further process you need to enable Camera permission from settings.",
            [{ text: "Setting", onPress: () => Linking.openSettings()}],
            { cancelable: true }
          );
          break;

        case "unavailable":
          Toast.showWithGravity(
            "Camera service not available",
            Toast.SHORT,
            Toast.BOTTOM
          );
          break;

        case "granted":
        default:
          break;
      }
    });
  } else if (Platform.OS == "ios") {
    check(PERMISSIONS.IOS.CAMERA).then((results) => {
      switch (results) {
        case "denied":
          requestPermission("Camera");
          break;
        case "blocked":
          Alert.alert(
            "Hold on!",
            "We are not able to access your Camera ! For further process you need to enable Camera permission from settings.",
            [{ text: "Setting", onPress: () => Linking.openSettings() }],
            { cancelable: true }
          );
          break;

        case "unavailable":
          Toast.showWithGravity(
            "Camera service not available",
            Toast.SHORT,
            Toast.BOTTOM
          );
          break;

        case "granted":
          break;

        default:
          break;
      }
    });
  }
}