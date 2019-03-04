import axios from 'axios';

//action types
const GOT_STUDENTS_FROM_SERVER = 'GOT_STUDENTS_FROM_SERVER';
const GOT_SINGLE_STUDENT_FROM_SERVER = 'GOT_SINGLE_STUDENT_FROM_SERVER';
const GOT_NEW_STUDENT_FROM_SERVER = 'GOT_NEW_STUDENT_FROM_SERVER';
const GOT_DELETED_STUDENT_FROM_SERVER = 'GOT_DELETED_STUDENT_FROM_SERVER';
const GOT_UPDATED_STUDENT_FROM_SERVER = 'GOT_UPDATED_STUDENT_FROM_SERVER';
//action creators
const gotStudentsFromServer = students => {
  return {
    type: GOT_STUDENTS_FROM_SERVER,
    students,
  };
};

//thunk creator for action creator above
export const fetchStudents = () => async dispatch => {
  const res = await axios.get('/api/students');
  const students = res.data;
  dispatch(gotStudentsFromServer(students));
};

const gotSingleStudentFromServer = student => {
  return {
    type: GOT_SINGLE_STUDENT_FROM_SERVER,
    student,
  };
};

//thunk creator for action creator above
export const fetchSingleStudent = (studentId, history) => async dispatch => {
  try {
    const res = await axios.get(`/api/students/${studentId}`);
    const student = res.data;
    if (!student.id) {
      throw new Error('student not found');
    }
    dispatch(gotSingleStudentFromServer(student));
  } catch (err) {
    history.push(`/page-not-found/student/${studentId}`);
  }
};

const gotNewStudentFromServer = student => {
  return {
    type: GOT_NEW_STUDENT_FROM_SERVER,
    student,
  };
};

export const postNewStudent = student => async dispatch => {
  const res = await axios.post('/api/students', student);
  const studentFromServer = res.data;
  dispatch(gotNewStudentFromServer(studentFromServer));
};

const gotDeletedStudentFromServer = deletedStudent => {
  return {
    type: GOT_DELETED_STUDENT_FROM_SERVER,
    deletedStudent,
  };
};
//thunk creator for action creator above
export const deleteStudent = studentId => async dispatch => {
  const res = await axios.delete(`/api/students/${studentId}`);
  const deletedStudent = res.data;
  dispatch(gotDeletedStudentFromServer(deletedStudent));
};

const gotUpdatedStudentFromServer = updatedStudent => {
  return {
    type: GOT_UPDATED_STUDENT_FROM_SERVER,
    updatedStudent,
  };
};

export const updateStudent = (updatedInfo, studentId) => async dispatch => {
  const res = await axios.put(`/api/students/${studentId}`, updatedInfo);
  const updatedStudent = res.data;
  dispatch(gotUpdatedStudentFromServer(updatedStudent));
};

//initial state
const initialState = {
  students: [],
  selectedStudent: {},
};

const studentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_STUDENTS_FROM_SERVER:
      return {
        ...state,
        students: action.students,
      };
    case GOT_SINGLE_STUDENT_FROM_SERVER:
      return { ...state, selectedStudent: action.student };
    case GOT_NEW_STUDENT_FROM_SERVER:
      return { ...state, students: [...state.students, action.student] };
    case GOT_DELETED_STUDENT_FROM_SERVER:
      return {
        ...state,
        students: state.students.filter(
          student => student.id !== action.deletedStudent.id
        ),
      };
    case GOT_UPDATED_STUDENT_FROM_SERVER:
      return {
        ...state,
        students: state.students.map(student => {
          if (student.id === action.updatedStudent.id) {
            return action.updatedStudent;
          } else {
            return student;
          }
        }),
        selectedStudent: action.updatedStudent,
      };
    default:
      return state;
  }
};

export default studentsReducer;
