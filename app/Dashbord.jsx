import { View, Text, Image, StyleSheet, ImageBackground, TextInput, TouchableOpacity } from 'react-native';
import { width, height } from '../constants/tamanho';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { auth } from '../Services/firebaseConfig.js';
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';

export default function Cadastro() {
  const navigation = useNavigation();

  // Objeto para armazenar os campos de entrada
  const [form, setForm] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarEmail: '',
    confirmarSenha: ''
  });

  // Estado para armazenar o usuário logado
  const [user, setUser] = useState(null);

  // Função para manipular as mudanças de valor nos campos
  const handleChange = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });
  };

  // Monitora o estado de autenticação e obtém o usuário logado
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe; // Remove o listener quando o componente desmonta
  }, []);

  // Função para validações e cadastro de usuário
  const handleCadastro = () => {
    const { nome, email, senha, confirmarEmail, confirmarSenha } = form;

    if (!nome || !email || !senha || !confirmarEmail || !confirmarSenha) {
      alert("Erro", "Preencha todos os campos");
      return;
    }

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
        const user = userCredential.user;
        setUser(user);  // Atualiza o estado com o usuário logado
        navigation.navigate('Dashbord');
      })
      .catch((error) => {
        console.log(error.message);
        alert("Usuário já existe");
      });

    // Limpar campos após o cadastro
    setForm({
      nome: '',
      email: '',
      senha: '',
      confirmarEmail: '',
      confirmarSenha: ''
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
        {user ? (
          <View style={styles.userInfo}>
            <Text style={styles.userInfoText}>Usuário Logado:</Text>
            <Text style={styles.userInfoText}>Email: {user.email}</Text>
            <TouchableOpacity
              style={styles.login_button}
              onPress={() => navigation.navigate('Home')}
            >
              <Text style={styles.login_button_texto}>Voltar para Home</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <TextInput
              style={styles.login_dados_nome}
              placeholder='Nome'
              value={form.nome}
              onChangeText={(value) => handleChange('nome', value)}
            />
            <TextInput
              style={styles.login_dados_email}
              placeholder='Email'
              value={form.email}
              onChangeText={(value) => handleChange('email', value)}
            />
            <TextInput
              style={styles.login_dados_email}
              placeholder='Confirmar email'
              value={form.confirmarEmail}
              onChangeText={(value) => handleChange('confirmarEmail', value)}
            />
            <TextInput
              style={styles.login_dados_senha}
              placeholder='Senha'
              secureTextEntry={true}
              value={form.senha}
              onChangeText={(value) => handleChange('senha', value)}
            />
            <TextInput
              style={styles.login_dados_senha}
              placeholder='Confirmar senha'
              secureTextEntry={true}
              value={form.confirmarSenha}
              onChangeText={(value) => handleChange('confirmarSenha', value)}
            />
            <TouchableOpacity
              style={styles.login_button}
              onPress={handleCadastro}
            >
              <Text style={styles.login_button_texto}>Cadastrar</Text>
            </TouchableOpacity>
          </>
        )}
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
  userInfo: {
    marginTop: height * 0.3,
    alignItems: 'center',
  },
  userInfoText: {
    color: 'white',
    fontSize: 16,
    marginBottom: 10,
  },
});
