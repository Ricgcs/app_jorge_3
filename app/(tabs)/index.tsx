import { View,Text,Image, StyleSheet, Platform,ImageBackground,TextInput,TouchableOpacity } from 'react-native';
import {width, height} from '../../constants/tamanho'

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <ImageBackground
      source={require("../../assets/images/fundo.png")}
      style={styles.fundo}
      >
      <Image
      source={require("../../assets/images/imagem_1.2.png")}
      style = {styles.imagem_login}
      />
      <TextInput style={styles.login_dados_nome} placeholder='Nome'/>
      <TextInput style={styles.login_dados_email} placeholder='Email'/>
      <TextInput style={styles.login_dados_email} placeholder='Confirmar email'/>
      <TextInput style={styles.login_dados_senha} placeholder='Senha'/>
      <TextInput style={styles.login_dados_senha} placeholder='Confirmar senha'/>
      <TouchableOpacity/>

   </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
 container:{
  flex:1,
  backgroundColor:"blue",
  alignItems:"center",
  
 },
 login_dados_nome:{
marginTop:height*0.3,
color:"white",
width:width*0.8,
borderRadius:width*0.1,
borderWidth:width*0.003,
borderColor:"white",
height:height*0.05,
opacity:0.7
 },
 login_dados_email:{
  color:"white",
  width:width*0.8,
  borderRadius:width*0.1,
  borderWidth:width*0.003,
  borderColor:"white",
  height:height*0.05,
  opacity:0.7,
  marginTop:height*0.02,
 
   },
   login_dados_senha:{
    color:"white",
    width:width*0.8,
    borderRadius:width*0.1,
    borderWidth:width*0.003,
    borderColor:"white",
    height:height*0.05,
    opacity:0.7,
  marginTop:height*0.02,

     },

 fundo:{
  flex:1,
  alignItems:"center",
  height:height,
  width:width,
 },

 imagem_login:{
 position:"absolute",
 top:0
 },
 texto:{
  color:"white",
  fontSize:40,
  position:"absolute",
  fontFamily:"Gotham",
  opacity:0.7,
  top:210
 }
});
