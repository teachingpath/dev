import TYPES from "store/types";

const initialState = {
  pathwaySeleted: null,
  runnerSeleted: null,
};

function pathwayReducer(state = initialState, action) {
  switch (action.type) {
    case TYPES.PATHWAY_LOAD:
      if(action.payload === null) {
        return {
          pathwaySeleted: null,
          runnerSeleted: null
        };
      }
      return {
        ...state,
        pathwaySeleted: { ...(state.pathwaySeleted || {}), ...action.payload },
        
      };
    case TYPES.RUNNER_LOAD:
      if(action.payload === null) {
        return {
          ...state,
          runnerSeleted: null,
        };
      }
      return {
        ...state,
        runnerSeleted: { ...(state.runnerSeleted || {}), ...action.payload },
      };
    default:
      return state;
  }
}

export default pathwayReducer;
