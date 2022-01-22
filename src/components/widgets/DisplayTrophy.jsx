import { Widget1 } from "@panely/components";
import React from "react";

const DisplayTrophy = ({isFinish = false,  trophy }) => {
  return (
    Object.keys(trophy).length > 0 && (
      <Widget1.Offset>
        <center>
        <div style={{ background: isFinish ? "none": "#f2f2f2", width: "fit-content" }} className="avatar-circle ">
          <img
            src={trophy?.image}
            alt="loading"
            style={{ width: "155px", opacity: isFinish ? "1" : "0.3" }}
            className={
              "p-2 border mx-auto d-block mg-thumbnail avatar-circle " +
              (isFinish ? "bg-yellow" : "")
            }
          />

          {isFinish && (
            <>
              <h4 className={"text-black  mx-auto d-block text-center "}>
                {trophy?.name}
              </h4>
              <small className={" mx-auto d-block text-center text-muted"}>
                {trophy?.description}
              </small>
            </>
          )}
        </div>
        </center>
      
      </Widget1.Offset>
    )
  );
};

export default DisplayTrophy;
