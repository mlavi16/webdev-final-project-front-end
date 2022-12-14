/*==================================================
EditCampusContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */
import Header from './Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { withRouter } from "react-router-dom";

import EditCampusView from '../views/EditCampusView';
import {
  fetchCampusThunk,
  editCampusThunk
} from '../../store/thunks';

class EditCampusContainer extends Component {
  // Initialize state
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      address: "",
      description: "",
      imageUrl: "",
      errorMsg: "",
      redirect: false,
      redirectId: null
    };
  }

  // Get the specific campus data from back-end database
  componentDidMount() {
    // Get campus ID from URL (API link)
    this.props.fetchCampus(this.props.match.params.id)
  }

  // Capture input data when it is entered
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  // Take action after user click the submit button
  handleSubmit = async event => {
    event.preventDefault();  // Prevent browser reload/refresh after submit.
    let campus = {
      id: this.props.campus.id,
      name: this.state.name === "" ? this.props.campus.name : this.state.name,
      address: this.state.address === "" ? this.props.campus.address : this.state.address,
      description: this.state.description === "" ? this.props.campus.description : this.state.description,
      imageUrl: this.state.imageUrl === "" ? this.props.campus.imageUrl : this.state.imageUrl
    };

    // Edit the campus in back-end database
    let updatedCampus = await this.props.editCampus(campus);
    console.log(updatedCampus);

    // Update state, and trigger redirect to show the new campus
    if (updatedCampus.data && updatedCampus.data.id) {
      this.setState({
        id: "",
        name: "",
        address: "",
        description: "",
        imageUrl: "",
        redirect: true,
        redirectId: this.props.campus.id
      });
    } else {
      // If editCampus returned an error
      this.setState({
        errorMsg: updatedCampus.data,
        redirect: false
      });
    }

  }

  // Unmount when the component is being removed from the DOM:
  componentWillUnmount() {
    this.setState({ redirect: false, redirectId: null });
  }

  // Render new campus input form
  render() {
    // Redirect to the campus's page after submit
    if (this.state.redirect) {
      return (<Redirect to={`/campus/${this.state.redirectId}`} />)
    }
    // Display the input form via the corresponding View component
    return (
      <div>
        <Header />
        <EditCampusView
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          campus={this.props.campus}
          errorMsg={this.state.errorMsg}
        />
      </div>
    );
  }
}

// The following 2 input arguments are passed to the "connect" function used by "EditCampusContainer" component to connect to Redux Store.
// 1. The "mapState" argument specifies the data from Redux Store that the component needs.
// The "mapState" is called when the Store State changes, and it returns a data object of "campus".
const mapState = (state) => {
  return {
    campus: state.campus,  // Get the State object from Reducer "campus"
  };
};
// The following input argument is passed to the "connect" function used by "NewCampusContainer" component to connect to Redux Store.
// The "mapDispatch" argument is used to dispatch Action (Redux Thunk) to Redux Store.
// The "mapDispatch" calls the specific Thunk to dispatch its action. The "dispatch" is a function of Redux Store.
const mapDispatch = (dispatch) => {
  return ({
    fetchCampus: (id) => dispatch(fetchCampusThunk(id)),
    editCampus: (campus) => dispatch(editCampusThunk(campus))
  })
}

// Export store-connected container by default
// EditCampusContainer uses "connect" function to connect to Redux Store and to read values from the Store
// (and re-read the values when the Store State updates).
export default withRouter(connect(mapState, mapDispatch)(EditCampusContainer));

