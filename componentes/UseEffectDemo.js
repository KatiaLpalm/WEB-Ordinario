import React, {use, useEffect} from "react";
import { StyleSheet, Text } from "react-native";

export default ()=>{
    useEffect(()=>{
        setTimeout(()=>{
            setLoading(false)
        },2000)
    
    })
    return(
        <Text style= {styles.texto}>{loading ? "cargando app.. ": "listo!!" }
            </Text>
    )
}

const styles= StyleSheet.create({
    texto:{
        fontSize:48,
    }

})