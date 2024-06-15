export const getTest = async () => {
  try {
    const response = await fetch(
      "https://customerapi.vizitam.com/api/PresidentialCabinet/GetPsychologyTest",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          userId: 1,
          tagId: null,
          categoryId: 7,
          authId: "yKx1XnkS3BfE9gB3o6LRyg==",
        }),
      }
    );
    const responseData = await response.json();

    if (responseData.isSuccess) {
      console.log(responseData);
      getQuestionAndAnswer(responseData.data[0].id);
    } else if (
      Array.isArray(responseData.exceptions) &&
      responseData.exceptions.length > 0
    ) {
      const errorDescription =
        responseData.exceptions[0]?.exception?.persianDescription ||
        "No error description available";
      console.error("Error in request:", errorDescription);
    } else {
      console.error("Error in request: Unknown error structure");
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
};


export const getQuestionAndAnswer = async (id) => {
  try {
    const response = await fetch(
      "https://customerapi.vizitam.com/api/PresidentialCabinet/GetQuestionAndAnswer",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          psychologyTestId: id,
          authId: "yKx1XnkS3BfE9gB3o6LRyg==",
        }),
      }
    );
    const responseData = await response.json();

    if (responseData.isSuccess) {
      console.log(responseData);
    } else if (
      Array.isArray(responseData.exceptions) &&
      responseData.exceptions.length > 0
    ) {
      const errorDescription =
        responseData.exceptions[0]?.exception?.persianDescription ||
        "No error description available";
      console.error("Error in request:", errorDescription);
    } else {
      console.error("Error in request: Unknown error structure");
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
};


export const endTest = async (id) => {
  try {
    const response = await fetch(
      "https://customerapi.vizitam.com/api/PresidentialCabinet/EndTest",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          psychologyTestId: id,
          authId: "yKx1XnkS3BfE9gB3o6LRyg==",
          userId: 1,
          questionIdVsAnswerId: {},
        }),
      }
    );
    const responseData = await response.json();

    if (responseData.isSuccess) {
      console.log(responseData);
    } else if (
      Array.isArray(responseData.exceptions) &&
      responseData.exceptions.length > 0
    ) {
      const errorDescription =
        responseData.exceptions[0]?.exception?.persianDescription ||
        "No error description available";
      console.error("Error in request:", errorDescription);
    } else {
      console.error("Error in request: Unknown error structure");
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
};
