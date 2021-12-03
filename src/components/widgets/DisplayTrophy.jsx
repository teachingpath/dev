import { Widget1 } from "@panely/components";
import React from "react";

const DisplayTrophy = ({ isFinish = false, trophy }) => {
  return (
    Object.keys(trophy).length > 0 && (
      <Widget1.Offset>
        <img
          src={trophy?.image}
          alt="loading"
          style={{ width: "155px" }}
          className="bg-yellow p-2 border mx-auto d-block mg-thumbnail avatar-circle"
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
      </Widget1.Offset>
    )
  );
};

export default DisplayTrophy;
