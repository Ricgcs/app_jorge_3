import { View, Text, Image, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { width, height } from '../constants/tamanho';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const salvarUsuarios = async (usuarios) => {
  try {
    const jsonValue = JSON.stringify(usuarios);
    await AsyncStorage.setItem('@usuarios', jsonValue);
  } catch (e) {
    console.error("Erro ao salvar usuários", e);
  }
};

const carregarUsuarios = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@usuarios');
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error("Erro ao carregar usuários", e);
    return []; 
  }
};

export default function Dashbord({ route, navigation }) {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const loadedUsuarios = await carregarUsuarios();
      setUsuarios(loadedUsuarios);
    };

    loadData();
  }, []);

  
  if (!route || !route.params) {
    alert("Parâmetros não foram passados corretamente.");
    navigation.navigate("Home");
    return null;  
  }

  const { codigo, nomeLogin, emailLogin, senhaLogin, nomeCadastro, emailCadastro, senhaCadastro } = route.params;

  if (codigo === 0) {
   
    const usuario = usuarios.find(user =>
      user.nome === nomeLogin && user.email === emailLogin && user.senha === senhaLogin
    );

    if (!usuario) {
      alert("Usuário não encontrado");
      navigation.navigate("Home");
    }
  } else {
    // Lógica de cadastro
    const usuarioExistente = usuarios.find(user =>
      user.nome === nomeCadastro && user.email === emailCadastro && user.senha === senhaCadastro
    );

    if (usuarioExistente) {
      alert("Usuário já existe");
      navigation.navigate("Cadastro");
      return; // Evitar adicionar o novo usuário se já existir
    }

    const novoUser = { nome: nomeCadastro, email: emailCadastro, senha: senhaCadastro };
    const updatedUsuarios = [...usuarios, novoUser];
    setUsuarios(updatedUsuarios);
    salvarUsuarios(updatedUsuarios); // Salvar o novo usuário
  }

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
