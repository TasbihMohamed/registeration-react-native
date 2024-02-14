import React from "react";
import { COLORS } from "../../constants/cnstants";
import { View } from "react-native-web";

export default function CustomInput({
  label,
  type,
  icon,
  name,
  value,
  onChange,
  onBlur,
  errorName,
  formikTouchedCondition,
  formikErrorCondition,
}) {
  return (
    <View style={{ marginBottom: 10, marginTop: 10, textAlign: "right" }}>
      <label
        htmlFor={name}
        style={{
          display: "block",
          color: "#353535",
          fontSize: "20px",
          marginBottom: "5px",
        }}
      >
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        style={{
          backgroundColor: COLORS.bg,
          border: "0px",
          width: "98%",
          borderRadius: "8px",
          height: "38px",
          paddingRight: 10,
          paddingLeft: 10,
        }}
      />
      {formikTouchedCondition && formikErrorCondition && (
        <div style={{ color: "red", marginTop: "5px", marginBottom: "5px" }}>
          {errorName}
        </div>
      )}
    </View>
  );
}
