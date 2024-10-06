import { View, Text, Image, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { width, height } from '../constants/tamanho';
import AsyncStorage from '@react-native-async-storage/async-storage';     
import { useNavigation, useRoute } from '@react-navigation/native';


export default function Dashbord() {
  
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/images/fundo.png")}
        style={styles.fundo}
      >
        <Image
          source={require("../assets/images/imagem_1.2.png")}
          style={styles.imagem_login}
        />

        <TouchableOpacity
          style={styles.login_button}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.login_button_texto}>Teste</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  login_button: {
    height: height * 0.04,
    width: width * 0.6,
    borderRadius: width * 0.1,
    borderWidth: width * 0.003,
    borderColor: "white",
    alignItems: "center",
    justifyContent: "center",
    margin: height * 0.01,
  },
  login_button_texto: {
    color: "white",
    opacity: 0.7,
  },
  container: {
    flex: 1,
    backgroundColor: "blue",
    alignItems: "center",
  },
  fundo: {
    flex: 1,
    alignItems: "center",
    height: height,
    width: width,
  },
  imagem_login: {
    position: "absolute",
    top: 0,
  },
});
