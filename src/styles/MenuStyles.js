import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  touchable: {
    display: "flex",
    width: "50%",
    height: "10%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
  icon: {
    display: "flex",
    fontSize: 30,
    marginRight: 20,
  },
  text: {
    display: "flex",
    fontSize: 20,
  },
});

export default styles;
