import { View, Text, Image, StyleSheet, ImageBackground, TextInput, TouchableOpacity, Alert } from 'react-native';
import { width, height } from '../constants/tamanho';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {auth} from '../Services/firebaseConfig.js'
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function Cadastro() {
  const navigation = useNavigation();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarEmail, setConfirmarEmail] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const handleCadastro = () => {
    if (!nome || !email || !senha || !confirmarEmail || !confirmarSenha) {
      alert("Erro", "Preencha todos os campos");
      return;
    }
  
    // Validação de email
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      alert("Erro", "Email inválido");
      return;
    }

    if (email !== confirmarEmail || senha !== confirmarSenha) {
      alert("Erro", "Os emails ou as senhas não coincidem!");
      return;
    }
  
    
    createUserWithEmailAndPassword(auth, email, senha)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      navigation.navigate('Dashbord');
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
      alert("usuário ja existe");
      
      // ..
    });

     // Limpar campos após o cadastro
     setNome('');
     setEmail('');
     setSenha('');
     setConfirmarEmail('');
     setConfirmarSenha('');

  
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
          style={styles.login_dados_nome} 
          placeholder='Nome' 
          value={nome}
          onChangeText={setNome}
        />
        <TextInput 
          style={styles.login_dados_email} 
          placeholder='Email'
          value={email}
          onChangeText={setEmail}
        />
        <TextInput 
          style={styles.login_dados_email} 
          placeholder='Confirmar email'
          value={confirmarEmail}
          onChangeText={setConfirmarEmail}
        />
        <TextInput 
          style={styles.login_dados_senha} 
          placeholder='Senha' 
          secureTextEntry={true}
          value={senha}
          onChangeText={setSenha}
        />
        <TextInput 
          style={styles.login_dados_senha} 
          placeholder='Confirmar senha' 
          secureTextEntry={true}
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
        />
        <TouchableOpacity
          style={styles.login_button}
          onPress={handleCadastro}
        >
          <Text style={styles.login_button_texto}>Cadastrar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text style={styles.login_button_texto}>Voltar</Text>
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
