import { View, Text, Image, StyleSheet, ImageBackground, TextInput, TouchableOpacity, Alert } from 'react-native';
import { width, height } from '../constants/tamanho';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';

export default function Home() {
  const navigation = useNavigation();

  const [loginNome, setLoginNome] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginSenha, setLoginSenha] = useState('');

  const handleLogin = () => {    
    if (!loginNome || !loginEmail || !loginSenha) {  // Corrigido o !loginSenha
      alert("Preencha todos os campos");
      return;
    }
  
    // Certifique-se de passar os parâmetros corretamente
    navigation.navigate('Dashbord', { 
      codigo: 0,  // Parâmetro de controle
      nomeLogin: loginNome,
      emailLogin: loginEmail,
      senhaLogin: loginSenha,
    });
  };
  
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
        <TextInput 
          onChangeText={setLoginNome} 
          style={styles.login_dados_nome} 
          placeholder='Nome' 
          value={loginNome}
        />
        <TextInput 
          onChangeText={setLoginEmail} 
          style={styles.login_dados_email} 
          placeholder='Email' 
          value={loginEmail}
        />
        <TextInput 
          onChangeText={setLoginSenha} 
          style={styles.login_dados_senha} 
          placeholder='Senha' 
          secureTextEntry 
          value={loginSenha}
        />

        <TouchableOpacity
          style={styles.login_button}
          onPress={handleLogin}
        >
          <Text style={styles.login_button_texto}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate("Cadastro")}>
          <Text style={styles.login_button_texto}>Cadastre-se</Text>
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
  login_dados_nome: {
    marginTop: height * 0.3,
    color: "white",
    width: width * 0.8,
    borderRadius: width * 0.1,
    borderWidth: width * 0.003,
    borderColor: "white",
    height: height * 0.05,
    opacity: 0.7,
  },
  login_dados_email: {
    color: "white",
    width: width * 0.8,
    borderRadius: width * 0.1,
    borderWidth: width * 0.003,
    borderColor: "white",
    height: height * 0.05,
    opacity: 0.7,
    marginTop: height * 0.02,
  },
  login_dados_senha: {
    color: "white",
    width: width * 0.8,
    borderRadius: width * 0.1,
    borderWidth: width * 0.003,
    borderColor: "white",
    height: height * 0.05,
    opacity: 0.7,
    marginTop: height * 0.02,
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
