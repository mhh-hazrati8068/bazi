export const getCaptcha = () => {
  const captchaKey = Math.floor(Math.random() * (100000 - 71 + 1)) + 71;

  return {
    address: `https://customerapi.vizitam.com/api/Principal/CaptchaImage?captchaKey=${captchaKey}`,
    captchaKey: captchaKey,
  };
};

// http://192.168.1.79:34325/api/PresidentialCabinet/RegisterCabinetCustomerByPhone
