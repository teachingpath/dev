import TYPES from "store/types";

export function loadPathway(payload) {
  return {
    type: TYPES.PATHWAY_LOAD,
    payload: payload,
  };
}

export function loadRunner(payload) {
  return {
    type: TYPES.RUNNER_LOAD,
    payload: payload,
  };
}

export function getPathwayBy(pathwayId) {
  return {
    type: TYPES.GET_PATHWAY,
    payload: { pathwayId: pathwayId },
  };
}

export function getRunnerBy(runnerId, pathwayId) {
  return {
    type: TYPES.GET_RUNNER,
    payload: { pathwayId: pathwayId, runnerId: runnerId },
  };
}
