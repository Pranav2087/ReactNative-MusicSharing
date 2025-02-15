import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Image,
  Dimensions,
  Text,
  TouchableOpacity, // Import TouchableOpacity
} from "react-native";
import { colors, sizes } from '../data/theme';
import { launchImageLibrary } from "react-native-image-picker";

const { width, height } = Dimensions.get("window");

const styles = {
  container: {
    padding: 20,
    flex: 1
  },
  profileHeadingText:{
    fontSize:38,
    color:'#422142'
  },
  profileText:{
    fontSize:14,
    color:'#422142'
  },
  buttonText:{
    color:'#ffffff'
  },
  photoFullView: {
    marginBottom: 20,
  },
  photoEmptyView: {
    borderWidth: 3,
    borderRadius: 10,
    borderColor: "#999",
    borderStyle: "dashed",
    height: height / 2,
    marginBottom: 20,
  },
  photoFullImage: {
    width: "100%",
    borderRadius: 10,
  },
  buttonView: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  addPhoto: {
    backgroundColor: "#800080",
    color: "#ffffff",
    fontWeight: "bold",
    padding: 10,
    borderRadius: 10,
    textAlign: "center",
    width: "50%",
    marginLeft: "25%",
    marginTop: -(height / 3.25),
  },
  changePhoto: {
    backgroundColor: "#800080",
    color: "#ffffff",
    fontWeight: "bold",
    padding: 10,
    borderRadius: 10,
    textAlign: "center",
    width: "50%",
    marginLeft: "25%",
    marginTop: -(height / 12),
    top:350
  },
  profileContainer: {
    padding: 20,
    backgroundColor: "#f0c4f0",
    flex: 1
}
};

export default function App() {
  const [photoState, setPhotoState] = useState({});
  console.log(photoState);

  async function handleChangePress() {
    const result = await launchImageLibrary();
    //console.log(result);
    if (typeof result.assets[0] == "object") {
      setPhotoState(result.assets[0]);
    }
  }

  async function handleRemovePress() {
    setPhotoState({});
  }

  const hasPhoto = typeof photoState.uri != "undefined";

  function Photo(props) {
    if (hasPhoto) {
      return (
        <View style={styles.photoFullView}>
          <Image
            style={styles.photoFullImage}
            resizeMode="cover"
            source={{
              uri: photoState.uri,
              width: width,
              height: height / 2,
            }}
          />
        </View>
      );
    } else {
      return <View style={styles.photoEmptyView} />;
    }
  }

  return (
    <SafeAreaView>
      <Text style={styles.profileHeadingText}>Edit Profile</Text>
      <Text style={styles.profileText}>Mirror, Mirror On The Wall....</Text>
      <View style={styles.container}>
        <Photo />
        <View>
          <TouchableOpacity
            onPress={handleChangePress}
            style={hasPhoto ? styles.changePhoto : styles.addPhoto} // Apply the addPhoto or changePhoto style based on the condition
          >
            <Text style={styles.buttonText}>{hasPhoto ? "Change Photo" : "Add Photo"}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
