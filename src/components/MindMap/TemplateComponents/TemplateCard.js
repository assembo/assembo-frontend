import React from "react";

const TemplateCard = (props) => {
  return (
    <div style={{ width: "15%" }}>
      <div
        style={{
          backgroundColor: "#F3F3F3",
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: 200,
          borderRadius: 15,
          cursor: "pointer",
          padding: 10,
        }}
        onClick={() => {
          props.setDataToUse(props?.templateData);
          props.setShowChooseTemplate(false);
        }}
      >
        {/*  */}
        {props?.templateData?.map((e, index) => (
          <>
            {index > 0 && index < 5 && (
              <div
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: 7,
                    height: 7,
                    backgroundColor: "black",
                    borderRadius: 200,
                  }}
                ></div>
                <p
                  style={{
                    margin: 0,
                    fontSize: 14,
                    fontWeight: 500,
                    marginLeft: 10,
                  }}
                >
                  {e.text}
                </p>
              </div>
            )}
          </>
        ))}
      </div>
      <p style={{ fontSize: 16, fontWeight: 600, textAlign: "left", margin: 8 }}>
        {props?.templateData[0].text}
      </p>
    </div>
  );
};

export default TemplateCard;
