import {
  Dropdown,
  Progress,
  Widget1,
} from "@panely/components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as SolidIcon from "@fortawesome/free-solid-svg-icons";
import Router from "next/router";
import React from "react";
import { deleteJourney } from "consumer/journey";

const StatusProgress = ({ progress, journeyId, pathwayId, runners }) => {
  const isFinish = progress >= 100;
  const onReCreateJourney = (pathwayId, journeyId) => {
    return deleteJourney(journeyId)
      .then((doc) => {
        Router.push({
          pathname: "/catalog/pathway",
          query: {
            id: pathwayId,
          },
        });
      });
  };

  return (
    <>
      <Widget1.Group>
        {!isFinish ? (
          <Widget1.Title>
            <h4>My Progress</h4>
            <Progress striped value={progress} className="mr-5 w-50">
              {progress}%
            </Progress>
          </Widget1.Title>
        ) : (
          <h4 className="mr-5 w-100">Pathway Successful</h4>
        )}

        <Widget1.Addon>
          {/* BEGIN Dropdown */}
          <Dropdown.Uncontrolled>
            <Dropdown.Toggle caret children="Option" />
            <Dropdown.Menu right animated>
              <Dropdown.Item
                icon={<FontAwesomeIcon icon={SolidIcon.faRedo} />}
                onClick={() => {
                  onReCreateJourney(pathwayId, journeyId, runners);
                }}
              >
                Reset
              </Dropdown.Item>
              <Dropdown.Item
                icon={<FontAwesomeIcon icon={SolidIcon.faShare} />}
              >
                Share
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown.Uncontrolled>
          {/* END Dropdown */}
        </Widget1.Addon>
      </Widget1.Group>
    </>
  );
};

export default StatusProgress;
