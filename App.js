import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import AppRouter from "./source";
import "react-native-gesture-handler";
import ReactNative from "react-native";
import { I18nManager } from "react-native";
import * as RNLocalize from "react-native-localize";

// Initialize RTL support
const isRTL = RNLocalize.isRTL;
I18nManager.forceRTL(isRTL);

export default function App() {
  return (
    <View style={styles.container}>
      <AppRouter />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: "right",
  },
});
