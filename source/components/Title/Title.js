import React from "react";
import { Text } from "react-native-paper";
import { COLORS } from "../../constants/cnstants";
export default function Title({ title }) {
  return (
    <Text
      style={{
        fontWeight: 700,
        fontSize: "20px",
        lineHeight: "22.32px",
        textAlign: "Right",
        color: COLORS.black,
        marginBottom: 20,
        paddingHorizontal: "10px",
      }}
    >
      {title}
    </Text>
  );
}
