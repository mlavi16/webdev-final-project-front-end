/*==================================================
CampusContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */
import Header from './Header';
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  fetchCampusThunk,
  deleteCampusThunk,
  editStudentThunk
} from "../../store/thunks";

import { CampusView } from "../views";

class CampusContainer extends Component {
  // Initialize state
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      campusId: null,
    };
  }

  // Get the specific campus data from back-end database
  componentDidMount() {
    // Get campus ID from URL (API link)
    this.props.fetchCampus(this.props.match.params.id);
  }

  removeFromCampus = async (studentId) => {
    let newStudent = {
      id: studentId,
      campusId: null
    };
    console.log(newStudent);

    // Edit the campus in back-end database
    this.props.editStudent(newStudent);
    // Update campus with edited student
    this.props.fetchCampus(this.props.match.params.id);

    // Update state, and trigger redirect to show the new campus
    this.setState({
      id: "",
      campusId: null
    })
  }

  // Render a Campus view by passing campus data as props to the corresponding View component
  render() {
    return (
      <div>
        <Header />
        <CampusView
          campus={this.props.campus}
          deleteCampus={this.props.deleteCampus}
          removeFromCampus={this.removeFromCampus}
        />
      </div>
    );
  }
}

// The following 2 input arguments are passed to the "connect" function used by "CampusContainer" component to connect to Redux Store.
// 1. The "mapState" argument specifies the data from Redux Store that the component needs.
// The "mapState" is called when the Store State changes, and it returns a data object of "campus".
const mapState = (state) => {
  return {
    campus: state.campus,  // Get the State object from Reducer "campus"
    student: state.student  // Get the State object from Reducer "student"
  };
};
// 2. The "mapDispatch" argument is used to dispatch Action (Redux Thunk) to Redux Store.
// The "mapDispatch" calls the specific Thunk to dispatch its action. The "dispatch" is a function of Redux Store.
const mapDispatch = (dispatch) => {
  return {
    fetchCampus: (id) => dispatch(fetchCampusThunk(id)),
    deleteCampus: (campusId) => dispatch(deleteCampusThunk(campusId)),
    editStudent: (student) => dispatch(editStudentThunk(student))
  };
};

// Export store-connected container by default
// CampusContainer uses "connect" function to connect to Redux Store and to read values from the Store
// (and re-read the values when the Store State updates).
export default connect(mapState, mapDispatch)(CampusContainer);
