import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, Button } from "react-native-paper";
import { Image, View } from "react-native";
import Title from "../../components/Title/Title";
import {
  checkVerificationRequest,
  verifyRegisterationRequest,
} from "../../actions/app";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomInput from "../../components/CustomInput/CustomInput";
import { useFormik } from "formik";
import * as yup from "yup";
import { AsyncStorage } from "react-native";
import { COLORS } from "../../constants/cnstants";

export default function Home({ navigation, route }) {
  // const { userInfo } = route.params;

  const dispatch = useDispatch();
  const [userId, setUserId] = useState("65c7ee78e200855a0beb0748");
  //register req
  const verifyRegisterationResponse = useSelector((state) => {
    const { verifyRegisteration, loading, error } =
      state.verifyRegisterationReducer;
    return { verifyRegisteration, loading, error };
  });
  // console.log(
  //   "pppppppppppppppppp:",
  //   verifyRegisterationResponse.verifyRegisteration,
  //   "Loading:",
  //   verifyRegisterationResponse.loading,
  //   "Error:",
  //   verifyRegisterationResponse.error
  // );
  console.log("iddddddd", userId);
  const formik = useFormik({
    initialValues: {
      phoneNumber: "",
    },
    onSubmit: (values) => {
      dispatch(verifyRegisterationRequest({ body: values }));
      console.log("formik;", formik.values);
    },
    validationSchema: yup.object({
      otp: yup.number().required(" مطلوب"),
      // .min(4, "الرمز 4 ارقام")
      // .max(4, "الرمز 4 ارقام")
      phoneNumber: yup
        .string()
        .required(" مطلوب")
        .matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/),
    }),
  });

  useEffect(() => {
    if (verifyRegisterationResponse.verifyRegisteration.status == 200) {
      console.log(
        "verification done ",
        "id ",
        verifyRegisterationResponse.verifyRegisteration.id
      );
      setUserId(verifyRegisterationResponse.verifyRegisteration.id);

      //   const userId = verifyRegisterationResponse.verifyRegisteration.id;
      // AsyncStorage.setItem("userId", userId)
      // .then(() => {
      //   console.log("User ID saved successfully!");
      // })
      // .catch((error) => {
      //   console.log("Error saving user ID:", error);
      // });
    }
  }, [verifyRegisterationResponse]);

 
  //checkVerification req
  const checkVerificationResponse = useSelector((state) => {
    const { checkVerification, loading, error } =
      state.checkVerificationReducer;
    return { checkVerification, loading, error };
  });

  console.log(
    "??",
    checkVerificationResponse,
    "checkVerificationRequest",
    checkVerificationResponse.checkVerification,
    "///",
    checkVerificationResponse.error
  );

  useEffect(() => {
    dispatch(checkVerificationRequest({ id: userId }));
  }, []);

  useEffect(() => {
    if (checkVerificationResponse.checkVerification.completeAccountToken) {
      console.log(
        "verification done ",
        "token ",
        checkVerificationResponse.checkVerification.completeAccountToken
      );
      navigation.navigate("Password",
       {
        token: checkVerificationResponse.checkVerification.completeAccountToken,
        
      });
    }
  }, [checkVerificationResponse]);

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white", textAlign: "right" }}
    >
      {/* navbar */}
      <View
        style={{
          justifyContent: "space-between",
          flexDirection: "row-reverse",
        }}
      >
        <Title title={"اهلًا بك في كانيولا"} />

        <View>
          <Image
            source={require("../../../assets/bell.png")}
            style={{
              //width: "100%",
              width: "24px",
              height: "24px",
            }}
          />
        </View>
      </View>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          alignSelf: "stretch",
          // border: "1px solid black",
        }}
      >
        {userId == null && (
          <View>
            <Text>نرجو أدخال البيانات المرسلة اليك لتأكيد التسجيل</Text>

            <form onSubmit={formik.handleSubmit}>
              <CustomInput
                label="رقم الموبايل"
                type="string"
                name={"phoneNumber"}
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                errorName={formik.errors.phoneNumber}
                formikTouchedCondition={formik.touched.phoneNumber}
                formikErrorCondition={formik.errors.phoneNumber}
              />
              <CustomInput
                label="otp رمز"
                type="number"
                name={"otp"}
                value={formik.values.otp}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                errorName={formik.errors.otp}
                formikTouchedCondition={formik.touched.otp}
                formikErrorCondition={formik.errors.otp}
              />
              {verifyRegisterationResponse?.error && (
                <div style={{ color: "red", fontSize: "10px" }}>
                  حدث خطأ برجاء اعادة الارسال
                </div>
              )}
              <button
                // disabled={!formik.isValid}
                type="submit"
                style={{
                  display: "block",
                  backgroundColor: COLORS.primary,
                  height: "37px",
                  width: "97%",
                  borderRadius: "8px",
                  padding: "8px 81px 8px 81px",
                  color: "white",
                  border: "0px",
                }}
              >
                {verifyRegisterationResponse.loading ? ".... تحميل" : "ارسال"}
              </button>
            </form>
          </View>
        )}

        {userId != null && userId && (
          <>
            <Image
              source={require("../../../assets/svgexport-7 (33) 1.png")}
              style={{
                width: "96px",
                height: "96px",
              }}
            />
            <Text
              style={{
                color: "#B3B2B2",
                fontFamily: "Almarai",
                marginTop: 20,
                lineHeight: "17.86px",
                fontsize: "16px",
                width: "90%",
                textAlign: "center",
              }}
            >
              عند الموافقه على طلبك سييم التواصل معك وبعدها تسطيع ممارسة عملك
              كطبيب علي كاينولا
            </Text>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}
