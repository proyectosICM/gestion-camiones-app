import React from "react";
import { ScrollView, View, Text } from "react-native";
import { useRoute } from "@react-navigation/native";
import { Card, Icon } from "react-native-elements";
import { generalStyles } from '../../styles/generalStyles';

export function VerDatosCL() {
  const route = useRoute();
  const tableD = route.params.tablesD;
  const datos = route.params.datos; 
  
  return (
    <ScrollView>
      {datos ? (
        tableD.map((table, index) => (
          <View key={index} style={{ alignItems: "center" }}>
            <Card>
              <Text style={generalStyles.tittleText}>{table.titulo}</Text>
              <View style={{ alignItems: "center" }}>
                {table.datos &&
                  table.datos.map((dato, datoIndex) => (
                    <View key={datoIndex}>
                      <Text>
                        {dato.nombre}
                        {datos[dato.atributo] ? (
                          <Text style={{ color: "green" }}>
                            {" "}
                            Buen estado <Icon name="check" size={20} color="green" />
                          </Text>
                        ) : (
                          <Text style={{ color: "red" }}>
                            {" "}
                            Mal estado <Icon name="close" size={20} color="red" />
                          </Text>
                        )}
                      </Text>
                    </View>
                  ))}
              </View>
            </Card>
          </View>
        ))
      ) : (
        <View style={styles.container}>
          <Text style={styles.tittleText}>No hay datos registrados</Text>
        </View>
      )}
    </ScrollView>
  );
}
