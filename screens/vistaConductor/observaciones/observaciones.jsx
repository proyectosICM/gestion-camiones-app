import React, { useEffect, useState } from "react";
import { ImageBackground, ScrollView, Text, View } from "react-native";
import { fondoGeneral } from "../../../styles/paletaColores";
import { generalStyles } from "../../../styles/generalStyles";
import { ObservacionesItem } from "./observacionesItem";
import { obsxRgsURL } from "../../../api/apiurls";
import { useRoute } from "@react-navigation/native";
import { useListarElementos } from "../../../hooks/useListUtils";

export function Observaciones() {
  const [obs, setObs] = useState();
  const route = useRoute();
  const rgs = route.params.rgs;

  const ListarObservaciones = useListarElementos(`${obsxRgsURL}/${rgs}`, setObs);

  useEffect(() => {
    ListarObservaciones();
  }, [ListarObservaciones]);

  return (
    <ImageBackground source={fondoGeneral} style={generalStyles.backgroundImage}>
      <View style={generalStyles.container}>
        <ScrollView>
          <Text style={generalStyles.tittleText}>Observaciones</Text>
          {obs && obs.reverse().map((dato) => <ObservacionesItem key={dato.id} name={dato.nameObs} />)}
        </ScrollView>
      </View>
    </ImageBackground>
  );
}
