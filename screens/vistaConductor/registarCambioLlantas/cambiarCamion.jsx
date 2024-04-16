import React, { useState } from "react";
import { TextInput, View } from "react-native";
import { StyleSheet } from "react-native";
import { Text } from "react-native";
import { Button } from "react-native-elements";
import { useRoute } from "@react-navigation/native";




import { BotonLlantas, BotonLlantasActivo } from "../../../styles/paletaColores";
import { useAgregarElemento } from "../../../hooks/useAgregarElemento";
import { generalStyles } from "../../../styles/generalStyles";
import { cambioLlantasURL, obsURL, obsxRgsURL } from './../../../api/apiurls';

export function CambiarCamion() { 
  const route = useRoute();
  const datos = route.params.datos;
  const rows = [[1, , 2], [[3], 4, [5], 6], [[7], 8, [9], 10], ["RP"]];

  const [texto, setTexto] = useState("");
  const [llantaSelect, setLlantaSelect] = useState("");
  const [cambios, setCambios] = useState(
    rows.map((row) => row.map(() => false)) // Inicializamos todos los botones como no seleccionados
  );

  const handleCambiar = (rowIndex, buttonIndex) => {
    const newCambios = cambios.map((row, rIndex) =>
      row.map((button, bIndex) => rIndex === rowIndex && bIndex === buttonIndex)
    );
    setCambios(newCambios);
    setLlantaSelect(String(rows[rowIndex][buttonIndex])); // Convertimos el valor a cadena
  };

  const handleEnviar = async () => {

    console.log("Id de RGS", datos.id);
    const request = {
      camionesModel: {
        id: datos.checkListCamionModel.camionesModel.id,
      },
      nroLlanta: llantaSelect,
      observacion: texto,
      rgsModel: {
        id: datos.id,
      },
    };

    const requestObs = {
      nameObs: `Cambio de llanta registrado: ${texto} Llanta ${llantaSelect} Camion `,
      rgsModel: {
          id: datos.id,
      }
    }

    try {
      await useAgregarElemento(cambioLlantasURL, request);
      setCambios(
        rows.map((row) => row.map(() => false)) // Reset all buttons to not selected
      );
      setTexto("")
      await useAgregarElemento(obsURL, requestObs);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Text style={generalStyles.tittleText}>Camion</Text>
      {cambios.some((row) => row.includes(true)) && (
        <>
          <Text style={[generalStyles.tittleText, { margin: 10 }]}>
            Registro de cambio {llantaSelect}
          </Text>
          <TextInput
            style={[localStyles.input,{backgroundColor: '#EBEFF2'}]} // Estilos para el TextInput
            placeholder="Observacion"
            value={texto}
            onChangeText={(text) => setTexto(text)} // Actualiza el valor de inputValue
          />
          <Button
            title={"Enviar"}
            onPress={() => handleEnviar()}
            buttonStyle={[generalStyles.styleButton, { marginVertical: 15 }]}
          />
        </>
      )}
      {rows.map((row, rowIndex) => (
        <View key={rowIndex} style={localStyles.buttonRow}>
          {row.map((number, buttonIndex) => (
            <React.Fragment key={buttonIndex}>
              {Array.isArray(number) ? (
                <>
                  {number.map((nestedNumber, nestedIndex) => (
                    <React.Fragment key={nestedIndex}>
                      <Button
                        title={String(nestedNumber)}
                        buttonStyle={[
                          localStyles.button,
                          cambios[rowIndex][buttonIndex] &&
                            localStyles.buttonSelected,
                        ]}
                        onPress={() => handleCambiar(rowIndex, buttonIndex)}
                      />
                      {nestedIndex < number.length - 1 && (
                        <View style={localStyles.buttonSeparator} />
                      )}
                    </React.Fragment>
                  ))}
                </>
              ) : (
                <>
                  <Button
                    title={String(number)}
                    buttonStyle={[
                      localStyles.button,
                      cambios[rowIndex][buttonIndex] &&
                        localStyles.buttonSelected,
                    ]}
                    onPress={() => handleCambiar(rowIndex, buttonIndex)}
                  />
                  {buttonIndex < row.length - 1 && (
                    <View style={localStyles.buttonSeparator} />
                  )}
                </>
              )}
            </React.Fragment>
          ))}
        </View>
      ))}
    </>
  );
}

const localStyles = StyleSheet.create({
  buttonRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  }, 
  button: {
    backgroundColor: BotonLlantas,
    borderRadius: 80,
    padding: 10,
    width: 50,
  },
  buttonSelected: {
    backgroundColor: BotonLlantasActivo, // Cambia el color a rojo cuando está seleccionado
  },
  buttonSeparator: {
    width: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
  },
});
