/*==================================================
CampusView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display a single campus and its students (if any).
================================================== */
import { Link } from "react-router-dom";


// Take in props data to construct the component
const CampusView = (props) => {
  const { campus, deleteCampus, removeFromCampus } = props;

  // Render a single Campus view with list of its students
  return (
    <div>
      <h1>{campus.name}</h1>
      {campus.imageUrl && <img src={campus.imageUrl} alt="campus_image" width="200px" />}
      <p>{campus.address}</p>
      {campus.description && <p>{campus.description}</p>}
      <StudentsList students={campus.students} removeFromCampus={removeFromCampus} />
      <br /><br />
      <Link to={{pathname: `/newstudent`, state: campus.id}}>
        <button>Add New Student</button>
      </Link>
      <br /><br />
      <Link to={`/campuses`}>
        <button onClick={() => deleteCampus(campus.id)}>Delete Campus</button>
      </Link>
      <Link to={`/editcampus/${campus.id}`}>
        <button>Edit Campus</button>
      </Link>
    </div>
  );
};

const StudentsList = ({students, removeFromCampus}) => {
  if (!students.length) {
    return (<h3>There are no students enrolled here.</h3>)
  } else {
    return (
      <div>
        {students.map(student => {
          let name = student.firstname + " " + student.lastname;
          return (
            <div key={student.id}>
              <Link to={`/student/${student.id}`}>
                <h2>{name}</h2>
              </Link>
              <button onClick={() => removeFromCampus(student.id)}>Remove</button>
            </div>
          );
        })}

      </div>
    )
  }
}

export default CampusView;
