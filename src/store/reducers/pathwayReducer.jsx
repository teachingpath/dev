import TYPES from "store/types";

const initialState = {
  pathwaySeleted: null,
  runnerSeleted: null,
};

function pathwayReducer(state = initialState, action) {
  switch (action.type) {
    case TYPES.PATHWAY_LOAD:
      return {
        ...state,
        pathwaySeleted: action.payload,
      };
    case TYPES.RUNNER_LOAD:
      return {
        ...state,
        runnerSeleted: action.payload,
      };
    default:
      return state;
  }
}

export default pathwayReducer;
