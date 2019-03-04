import axios from 'axios';

//action types

//from database
const GOT_CALCULATIONS_FROM_SERVER = 'GOT_CALCULATIONS_FROM_SERVER';
const GOT_NEW_CALCULATION_FROM_SERVER = 'GOT_NEW_CALCULATION_FROM_SERVER';
const DELETED_CALCULATION_FROM_SERVER = 'DELETED_CALCULATION_FROM_SERVER';
const GOT_UPDATED_CALCULATION_FROM_SERVER =
  'GOT_UPDATED_CALCULATION_FROM_SERVER';

//evaluating mathematical expressions
const GOT_EVALUATION_FROM_SERVER = 'GOT_EVALUATION_FROM_SERVER';

//action creators
const gotCalculationsFromServer = calculations => {
  return {
    type: GOT_CALCULATIONS_FROM_SERVER,
    calculations,
  };
};

//thunk creator for action creator above
export const fetchCalculations = () => async dispatch => {
  const res = await axios.get('/api/calculations');
  const calculations = res.data;
  dispatch(gotCalculationsFromServer(calculations));
};

const gotEvaluationFromServer = result => {
  return {
    type: GOT_EVALUATION_FROM_SERVER,
    result,
  };
};
//thunk creator for action creator above
export const fetchEvaluation = expression => async dispatch => {
  const res = await axios.get('/api/evaluate', { params: { expression } });
  const { result } = res.data;
  dispatch(gotEvaluationFromServer(result));
};

const gotNewCalculationFromServer = calculation => {
  return {
    type: GOT_NEW_CALCULATION_FROM_SERVER,
    calculation,
  };
};
//thunk creator for action creator above
export const postNewCalculation = calculation => async dispatch => {
  const res = await axios.post('/api/calculations', calculation);
  const calculationFromServer = res.data;
  dispatch(gotNewCalculationFromServer(calculationFromServer));
};

const deletedCalculationFromServer = deletedCalculation => {
  return {
    type: DELETED_CALCULATION_FROM_SERVER,
    deletedCalculation,
  };
};
//thunk creator for action creator above
export const deleteCalculation = calculationId => async dispatch => {
  const res = await axios.delete(`/api/calculations/${calculationId}`);
  const deletedCalculation = res.data;
  dispatch(deletedCalculationFromServer(deletedCalculation));
};

const gotUpdatedCalculationFromServer = updatedCalculation => {
  return {
    type: GOT_UPDATED_CALCULATION_FROM_SERVER,
    updatedCalculation,
  };
};
//thunk creator for action creator above
export const updateCalculation = (
  updatedInfo,
  calculationId
) => async dispatch => {
  const res = await axios.put(
    `/api/calculations/${calculationId}`,
    updatedInfo
  );
  const updatedCalculation = res.data;
  dispatch(gotUpdatedCalculationFromServer(updatedCalculation));
};

//initial state
const initialState = {
  calculations: [],
  selectedCalculation: {},
  currentResult: '',
};

const calculationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_CALCULATIONS_FROM_SERVER:
      return {
        ...state,
        calculations: action.calculations,
      };
    case GOT_EVALUATION_FROM_SERVER:
      return {
        ...state,
        currentResult: action.result,
      };

    case GOT_NEW_CALCULATION_FROM_SERVER:
      return {
        ...state,
        calculations: [...state.calculations, action.calculation],
      };
    case DELETED_CALCULATION_FROM_SERVER:
      return {
        ...state,
        calculations: state.calculations.filter(
          calculation => calculation.id !== action.deletedCalculation.id
        ),
      };
    case GOT_UPDATED_CALCULATION_FROM_SERVER:
      return {
        ...state,
        calculations: state.calculations.map(calculation => {
          if (calculation.id === action.updatedCalculation.id) {
            return action.updatedCalculation;
          } else {
            return calculation;
          }
        }),
        selectedCalculation: action.updatedCalculation,
      };

    default:
      return state;
  }
};

export default calculationsReducer;
