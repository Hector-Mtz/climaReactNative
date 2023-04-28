import React, {useState} from 'react'
import { 
  StyleSheet, 
  Text, 
  TextInput, 
  View, 
  TouchableWithoutFeedback, //son este componente no pueden funcionar las animaciones de animated
  //TouchableWithoutFeedback tiene 2 metodos
  //onPressIn y OnPressOut uno es cuando presionas y otro es cuando sueltas el boton
  //
  Animated, //componente para generar animaciones se usan con states
  Alert
} from 'react-native'
import {Picker} from '@react-native-picker/picker'
const Formulario = ({
  busqueda,
  guardarBusqueda,
  guardarConsultar
}) => {

  const {pais, ciudad} = busqueda //extaemos la ciudad y pais del state de busqueda del app.txs

  //Funcion para consultar
  const consultarClima = () => 
    {
      if(pais.trim() === '' || ciudad.trim() === '' ) //tomamos pais y quitamos los espacios vacios y comprobamos si es un string vacio
      {
        mostrarAlerta()
        return  //si entra aqui rompe el acceso a la consulta a la API
      }
    
      //si pasa la validacion consultamos
      guardarConsultar(true) //sino consulta a la API

    }

  const mostrarAlerta = () => 
  {
     Alert.alert(
       'Error',
       'Todos los campos son obligatorios',
       [{text:'OK'}]
     )
  }
    

  //las animaciones no necesitan funciones con la api de animated funcionan
  const [animacionBoton] = useState(new Animated.Value(1));  //a Animated se le pasa un valor inicial
  //el 1 indica el tamaño o la escala y en este caso el boton empieza con un tamaño normal

  //Estilos de animacion ya que la animacion por si sola no comenzara, debe tener configuracion
  const estilosAnimacion = { //le pasamos un objeto de configuracion con estilos similares a CSS
    transform:[{
      scale: animacionBoton //el scale tendra una transformacion  en base al state donde comenzara en 1 y despues de .9
    }]
  }

  const animacionEntrada = () => 
  {
    //console.log('Entrada..')
    //Metodos de animated para animar el boton
     Animated.spring(animacionBoton,{
      //objeto de configuracion de la animacion
       toValue:.75, //va a ir de 1 a .9 en escala, es decir se va a hacer mas pequeño pero con animacion
    }).start() //animacion "rapida" y se le pasa el parametro que queremos animar con start se ejecuta la animacion
  }

  const animacionSalida = () => 
  {
    Animated.spring(animacionBoton,{
      //objeto de configuracion de la animacion
       toValue:1, //volvemos a regresar el valor a 1 para que vuelva a cambiar el tamaño
       friction: 4, //es para controlar el bote que tendra el boton
       tension:30 //es mientras  menor sea el numero, mas suave sera el movimiento
    }).start() 
  }

  /*
     Van en el boton de touchable hightñifght
            onPressIn={()=> animacionEntrada() }
            onPressOut={()=> animacionSalida()}  
  */ 

  return (
    <>
      <View >
        <View>
            <TextInput 
              value={ciudad} 
              onChangeText={
                //tomamos una copia del state y le pasamos la nueva ciudad
                ciudad => guardarBusqueda({...busqueda, ciudad}) 
              } 
              style = {styles.input} 
              placeholder='Ciudad' 
              placeholderTextColor='#666'/>
        </View>
        <View>
          <Picker 
            selectedValue={pais}  
            style={styles.picker} 
            itemStyle ={{height:120, backgroundColor:'white'}}
            onValueChange={pais => guardarBusqueda({...busqueda, pais})}
            >
            <Picker.Item color='black' label='--Seleccione Un País--' value='' />
            <Picker.Item color='black' label='Estados Unidos' value='US' />
            <Picker.Item color='black' label='México' value='MX' />
            <Picker.Item color='black' label='Argentina' value='AR' />
            <Picker.Item color='black' label='Colombia' value='CO' />
            <Picker.Item color='black' label='Costa Rica' value='CR' />
            <Picker.Item color='black' label='España' value='ES' />
            <Picker.Item color='black' label='Perú' value='PE' />
          </Picker>
        </View>
        <TouchableWithoutFeedback

            onPress={() => consultarClima()}
        >
           <Animated.View style={[styles.btnBuscar, estilosAnimacion]}>
             <Text style={styles.textoBuscar}>Buscar Clima</Text>
           </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  input:{
   color:'black',
   padding:10,
   height:50,
   backgroundColor:'white',
   fontSize:20,
   marginBottom:20,
   textAlign:'center'
  },
  picker:
  {
    backgroundColor:'white'
  },
  btnBuscar:{
    marginTop:50,
    backgroundColor:'black',
    padding:10,
    justifyContent: 'center',
  },
  textoBuscar:{
   color:'white',
   fontWeight:'bold',
   textTransform:'uppercase',
   textAlign:'center',
   fontSize:18
  }
})
export default Formulario