import React,{useState, useEffect} from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from 'react-native';
import Formulario from './components/Formulario';
import axios from 'axios'
import Clima from './components/Clima';


type SectionProps = PropsWithChildren<{
  title: string;
}>;

function App(): JSX.Element {
  //API  https://openweathermap.org/
  //API Key: 56bfdde729138c6e9d133e7a79c1bba7

  const [busqueda, guardarBusqueda] = useState(
    {
      ciudad: '',
      pais:''
    }
  )

  //State para saber en que momemnto consultar a la API
  const [consultar, guardarConsultar] = useState(false)
  //State para guardar el resultado de la peticion
  const [resultado, guardarResultado] = useState({})
  //State para el cambio de color de fondo de la app
  const [bgColor, setBGColor] = useState('rgb(71,149,212)')

  //Extraemos los valores del objeto en variables
  const {ciudad, pais} = busqueda

  //useEffect para consultar API
  useEffect(()=> 
  {
     const consultarClima  = async () => 
     {
      if(consultar)
      {
        //console.log('Consultado a la API')
        //console.log(busqueda)
        //https://api.openweathermap.org/data/2.5/weather?q={city name},{state code},{country code}&appid={API key}
        const apiKey = '56bfdde729138c6e9d133e7a79c1bba7'
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${apiKey}`
        //console.log(url)
        try  //se coloca un tryCatch en dadoo caso que no se encuentre alguno de los valores
        {
          const respuesta = await fetch(url); //toma la url y busca si existe esos datos
          //al no ser correcto algunos de los datos ya que se intentan convertir a JSON mandara a el catch del error
          const resultadoAxios = await respuesta.json(); 
          guardarResultado(resultadoAxios)
          guardarConsultar(false) //volvemos a setear el valor en falso para volver a consultar otra cosa despues
          //console.log(resultado);

          //Modifica los colores de fondo basado en la temperatura
          const kelvin = 273.15
          const {main} =resultado  //desestructuramos el resulta don la variable main
          const actual = main.temp - kelvin

          if(actual < 10)  //temperatura baja
          {
             setBGColor('rgb(105,108,149)')
          }
          else if(actual >= 10 && actual < 25) //temperatura media
          {
            setBGColor('rgb(71,149,212)')
          }
          else //mayor a 25
          {
            setBGColor('rgb(178,28,61)')
          }

        } 
        catch (error) 
        {
           mostrarAlerta
        }
        //const resultado =  await axios.get(url)
        //console.log(resultado)
      }
     }

     consultarClima()
    
  },[consultar]) //cuando se vuelva true, consultara

  const mostrarAlerta = () => 
  {
     Alert.alert(
       'Error',
       'No hay resultados, intenta con otros datos',
       [{text:'OK'}]
     )
  }
  
  const ocultarTeclado = () => 
  {
    Keyboard.dismiss() //funcion para que el teclado se cierre si picamos en otra parte que no sean los inputs
  }

  const bgColorApp = {
    backgroundColor:bgColor
  }

  return (
    <TouchableWithoutFeedback onPress={() => ocultarTeclado()}>
      <View  style = {[styles.app, bgColorApp]}> 
        <View style = {styles.contenido}>
           <Clima resultado={resultado} />
           <Formulario busqueda={busqueda} guardarBusqueda={guardarBusqueda} guardarConsultar={guardarConsultar} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  app:{
    flex:1,
    justifyContent: 'center',
  },
  contenido:{
    marginHorizontal:'2.5%'
  }
});

export default App;
