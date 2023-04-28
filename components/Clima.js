import React from 'react'
import { StyleSheet, View, Image, Text} from 'react-native'

const Clima = (
  {
    resultado
  }
) => {

  //Extraemos 2 valores del objeto que traemos de la peticion
  const {name, main } = resultado; //name es la ciudad que buscamos y el main es la parte de los climas

  if(!name) return null;  //sino existe el nombre extraido del objeto, retornara null y no dara paso 
                          //a la muestra del componente

  //Grados Kelvin
  const kelvin = 273.15                      

  //console.log(resultado)

  return (
   <View style={styles.clima}>
     <Text style = {[styles.texto, styles.actual]}>
       {parseInt(main.temp - kelvin)}
       <Text style={styles.temperatura}>
          &#x2103; 
       </Text>
       <Image style= {{width:66, height:66}} source={{uri:`https:/openweathermap.org/img/w/${resultado.weather[0].icon}.png` /*Con esto especificamos una ruta de internet*/}} />
     </Text>
     <View style={styles.temperaturas}> 
       <Text style={styles.texto}>
        Min {' '}
           <Text style={styles.temperatura}>
               {parseInt(main.temp_min - kelvin)}  &#x2103; 
           </Text>
       </Text>
       <Text style={styles.texto}>
         Max {' '}
           <Text style={styles.temperatura}>
               {parseInt(main.temp_max - kelvin)}  &#x2103; 
           </Text>
       </Text>
     </View>
   </View>
  )
}

const styles = StyleSheet.create(
  {
    clima:{
      marginBottom:20
    },
    texto:{
      color:'white',
      fontSize:20,
      textAlign:'center',
      marginRight:20
    },
    actual:
    {
      fontSize:80,
      marginRight:0,
      fontWeight:'bold'
    },
    temperatura:
    {
       fontSize:24,
       fontWeight:'bold'
    },
    temperaturas:
    {
       flexDirection:'row',
       justifyContent:'center'
    }
  }
)
export default Clima
