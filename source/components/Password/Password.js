import { SafeAreaView } from "react-native-safe-area-context";
import Title from "../Title/Title";
import { useFormik } from "formik";
import * as yup from "yup";
import React, { useEffect, useState } from "react";
import { Field, Form, Formik, FormikProps } from "formik";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import CustomInput from "../CustomInput/CustomInput";
import { View, Text } from "react-native";
import CustomButton from "../CustomButton/CustomButton";
import { COLORS } from "../../constants/cnstants";
import { passwordRequest } from "../../actions/app";

export default function Password({ route, navigation }) {
  // console.log("Password route", route);
  // console.log("Password route", route.params.token);

  const [showPassword, setShowPassword] = useState(false);

  const passswordResponse = useSelector((state) => {
    const { password, loading, error } = state.passwordReducer;
    return { password, loading, error };
  });

  console.log(
    "??",
    passswordResponse,
    "passswordResponse",
    passswordResponse.password,
    "///",
    passswordResponse.error
  );

  const formik = useFormik({
    initialValues: {
      password: "",
      rePassword: "",
    },
    onSubmit: (values) => {
      console.log(
        "formik.values",
        formik.values.password,
        "token",
        route.params.token
      ); //{password: '123', rePassword: '123'}

      dispatch(
        passwordRequest({
          token: route.params.token,
          body: { password: formik.values.password },
        })
      );
    },
    validationSchema: yup.object({
      password: yup.string().required(" مطلوب"),
      rePassword: yup
        .string()
        .required(" مطلوب")
        .oneOf([yup.ref("password")], "الرقم السري غير متطابق"),
    }),
  });

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white", textAlign: "right" }}
    >
      <View
        style={{
          flex: 1,
        }}
      >
        <Title title=" إكمال إنشاء الحساب" />
        <form
          onSubmit={formik.handleSubmit}
          style={{
            flex: 1,
          }}
        >
          <View
            style={{
              padding: 20,
              height: "100%",

              flex: 1,
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "space-between",
            }}
          >
            <View>
              <CustomInput
                label=" الرقم السري"
                //   icon
                name="password"
                type={showPassword ? "text" : "password"}
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                formikTouchedCondition={formik.touched.password}
                formikErrorCondition={formik.errors.password}
                errorName={formik.errors.password}
              />
              <CustomInput
                label=" تأكيد الرقم السري "
                //   icon
                name="rePassword"
                type={showPassword ? "text" : "password"}
                value={formik.values.rePassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                formikTouchedCondition={formik.touched.rePassword}
                formikErrorCondition={formik.errors.rePassword}
                errorName={formik.errors.rePassword}
              />
            </View>

            <button
              style={{
                backgroundColor: COLORS.primary,
                height: "37px",
                width: "97%",
                borderRadius: "8px",
                padding: "8px 81px 8px 81px",
                color: "white",
                border: "0px",
              }}
              disabled={!formik.isValid}
              type="submit"
            >
              {passswordResponse.loading ? ".... تحميل" : "ارسال"}
            </button>
          </View>
        </form>
      </View>
    </SafeAreaView>
  );
}
