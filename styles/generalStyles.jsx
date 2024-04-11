import { StyleSheet } from "react-native";
import { BotonColorOscuro, ColorTexto, ColorTextoBoton, ColotTexto } from "./paletaColores";
const fondo1 = require("./fondo.jpg");

export const generalStyles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  flatListContent: {
    justifyContent: 'space-between',
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10
  },
  backButton: {
    backgroundColor: "#ccc",
    color: ColorTexto,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  tittleText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: ColorTexto,
    textAlign: "center"
  },
  marcaText: {
    fontSize: 18,
    marginBottom: 10,
  },
  modeloText: {
    fontSize: 18,
    marginBottom: 20,
  },
  styleButton: {
    backgroundColor: BotonColorOscuro,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    margin: 2
  },
  buttonPalette: {
    backgroundColor: BotonColorOscuro,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    margin: 2
  },
  textoButton: {
    color: ColorTextoBoton,
    fontSize: 18,
    fontWeight: "bold",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
});
