import axios from 'axios';

//action types
const GOT_CAMPUSES_FROM_SERVER = 'GOT_CAMPUSES_FROM_SERVER';
const GOT_SINGLE_CAMPUS_FROM_SERVER = 'GOT_SINGLE_CAMPUS_FROM_SERVER';
const GOT_NEW_CAMPUS_FROM_SERVER = 'GOT_NEW_CAMPUS_FROM_SERVER';
const DELETED_CAMPUS_FROM_SERVER = 'DELETED_CAMPUS_FROM_SERVER';
const GOT_UPDATED_CAMPUS_FROM_SERVER = 'GOT_UPDATED_CAMPUS_FROM_SERVER';

//action creators
const gotCampusesFromServer = campuses => {
  return {
    type: GOT_CAMPUSES_FROM_SERVER,
    campuses,
  };
};

//thunk creator for action creator above
export const fetchCampuses = () => async dispatch => {
  const res = await axios.get('/api/campuses');
  const campuses = res.data;
  dispatch(gotCampusesFromServer(campuses));
};

const gotSingleCampusFromServer = campus => {
  return {
    type: GOT_SINGLE_CAMPUS_FROM_SERVER,
    campus,
  };
};

//thunk creator for action creator above
export const fetchSingleCampus = (campusId, history) => async dispatch => {
  try {
    const res = await axios.get(`/api/campuses/${campusId}`);
    const campus = res.data;
    if (!campus.id) {
      throw new Error('campus not found');
    }
    dispatch(gotSingleCampusFromServer(campus));
  } catch (err) {
    history.push(`/page-not-found/campus/${campusId}`);
  }
};

const gotNewCampusFromServer = campus => {
  return {
    type: GOT_NEW_CAMPUS_FROM_SERVER,
    campus,
  };
};
//thunk creator for action creator above
export const postNewCampus = campus => async dispatch => {
  const res = await axios.post('/api/campuses', campus);
  const campusFromServer = res.data;
  dispatch(gotNewCampusFromServer(campusFromServer));
};

const deletedCampusFromServer = deletedCampus => {
  return {
    type: DELETED_CAMPUS_FROM_SERVER,
    deletedCampus,
  };
};
//thunk creator for action creator above
export const deleteCampus = campusId => async dispatch => {
  const res = await axios.delete(`/api/campuses/${campusId}`);
  const deletedCampus = res.data;
  dispatch(deletedCampusFromServer(deletedCampus));
};

const gotUpdatedCampusFromServer = updatedCampus => {
  return {
    type: GOT_UPDATED_CAMPUS_FROM_SERVER,
    updatedCampus,
  };
};
//thunk creator for action creator above
export const updateCampus = (updatedInfo, campusId) => async dispatch => {
  const res = await axios.put(`/api/campuses/${campusId}`, updatedInfo);
  const updatedCampus = res.data;
  dispatch(gotUpdatedCampusFromServer(updatedCampus));
};

//initial state
const initialState = {
  campuses: [],
  selectedCampus: {},
};

const campusesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_CAMPUSES_FROM_SERVER:
      return {
        ...state,
        campuses: action.campuses,
      };
    case GOT_SINGLE_CAMPUS_FROM_SERVER:
      return {
        ...state,
        selectedCampus: action.campus,
      };
    case GOT_NEW_CAMPUS_FROM_SERVER:
      return {
        ...state,
        campuses: [...state.campuses, action.campus],
      };
    case DELETED_CAMPUS_FROM_SERVER:
      return {
        ...state,
        campuses: state.campuses.filter(
          campus => campus.id !== action.deletedCampus.id
        ),
      };
    case GOT_UPDATED_CAMPUS_FROM_SERVER:
      return {
        ...state,
        campuses: state.campuses.map(campus => {
          if (campus.id === action.updatedCampus.id) {
            return action.updatedCampus;
          } else {
            return campus;
          }
        }),
        selectedCampus: action.updatedCampus,
      };

    default:
      return state;
  }
};

export default campusesReducer;
