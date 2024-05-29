import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import ChatFaceData from "../Services/chatFaceData";
import { GestureHandlerRootView, PanGestureHandler, State } from 'react-native-gesture-handler';

const HomeScreen = () => {
  const [chatFaceData, setChatFaceData] = useState([]);
  const [selectedChatFaceData, setSelectedChatFaceData] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    setChatFaceData(ChatFaceData);
    setSelectedChatFaceData(ChatFaceData[0]);
  }, []);

  const onChatFacePressed = (id) => {
    setSelectedChatFaceData(ChatFaceData[id - 1]);
  };

  const handleSwipe = (direction) => {
    const currentIndex = chatFaceData.findIndex(face => face.id === selectedChatFaceData.id);
    if (direction === 'left' && currentIndex < chatFaceData.length - 1) {
      setSelectedChatFaceData(chatFaceData[currentIndex + 1]);
    } else if (direction === 'right' && currentIndex > 0) {
      setSelectedChatFaceData(chatFaceData[currentIndex - 1]);
    }
  };

  const onHandlerStateChange = (event) => {
    const { translationX, state } = event.nativeEvent;
    if (state === State.END) {
      if (translationX < -50) {
        handleSwipe('left');
      } else if (translationX > 50) {
        handleSwipe('right');
      }
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 ,backgroundColor:selectedChatFaceData.secondary}}>
      <View style={{ alignItems: "center", paddingTop: 130  }}>
        <PanGestureHandler onHandlerStateChange={onHandlerStateChange}>
          <View style={{ alignItems: "center" }}>
            <Text style={[{ color: selectedChatFaceData.primary, fontSize: 30, fontFamily: 'custom-font' }]}>
              Hello I am{" "}
            </Text>
            <Text style={[{ color: selectedChatFaceData.primary, fontSize: 30, fontFamily: 'custom-font' }]}>
              {selectedChatFaceData.name}
            </Text>
            <Image
              source={{ uri: selectedChatFaceData.image }}
              style={{ height: 150, width: 150, marginTop: 20 }}
            />
            <Text style={[{ color: "black", paddingTop: 25, fontSize: 15, fontFamily: 'custom-font' ,paddingHorizontal:30,textAlign: 'center'}]}>
            {selectedChatFaceData.prompt}
            </Text>
          </View>
        </PanGestureHandler>

        <TouchableOpacity
          style={{
            alignItems: "center",
            borderRadius: 12,
            marginTop: 135,
            backgroundColor: selectedChatFaceData.primary,
            paddingHorizontal: 50,
            paddingVertical: 20,
            borderWidth: 3, // Add this line for border width
            borderColor: "#000000", // Add this line for border color
         
          }}
          onPress={() => navigation.navigate('chat', { selectedFace: selectedChatFaceData })}
        >
          <Text style={{ color: "#ffffff", fontSize: 20, fontWeight: "bold"}}>
            CHAT
          </Text>
        </TouchableOpacity>
        <View
          style={{
            marginTop: 50,
            backgroundColor: "#F5F5F5",
            alignItems: "center",
            height: 110,
            padding: 10,
            backgroundColor:selectedChatFaceData.secondary
          }}
        >
          <FlatList

            data={chatFaceData}
            horizontal={true}
          
            renderItem={({ item }) =>
              selectedChatFaceData.id !== item.id && (
                <TouchableOpacity onPress={() => onChatFacePressed(item.id)}>
                  <Image
                    source={{ uri: item.image }}
                    style={{ width: 50, height: 50, margin: 15 }}
                  />
                </TouchableOpacity>
              )
            }
          />
          <Text style={{ marginTop: 10, fontSize: 13, color: selectedChatFaceData.primary, fontFamily: 'custom-font' }}>
            Choose your chat personalities
          </Text>
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

export default HomeScreen;
