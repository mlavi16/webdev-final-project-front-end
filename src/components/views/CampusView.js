/*==================================================
CampusView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display a single campus and its students (if any).
================================================== */
import { Link } from "react-router-dom";


// Take in props data to construct the component
const CampusView = (props) => {
  const {campus} = props;

  // Render a single Campus view with list of its students
  if (!campus.students.length) {
    return (
    <div>
      <p>There are no students.</p>
      <Link to={`/newstudent`}>
        <button>Add New Student</button>
      </Link>
    </div>
    );
  } else {
    return (
      <div>
        <h1>{campus.name}</h1>
        <img src={campus.imageUrl} alt={campus.name} width="200px"/>
        <p>{campus.address}</p>
        <p>{campus.description}</p>
        {campus.students.map( student => {
          let name = student.firstname + " " + student.lastname;
          return (
            <div key={student.id}>
              <Link to={`/student/${student.id}`}>
                <h2>{name}</h2>
              </Link>
            </div>
          );
        })}
        <Link to={`/newstudent`}>
          <button>Add New Student</button>
        </Link>
      </div>
    );
  }
};

export default CampusView;
