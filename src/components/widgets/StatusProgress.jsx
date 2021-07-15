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
            <h4>Mi progreso</h4>
            <Progress striped value={progress} className="mr-5 w-50">
              {progress}%
            </Progress>
          </Widget1.Title>
        ) : (
          <h4 className="mr-5 w-100">Pathway Finalizado</h4>
        )}

        <Widget1.Addon>
          <Dropdown.Uncontrolled>
            <Dropdown.Toggle caret children="Opciones" />
            <Dropdown.Menu right animated>
              <Dropdown.Item
                icon={<FontAwesomeIcon icon={SolidIcon.faRedo} />}
                onClick={() => {
                  onReCreateJourney(pathwayId, journeyId, runners);
                }}
              >
                Reiniciar
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown.Uncontrolled>
        </Widget1.Addon>
      </Widget1.Group>
    </>
  );
};

export default StatusProgress;
