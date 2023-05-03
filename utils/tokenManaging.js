import AsyncStorage from "@react-native-async-storage/async-storage";

/* export const getToken = async () => {
  await Promise.all(() => {
    AsyncStorage.getItem("token").then((token) => {
      const tokenJson = JSON.parse(token);
      if (new Date(tokenJson.expiredAt) < new Date()) {
        AsyncStorage.removeItem("token");
        return "Token has not found";
      } else {
        return tokenJson.token;
      }
    });
  });
}; */

export const getToken = async () => {
  const token = await AsyncStorage.getItem("token");
  if (token != null) {
    const tokenJson = JSON.parse(token);
    if (new Date(tokenJson.expiredAt) < new Date()) {
      await AsyncStorage.removeItem("token");
      return { isLogin: false };
    } else {
      return { isLogin: true, token: tokenJson.token };
    }
  } else {
    return { isLogin: false };
  }
};

export const removeToken = async () => {
  await AsyncStorage.removeItem("token").then(() => {
    console.log("토큰 삭제 완료");
    return "토큰 삭제 완료";
  });
};
