import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    display: "absolute",
    top: "25%",
    left: "15%",
    width: "70%",
    height: "50%",
    backgroundColor: "white",
    border: "1px solid black",
    borderRadius: 10,
  },
  text: {
    display: "flex",
    width: "90%",
    height: "15%",
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "#A5A5A5",
    borderBottomWidth: 1,
  },
  box: {
    display: "flex",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  authButton: {
    display: "flex",
    width: "30%",
    height: "100%",
    borderRadius: 10,
    backgroundColor: "#699DA1",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  closeButton: {
    display: "flex",
    width: "30%",
    height: "100%",
    borderRadius: 10,
    backgroundColor: "#A5A5A5",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  input: {
    display: "flex",
    height: 40,
    width: "80%",
    backgroundColor: "white",
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 10,
    padding: 10,
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowColor: "#d3d3d3",
    shadowOpacity: 1,
  },
});

export default styles;
