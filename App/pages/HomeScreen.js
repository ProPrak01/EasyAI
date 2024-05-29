import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";

import ChatFaceData from "../Services/chatFaceData";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const [chatFaceData, setChatFaceData] = useState([]);
  const [selectedChatFaceData, setSelectedChatFaceData] = useState([]);
const navigation=useNavigation();
  useEffect(() => {
    setChatFaceData(ChatFaceData);

    setSelectedChatFaceData(ChatFaceData[0]);
    // console.log(selectedChatFaceData);
  }, []);

  const onChatFacePressed = (id) => {
    console.log(id);
    setSelectedChatFaceData(ChatFaceData[id - 1]);
  };
  return (
    <View style={[{ alignItems: "center", paddingTop: 130 }]}>
      <Text style={[{ color: selectedChatFaceData.primary, fontSize: 30 }]}>
        Hello i am{" "}
      </Text>
      <Text
        style={[
          {
            color: selectedChatFaceData.primary,
            fontSize: 30,
            fontWeight: "bold",
          },
        ]}
      >
        {selectedChatFaceData.name}
      </Text>
      <Image
        source={{ uri: selectedChatFaceData.image }}
        style={{ height: 150, width: 150, marginTop: 20 }}
      />
      <Text
        style={[
          { color: "black", paddingTop: 25, fontSize: 15, fontWeight: "bold" },
        ]}
      >
        How may i help you ?
      </Text>
      <View
        style={{
          marginTop: 20,
          backgroundColor: "#F5F5F5",
          alignItems: "center",
          height: 110,
          padding: 10,
        }}
      >
        <FlatList
          data={chatFaceData}
          horizontal={true}
          renderItem={({ item }) =>
            selectedChatFaceData.id != item.id && (
              <TouchableOpacity onPress={() => onChatFacePressed(item.id)}>
                <Image
                  source={{ uri: item.image }}
                  style={{ width: 40, height: 40, margin: 15 }}
                />
              </TouchableOpacity>
            )
          }
        />
        <Text style={{ marginTop: 5, fontSize: 17, color: "#B0B0B0" }}>
          Choose your Fav ChatBot
        </Text>
      </View>

      <TouchableOpacity
        style={{
          alignItems: "center",
          borderRadius: 12,
          marginTop: 95,
          backgroundColor: selectedChatFaceData.primary,
          paddingHorizontal: 50,
          paddingVertical: 20,
        }}
        onPress={()=>navigation.navigate('chat',{selectedFace:selectedChatFaceData})}
      >
        <Text style={{ color: "#ffffff", fontSize: 20, fontWeight: "bold" }}>
          CHAT
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
