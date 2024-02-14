import { useFormik } from "formik";
import * as yup from "yup";
import React, { useEffect, useState } from "react";
import { Modal, Portal, Text, Button, PaperProvider } from "react-native-paper";
import { Image } from "react-native";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  getCities,
  getGovernorates,
  getSpecializations,
  postJoinRequest,
} from "../../actions/app";
import Title from "../../components/Title/Title";
import ImagePickerButton from "../../components/ImagePickerButton/ImagePickerButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import { COLORS } from "../../constants/cnstants";
import CustomButton from "../../components/CustomButton/CustomButton";
import { TouchableOpacity, View } from "react-native-web";
import CustomInput from "../../components/CustomInput/CustomInput";

const Register = ({ navigation }) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
    background: "white",
    borderRadius: "8px",
  };

  //specializations data
  const specializations = useSelector(
    (state) => state.specializationsReducer.specializations
  );
  let specializationsArray = specializations?.specializations;

  useEffect(async () => {
    dispatch(getSpecializations());
  }, []);

  //governorates data
  const governorates = useSelector(
    (state) => state.governoratesReducer.governorates
  );

  useEffect(async () => {
    dispatch(getGovernorates());
  }, []);

  //register req
  const joinRequestResponse = useSelector((state) => {
    const { joinRequest, loading, error } = state.joinRequestReducer;
    return { joinRequest, loading, error };
  });

  useEffect(() => {
    if (joinRequestResponse.joinRequest.status == 200) {
      //   console.log("open popup");
      showModal();
    }
  }, [joinRequestResponse]);

  const formik = useFormik({
    initialValues: {
      name: "",
      image:
        "https://cannula-frontend-task.s3.eu-west-1.wasabisys.com/profiles/1707304577124_image.png",
      specialization: "",
      governorate: "",
      city: "",
      address: "",
      syndicateId:
        "https://cannula-frontend-task.s3.eu-west-1.wasabisys.com/syndicateIds/1707304915483_image.png",
      nationalId:
        "https://cannula-frontend-task.s3.eu-west-1.wasabisys.com/nationalIds/1707304739773_image.png",
      certificate:
        "https://cannula-frontend-task.s3.eu-west-1.wasabisys.com/certificates/1707304849320_image.png",
      phoneNumber: "",
      email: "",
      inClinic: false,
      atHome: false,
      pushToken: "catonkeyboard",
    },
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 4));
      dispatch(postJoinRequest({ body: values }));
    },
    validationSchema: yup.object({
      email: yup.string().email("غير صحيح").required("مطلوب"),
      name: yup.string().required(" مطلوب"),
      atHome: yup.boolean(),
      inClinic: yup.boolean().oneOf([true], "مطلوب"),
      specialization: yup.string().required(" مطلوب"),
      governorate: yup.string().required(" مطلوب"),
      city: yup.string().required(" مطلوب"),
      address: yup.string().required(" مطلوب"),
      // syndicateId: yup.string().required(" مطلوب"),
      // nationalId: yup.string().required(" مطلوب"),
      phoneNumber: yup
        .string()
        .required(" مطلوب")
        .matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/),
      // image: yup.string(),
      // certificate: yup.string().required(" مطلوب"),
    }),
  });

  //cties
  const [selectedGovernorate, setSelectedGovernorate] = useState("");
  const cities = useSelector((state) => state.citiesReducer.cities);

  console.log("formik====", formik.values);
  useEffect(async () => {
    if (formik.values.governorate) {
      setSelectedGovernorate(formik.values.governorate);
      dispatch(getCities({ iso2: formik.values.governorate }));
    }
  }, [formik.values.governorate, selectedGovernorate]);

  return (
    <ScrollView style={{ paddingVertical: "30px", paddingHorizontal: "10px" }}>
      <SafeAreaView>
        <PaperProvider style={{ background: "white" }}>
          {/* modal */}
          {/* .r-backgroundColor-1niwhzg {
    background-color: white;
} */}
          <Portal style={{ background: "white" }}>
            <Modal visible={visible} contentContainerStyle={containerStyle}>
              <Image
                source={require("../../../assets/checkmark.png")}
                style={{ width: "72px", height: "72px" }}
              />
              <Text
                style={{
                  color: "#646464",
                  fontSize: "14px",
                  marginTop: 20,
                  marginBottom: 20,
                }}
              >
                تم ارسال طلبك, سيتم التواصل معك.
              </Text>
              <CustomButton
                title={" الصفحه الرئيسية"}
                onPress={() => navigation.navigate("Home")}
              />
            </Modal>
          </Portal>

          <Title title={"طلب انضمام الى كانيولا"} />
          <ImagePickerButton />

          <form onSubmit={formik.handleSubmit}>
            <div style={{ padding: 20 }}>
              <CustomInput
                label=" الاسم"
                type="string"
                name={"name"}
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                errorName={formik.errors.name}
                formikTouchedCondition={formik.touched.name}
                formikErrorCondition={formik.errors.name}
              />

              <label
                htmlFor="specialization"
                style={{
                  display: "block",
                  color: "#353535",
                  fontSize: "20px",
                  marginBottom: "5px",
                }}
              >
                التخصص
              </label>

              <select
                name="specialization"
                value={formik.values.specialization}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                style={{
                  backgroundColor: COLORS.bg,
                  border: "0px",
                  width: "98%",
                  borderRadius: "8px",
                  height: "38px",
                  paddingRight: 10,
                  paddingLeft: 10,
                }}
              >
                {specializationsArray?.map((specialization, index) => (
                  <option value={specialization.name} key={index}>
                    {specialization.name}
                  </option>
                ))}
              </select>
              {formik.touched.specialization &&
                formik.errors.specialization && (
                  <div
                    style={{
                      color: "red",
                      marginTop: "5px",
                      marginBottom: "5px",
                    }}
                  >
                    {formik.errors.specialization}
                  </div>
                )}

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
                label="   البريد الالكترونى"
                type="string"
                name={"email"}
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                errorName={formik.errors.email}
                formikTouchedCondition={formik.touched.email}
                formikErrorCondition={formik.errors.email}
              />

              <label htmlFor="governorate" style={{ display: "block" }}>
                المحافظه
              </label>

              <select
                style={{
                  backgroundColor: COLORS.bg,
                  border: "0px",
                  width: "98%",
                  borderRadius: "8px",
                  height: "38px",
                  paddingRight: 10,
                  paddingLeft: 10,
                }}
                name="governorate"
                value={formik.values.governorate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                {governorates?.map((governorate, index) => (
                  <option value={governorate.iso2} key={index}>
                    {governorate.name}
                  </option>
                ))}
              </select>
              {formik.touched.governorate && formik.errors.governorate && (
                <div
                  style={{
                    color: "red",
                    marginTop: "5px",
                    marginBottom: "5px",
                  }}
                >
                  {formik.errors.governorate}
                </div>
              )}

              <label htmlFor="city" style={{ display: "block" }}>
                المنطقه
              </label>

              <select
                style={{
                  backgroundColor: COLORS.bg,
                  border: "0px",
                  width: "98%",
                  borderRadius: "8px",
                  height: "38px",
                  paddingRight: 10,
                  paddingLeft: 10,
                }}
                name="city"
                value={formik.values.city}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={!selectedGovernorate}
              >
                {cities?.map((city, index) => (
                  <option value={city.name} key={index}>
                    {city.name}
                  </option>
                ))}
              </select>
              {formik.touched.city && formik.errors.city && (
                <div
                  style={{
                    color: "red",
                    marginTop: "5px",
                    marginBottom: "5px",
                  }}
                >
                  {formik.errors.city}
                </div>
              )}

              <CustomInput
                label="     العنوان"
                type="string"
                name={"address"}
                value={formik.values.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                errorName={formik.errors.address}
                formikTouchedCondition={formik.touched.address}
                formikErrorCondition={formik.errors.address}
              />
              <View
                style={{
                  flexDirection: "row-reverse",
                  textAlign: "right",
                  alignItems: "center",
                  marginVertical: 10,
                  padding: 8,
                  backgroundColor: COLORS.bg,
                  borderRadius: "8px",
                }}
              >
                {" "}
                <input
                  type="checkbox"
                  name="atHome"
                  id="atHome"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  defaultChecked={formik.values.atHome}
                />
                <Image
                  source={require("../../../assets/svgexport-7 (32) 1.png")}
                  style={{
                    width: "32px",
                    height: "32px",
                    marginLeft: "10px",
                    marginRight: "10px",
                  }}
                />
                <label
                  htmlFor="atHome"
                  style={{ display: "block", color: "#109EC4" }}
                >
                  كشف منزلى
                </label>
              </View>
              <View
                style={{
                  flexDirection: "row-reverse",
                  textAlign: "right",
                  alignItems: "center",
                  marginVertical: 10,
                  padding: 8,
                  backgroundColor: COLORS.bg,
                  borderRadius: "8px",
                }}
              >
                <input
                  type="checkbox"
                  name="inClinic"
                  id="inClinic"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  defaultChecked={formik.values.inClinic}
                />

                <Image
                  source={require("../../../assets/svgexport-7 (32) 1.png")}
                  style={{
                    width: "32px",
                    height: "32px",
                    marginLeft: "10px",
                    marginRight: "10px",
                  }}
                />
                <label
                  htmlFor="inClinic"
                  style={{ display: "block", color: "#109EC4" }}
                >
                  كشف في العياده
                </label>
              </View>
              {formik.touched.inClinic && formik.errors.inClinic && (
                <div
                  style={{
                    color: "red",
                    marginTop: "5px",
                    marginBottom: "5px",
                  }}
                >
                  {formik.errors.inClinic}
                </div>
              )}

              {joinRequestResponse?.error && (
                <div style={{ color: "red", fontSize: "10px" }}>
                  حدث خطأ برجاء اعادة الارسال
                </div>
              )}

              <Text
                style={{
                  color: "#353535",
                  fontSize: "20px",
                  marginBottom: "5px",
                }}
              >
                شهادة مزاولة المهنه
              </Text>
              <View style={{ height: "48px", margin: "10px" }}>
                <Image
                  source={require("../../../assets/file.png")}
                  style={{
                    width: "100%",
                    height: "100%",
                    // marginLeft: "10px",
                    // marginRight: "10px",
                  }}
                />
              </View>
              <button
                // disabled={!formik.isValid}
                type="submit"
                style={{
                  // display: "block",
                  backgroundColor: COLORS.primary,
                  height: "37px",
                  width: "97%",
                  borderRadius: "8px",
                  padding: "8px 81px 8px 81px",
                  color: "white",
                  border: "0px",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {joinRequestResponse.loading ? ".... تحميل" : "ارسال"}
              </button>
            </div>
          </form>
        </PaperProvider>
      </SafeAreaView>
    </ScrollView>
  );
};
export default Register;
