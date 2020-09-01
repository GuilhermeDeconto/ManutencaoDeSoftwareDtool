import React, { ReactElement, useRef, useState } from "react";
import { RNCamera } from "react-native-camera";
import { Dimensions, View, Text, StyleSheet } from "react-native";
import colors from "../utils/colors";
import sizes from "../utils/sizes";

export interface ContainerProps {
  children?: ReactElement[];
  onChange: (barcode: any) => void;
}

const BarcodeCamera: React.FC<ContainerProps> = ({ children, onChange }) => {
  let refCamera = useRef(null);
  const [highlight, setHighlight] = useState(false);

  const handleBarcodeDetected = (barcodes: any) => {
    const code = barcodes[0].data;
    setHighlight(false);
    onChange(code);
  };

  return (
    <View>
      <RNCamera
        ref={refCamera}
        androidCameraPermissionOptions={{
          title: "Permissão para usar a câmera",
          message: "Precisamos de permissão para escanear os códigos",
          buttonPositive: "OK",
          buttonNegative: "CANCELAR",
        }}
        autoFocus="on"
        autoFocusPointOfInterest={{ x: 0.5, y: 0.5 }}
        captureAudio={false}
        onBarCodeRead={() => setHighlight(true)}
        onGoogleVisionBarcodesDetected={({ barcodes }) =>
          handleBarcodeDetected(barcodes)
        }
        style={{
          height: Dimensions.get("window").height,
          width: Dimensions.get("window").width,
        }}
        type="back"
      >
        <>
          <View style={styles.scanMessageView}>
            <Text style={styles.scanMessage}>
              Aponte a câmera para o código de barras do prontuário
            </Text>
          </View>
          <View style={styles.scanBoxContainer}>
            <View
              style={[
                styles.scanBox,
                highlight ? styles.scanBoxHighlighted : styles.scanBoxDefault,
              ]}
            />
          </View>
          {children}
          {children}
        </>
      </RNCamera>
    </View>
  );
};

const styles = StyleSheet.create({
  scanBox: {
    alignSelf: "center",
    borderRadius: 5,
    borderStyle: "dashed",
    borderWidth: 3,
    height: 100,
    marginTop: "-10%",
    width: "80%",
  },
  scanBoxContainer: { flex: 1, justifyContent: "center" },
  scanBoxDefault: {
    borderColor: colors.basic.background,
  },
  scanBoxHighlighted: {
    borderColor: colors.theme.primary,
  },
  scanMessage: {
    alignItems: "center",
    color: colors.text.navigation,
    fontSize: sizes.headline.h6,
    textAlign: "center",
  },
  scanMessageView: {
    alignItems: "center",
    backgroundColor: colors.basic.textBackground,
    flex: 1,
    opacity: 0.5,
    position: "absolute",
  },
});

export default BarcodeCamera;
