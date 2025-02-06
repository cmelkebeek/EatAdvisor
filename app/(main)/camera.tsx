import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert, Button } from "react-native";
import { Camera, CameraView } from "expo-camera";
import { useRouter } from "expo-router";

const appId = process.env.EXPO_PUBLIC_EDAMAM_API_ID!;
const appKey = process.env.EXPO_PUBLIC_EDAMAM_API_KEY!;

const CameraScreen = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = async ({
    type,
    data,
  }: {
    type: string;
    data: string;
  }) => {
    setScanned(true);

    const response = await fetch(
      `https://api.edamam.com/api/food-database/v2/parser?upc=${data}&app_id=${appId}&app_key=${appKey}`
    );

    const result = await response.json();

    if (result.hints.length > 0) {
      const food = result.hints[0];

      router.push({
        pathname: "/add",
        params: { scannedFood: JSON.stringify(food) },
      });
    } else {
      Alert.alert("Erreur", "Aucun aliment trouvé pour ce code-barres.");
      setScanned(false);
    }
  };

  if (hasPermission === null) {
    return <Text>Demande de permission pour accéder à la caméra</Text>;
  }
  if (hasPermission === false) {
    return <Text>Accès à la caméra refusé</Text>;
  }

  return (
    <View style={styles.container}>
      <CameraView
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
        barcodeScannerSettings={{
          barcodeTypes: [
            "ean13",
            "ean8",
            "upc_a",
            "upc_e",
            "code39",
            "code93",
            "code128",
            "qr",
            "pdf417",
            "aztec",
            "datamatrix",
            "itf14",
            "codabar",
          ],
        }}
      />
      {scanned && (
        <Button title="Scanner à nouveau" onPress={() => setScanned(false)} />
      )}
    </View>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});