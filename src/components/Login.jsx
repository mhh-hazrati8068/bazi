import React, { useState, useEffect, useContext } from "react";
import "./Login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { getCaptcha } from "../services/captcha";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LogoIran from "../assets/iranLogo.png";
import { AuthContext } from "../contexts/authContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const refresh = <FontAwesomeIcon icon={faRotateRight} />;
  const [mobile, setMobile] = useState("09");
  const [username, setUserName] = useState("");
  const [captchaURL, setCaptchaURL] = useState("");
  const [field, setField] = useState({
    mobile: "",
    username: "",
    parentId: "",
    captcha: "",
    captchaKey: "",
  });

  const handleMobileChange = (e) => {
    const value = e.target.value;
    if (value.startsWith("09") && /^[\+0-9]{0,13}$/.test(value)) {
      setMobile(value);
      setField({ ...field, mobile: value });
    }
  };
  const handleuserNameChange = (e) => {
    const value = e.target.value;
    setUserName(value);
    setField({ ...field, username: value });
  };

  const handleCaptchaChange = (e) => {
    setField({ ...field, captcha: e.target.value });
  };
  const handleChangeCaptcha = () => {
    reCaptcha();
  };
  useEffect(() => {
    reCaptcha();
    const intervalId = setInterval(() => {
      reCaptcha();
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  const reCaptcha = async () => {
    const captchaAddress = await getCaptcha();
    setCaptchaURL(captchaAddress.address);
    setField((prevField) => ({
      ...prevField,
      captcha: "",
      captchaKey: captchaAddress.captchaKey,
    }));
  };

  const handleSubmit = async () => {
    const { mobile, captcha, captchaKey } = field;
    const CountryId = 411;
    const VerifyCode = null;
    // const IdentityNo = null;

    const requestBody = new URLSearchParams({
      MobileNumber: mobile,
      CountryId,
      VerifyCode,
      IdentityNo: username,
      userCaptcha: `captcha:${captcha}|captchaKey:${captchaKey}`,
    }).toString();

    try {
      const response = await fetch(
        "https://customerapi.vizitam.com/api/PresidentialCabinet/RegisterCabinetCustomerByPhone",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            MobileNumber: mobile,
            CountryId: CountryId,
            VerifyCode: VerifyCode, // svg
            IdentityNo: username, // username
            userCaptcha: `captcha:${captcha}|captchaKey:${captchaKey}`,
            parentId: null,
          },
          body: requestBody,
        }
      );

      const responseData = await response.json();

      if (responseData.isSuccess) {
        login();

        toast.success("خوش آمدید", {
          onClose: () => {
            navigate("/dashboard");
          },
        });
        localStorage.setItem("id", responseData.id);
      } else if (
        Array.isArray(responseData.exceptions) &&
        responseData.exceptions.length > 0
      ) {
        const errorDescription =
          responseData.exceptions[0]?.exception?.persianDescription ||
          "خطای ناشناخته!";
        toast.error(errorDescription);
      } else {
        toast.error("خطای ناشناخته!");
      }
    } catch (error) {
      toast.error(error.message);
    }

    setField((prevField) => ({
      ...prevField,
      captcha: "",
      mobile: "",
    }));
    setMobile("09");
    setUserName("");
  };

  return (
    <div className="app-login">
      <ToastContainer autoClose={1000}/>
      <div className="content">
        <div className="image-container">
          <img src={LogoIran} alt="Login" />
        </div>
        <div className="inputs-container">
          <form className="form-padding" noValidate>
            <div className="text white-text">شماره تلفن خود را وارد کنید</div>
            <div className="mobile-number-container">
              <input
                required
                type="tel"
                className="input-mask"
                name="mobile"
                value={mobile}
                onChange={handleMobileChange}
              />
            </div>
            <div className="text white-text"> نام کاربری خود را وارد کنید</div>
            <div className="username-container">
              <input
                required
                type="tel"
                className="input-mask"
                name="username"
                value={username}
                placeholder="نام کاربری "
                onChange={handleuserNameChange}
              />
            </div>

            <div className="captcha-container">
              <img src={captchaURL} alt="CAPTCHA" />
              <input
                type="text"
                name="captcha"
                value={field.captcha}
                onChange={handleCaptchaChange}
                placeholder="کد امنیتی"
              />
              <i onClick={handleChangeCaptcha}>{refresh}</i>
            </div>
            {/* <div className="avatar-container">
              {avatarData.map((index) => {
                return (
                  <div key={index.id} className="avatar-img">
                    <img src={index.src} alt={index.alt} />
                  </div>
                );
              })}
            </div> */}

            <div className="d-flex align-items-center justify-content-center expect">
              <div className="checkbox-wrapper-31">
                <input type="checkbox" />
                <svg viewBox="0 0 35.6 35.6">
                  <circle
                    className="background"
                    cx="17.8"
                    cy="17.8"
                    r="17.8"
                  ></circle>
                  <circle
                    className="stroke"
                    cx="17.8"
                    cy="17.8"
                    r="14.37"
                  ></circle>
                  <polyline
                    className="check"
                    points="11.78 18.12 15.55 22.23 25.17 12.87"
                  ></polyline>
                </svg>
              </div>

              <button className="button rules" type="button">
                انتظارات و خواسته‌های ما
              </button>
            </div>

            <div className="button-container" onClick={handleSubmit}>
              <button className="button next-step" type="button">
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  className="icon-arrow-left"
                />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
