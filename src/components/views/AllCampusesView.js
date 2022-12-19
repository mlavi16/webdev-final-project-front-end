/*==================================================
AllCampusesView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display all campuses.
================================================== */
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const AllCampusesView = (props) => {
  // const { deleteCampus} = props;
  return (
    <div>
      <h1>All Campuses</h1>
      <CampusesList allCampuses={props.allCampuses} deleteCampus={props.deleteCampus} />
      <br />
      <Link to={`/newcampus`}>
        <button>Add New Campus</button>
      </Link>
      <br /><br />
    </div>
  );
};

const CampusesList = ({ allCampuses, deleteCampus}) => {
  if (!allCampuses.length) {
      // If there is are no campuses, display a message.
    return (<h3>There are no campuses.</h3>)
  } else {
    // Else show the list of campuses.
    return (
      <div>
        {allCampuses.map((campus) => (
          <div key={campus.id}>
            <Link to={`/campus/${campus.id}`}>
              <h2>{campus.name}</h2>
            </Link>
            <h4>campus id: {campus.id}</h4>
            <p>{campus.address}</p>
            <p>{campus.description}</p>
            <button onClick={() => deleteCampus(campus.id)}>Delete</button>
            <hr />
          </div>
        ))}
      </div>
    )
  }
}
// Validate data type of the props passed to component.
AllCampusesView.propTypes = {
  allCampuses: PropTypes.array.isRequired,
};

export default AllCampusesView;
