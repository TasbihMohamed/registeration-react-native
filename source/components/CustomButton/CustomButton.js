import React from "react";
import { Button, Text } from "react-native-paper";
import { COLORS } from "../../constants/cnstants";

export default function CustomButton({
  title,
  disabled,
  type,
  onPress,
  buttonStyle,
}) {
  console.log("ttttttt", disabled);
  return (
    <Button
      disabled={disabled}
      type={type}
      style={{
        backgroundColor: COLORS.primary,
        height: "37px",
        width: "97%",
        borderRadius: "8px",
        padding: "8px 81px 8px 81px",
        ...buttonStyle,
      }}
      onPress={onPress}
    >
      <Text style={{ color: "white", fontSize: "14px" }}>{title}</Text>
    </Button>
  );
}
