import React, { useEffect, useState } from "react";
import { View, Text, ImageBackground } from "react-native";
import { fondoGeneral } from "../../styles/paletaColores";
import { generalStyles } from "../../styles/generalStyles";
import { BotonesCamionAsignado } from "./botonesCamionAsignado";
import { rgsByUserAndStateURL, usuarioURL } from "../../api/apiurls";
import { useGetAsyncStorage } from "../../hooks/asyncStorageUtils";
import { useListarElementos } from "../../hooks/useListUtils";

export function CamionAsignado() {
  const [usuario, setUsuario] = useState();
  const [rgsData, setRgsData] = useState();
  useGetAsyncStorage("usuario", setUsuario);

  const ListarInfoRGS = useListarElementos(`${rgsByUserAndStateURL}?usuarioId=${usuario}&enUso=1`, setRgsData);

  useEffect(() => {
    ListarInfoRGS();
  }, [ListarInfoRGS]);

  console.log(rgsData);
  console.log(`${rgsByUserAndStateURL}?usuarioId=${usuario}&enUso=1`);
  return (
    <ImageBackground source={fondoGeneral} style={generalStyles.backgroundImage}>
      <View style={generalStyles.container}>
        { rgsData ? (
          <>
            <Text style={generalStyles.tittleText}>
              Placa Camion: {rgsData && rgsData.camionesModel.placa}
            </Text>
            <Text style={generalStyles.tittleText}>
              Placa Tracto: {rgsData && rgsData.carretasModel.placa}
            </Text>
    {       <BotonesCamionAsignado datos={rgsData} /> }
          </>
        ) : (
          <>
            <Text style={generalStyles.tittleText}>No hay Camion Asignado</Text>
            <Text style={[generalStyles.tittleText, { textAlign: "center" }]}>Por favor escanee el QR de un camion libre</Text>
          </>
        ) }
      </View>
    </ImageBackground>
  );
}
