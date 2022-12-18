/*==================================================
CampusView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display a single campus and its students (if any).
================================================== */
import { Link } from "react-router-dom";


// Take in props data to construct the component
const CampusView = (props) => {
  const { campus } = props;

  // Render a single Campus view with list of its students
    // <p>There are no students.</p>
  return (
    <div>
      <h1>{campus.name}</h1>
      <img src={campus.imageUrl} alt={campus.name} width="200px" />
      <p>{campus.address}</p>
      <p>{campus.description}</p>
      <StudentsList students={campus.students}/>
      <Link to={`/newstudent`}>
        <button>Add New Student</button>
      </Link>
    </div>
  );
};

const StudentsList = ({students}) => {
  // const { campus } = props;
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
            </div>
          );
        })}
      </div>
    )
  }
}

export default CampusView;
