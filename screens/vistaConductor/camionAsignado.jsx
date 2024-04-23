import React, { useEffect, useState } from "react";
import { View, Text, ImageBackground } from "react-native";
import { fondoGeneral } from "../../styles/paletaColores";
import { generalStyles } from "../../styles/generalStyles";
import { BotonesCamionAsignado } from "./botonesCamionAsignado";
import { rgsByUserAndStateURL, usuarioURL } from "../../api/apiurls";
import { useAutoFetchAsyncStorage, useGetAsyncStorage } from "../../hooks/asyncStorageUtils";
import { useListarElementos } from "../../hooks/useListUtils";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function CamionAsignado() {
  const [usuario, setUsuario] = useState();
  const [rgsData, setRgsData] = useState();
  const [tipoVehiculo, setTipoVehiculo] = useState(null);

  useGetAsyncStorage("usuario", setUsuario);

  const ListarInfoRGS = useListarElementos(`${rgsByUserAndStateURL}?usuarioId=${usuario}&enUso=1`, setRgsData);

  useEffect(() => {
    ListarInfoRGS();
  }, [ListarInfoRGS]);

  useAutoFetchAsyncStorage("tipoVehiculo", setTipoVehiculo);

  return (
    <ImageBackground source={fondoGeneral} style={generalStyles.backgroundImage}>
      <View style={generalStyles.container}>
        {tipoVehiculo === "camion" ? (
          <>
            <Text style={generalStyles.tittleText}>Placa Camion: {rgsData && rgsData.checkListCamionModel.camionesModel.placa}</Text>
            <Text style={generalStyles.tittleText}>Placa Tracto: {rgsData && rgsData.checkListCarretaModel.camionesModel.placa}</Text>
            {rgsData &&  (<BotonesCamionAsignado datos={rgsData} clcam = {rgsData.checkListCamionModel.id} />)}
          </>
        ) : tipoVehiculo === "carreta" ? (
          <>
            <Text style={generalStyles.tittleText}>Por favor termine de realizar el checkList</Text>
          </>
        ) : (
          <>
            <Text style={generalStyles.tittleText}>No hay Camion Asignado</Text>
            <Text style={[generalStyles.tittleText, { textAlign: "center" }]}>Por favor escanee el QR de un camion libre</Text>
          </>
        )}
      </View>
    </ImageBackground>
  );
}
