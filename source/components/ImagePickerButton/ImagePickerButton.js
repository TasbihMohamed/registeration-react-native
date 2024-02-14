import React, { useState, useEffect } from "react";
import {
  Button,
  Text,
  StyleSheet,
  Image,
  View,
  Platform,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { COLORS } from "../../constants/cnstants";

export default function ImagePickerButton() {
  const [image, setImage] = useState(null);
  const [imageResponse, setImageResponsee] = useState("");
  console.log("hiiiiiiiiiiii");
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log("1111111", result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  const postImage = () => {
    const formData = new FormData();
    formData.append("image", {
      uri: image,
      name: "image.jpg",
      type: "image/jpeg",
    });

    axios
      .post(
        "https://cannula-doctors.onrender.com/doctor-app/register/upload/profile-image",
        formData
      )
      .then(function (response) {
        console.log("2222222", response);
        setImageResponsee(response.data.image);
      })
      .catch(function (error) {
        console.log("33333333", error);
      });
  };
  useEffect(() => {
    postImage();
  }, [image]);

  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {!image && (
        <TouchableOpacity
          onPress={pickImage}
          style={styles.buttonImg}
          activeOpacity={0.5}
        >
          <Image
            source={require("../../../assets/imgBg.png")}
            style={styles.buttonImageIconStyle}
          />
        </TouchableOpacity>
      )}

      {image && <Image style={styles.buttonImg} source={{ uri: image }} />}
    </View>
  );
}

const styles = StyleSheet.create({
  buttonImg: {
    width: 132,
    height: 132,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9F9F9",
  },
  buttonImageIconStyle: {
    // padding: 10,
    // margin: 5,
    height: "48px",
    width: "48px",
    // resizeMode: 'stretch',
  },
});
