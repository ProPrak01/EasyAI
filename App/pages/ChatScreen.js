import { useRoute } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import GlobalApi from "../Services/GlobalApi";

const ChatScreen = () => {
  const params = useRoute().params;
  const [messages, setMessages] = useState([]);
  const [selectedChatFace, setSelectedChatFace] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadCount, setLoadCount] = useState(0);

  useEffect(() => {
    // Load the component logic
    console.log(params.selectedFace);
    setSelectedChatFace(params.selectedFace);
    setMessages([
      {
        _id: 1,
        text: "Hello this is  " + params.selectedFace.name,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: `${params.selectedFace.image}`,
        },
      },
    ]);
  }, [loadCount, params.selectedFace]);

  useEffect(() => {
    // Trigger the load twice
    setLoadCount((prevCount) => prevCount + 1);
    setTimeout(() => {
      setLoadCount((prevCount) => prevCount + 1);
    }, 1000); // Adjust the delay as necessary
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    setLoading(true);
    if (messages[0].text) {
      getAIresult(messages[0].text);
    }
  }, []);
  
  const getAIresult = (msg) => {
    GlobalApi.getResponse(msg,params.selectedFace.name).then((resp) => {
      if (resp.data.message) {
        const apiResponse = {
          _id: Math.random() * (999999 - 1),
          text: resp.data.message,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "React Native",
            avatar: `${selectedChatFace.image}`,
          },
        };
        setMessages((previousMessages) =>
          GiftedChat.append(previousMessages, apiResponse)
        );
        setLoading(false);
      } else {
        setLoading(false);
        const netError = {
          _id: Math.random() * (999999 - 1),
          text: "Sorry. I can't help with that?",
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "React Native",
            avatar: `${selectedChatFace.image}`,
          },
        };
        setMessages((previousMessages) =>
          GiftedChat.append(previousMessages, netError)
        );
      }
    });
  };

  return (
    <View style={{ backgroundColor: "#fff", flex: 1 }}>
      <GiftedChat
        messages={messages}
        isTyping={loading}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    </View>
  );
};

export default ChatScreen;
