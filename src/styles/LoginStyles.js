import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#F5F5F5",
    alignItems: "center",
  },
  icon: {
    display: "flex",
    fontSize: 150,
    color: "#acacac",
    marginTop: 30,
  },
  loginFont: {
    display: "flex",
    fontSize: 30,
    marginBottom: 70,
  },
  input: {
    display: "flex",
    height: 40,
    width: "80%",
    backgroundColor: "white",
    marginTop: 15,
    borderRadius: 10,
    padding: 10,
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowColor: "#d3d3d3",
    shadowOpacity: 1,
  },
  text: {
    display: "flex",
    width: "80%",
    alignItems: "flex-end",
    marginTop: 15,
  },
  button: {
    display: "flex",
    width: 100,
    height: 40,
    justifyContent: "center",
    backgroundColor: "#699DA1",
    alignItems: "center",
    borderRadius: 12,
    marginTop: 10,
  },
});

export default styles;
