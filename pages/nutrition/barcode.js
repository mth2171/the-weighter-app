import { BarCodeScanner } from "expo-barcode-scanner";
import { Camera } from "expo-camera";
import React, { useEffect, useState } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";

const NutritionBarcode = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [barcode, setBarcode] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const getBarcodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };
    getBarcodeScannerPermissions();
  }, []);

  const handlerBarcodeScanned = ({ type, data }) => {
    console.log(data, scanned);
    setScanned(true);
    setBarcode(data);
  };

  const onClickSubmit = () => {};

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }

  if (hasPermission === false) {
    return <Text>No access to camera.</Text>;
  }
  return (
    <View className="flex-1 items-center">
      <BarCodeScanner onBarCodeScanned={scanned ? undefined : handlerBarcodeScanned} className="flex top-0 w-full h-1/2" type={Camera.Constants.Type.back} />
      {scanned && (
        <View className="flex w-full mt-10 justify-center items-center">
          <Text className="text-xl">{barcode}</Text>
          <View className="flex w-full justify-center items-center flex-row">
            <TouchableOpacity className="flex w-1/3 mt-5 justify-center items-center bg-button p-3 rounded-xl mx-2">
              <Text className="text-xl text-white">등록하기</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex w-1/3 mt-5 justify-center items-center bg-button p-3 rounded-xl mx-2" onPress={() => setScanned(false)}>
              <Text className="text-xl text-white">다시찍기</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      <Modal visible={open} className="flex-1"></Modal>
    </View>
  );
};

export default NutritionBarcode;
