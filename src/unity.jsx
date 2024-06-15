import React from "react";

const UnityGame = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        alignSelf: "center",
      }}
    >
      <iframe
        src={`${import.meta.env.BASE_URL}unity/index.html`}
        width="100%"
        height="100%"
        frameBorder="0"
        title="Unity WebGL Game"
      ></iframe>
    </div>
  );
};

export default UnityGame;
