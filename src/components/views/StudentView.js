/*==================================================
StudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the single student view page.
================================================== */
import { Link } from "react-router-dom";

const StudentView = (props) => {
  const { student, deleteStudent } = props;

  // Render a single Student view
  if (!student.gpa) {

  }
  return (
    <div>
      <h1>{student.firstname + " " + student.lastname}</h1>
      <img src={student.imageUrl} alt="student_image" width="250px"></img>
      <CampusOfStudent campus={student.campus} />
      <h3>Email: {student.email}</h3>
      {student.gpa && <h3>GPA: {student.gpa}</h3>}
      <Link to={'/students'} >
        <button onClick={() => deleteStudent(student.id)}>Delete</button>
      </Link>
      <Link to={`/editstudent/${student.id}`}>
        <button> Edit </button>
      </Link>
    </div>
  );

};

const CampusOfStudent = ({ campus }) => {
  if (!campus) {
    return (<h3>This student is not enrolled at any campus.</h3>)
  } else {
    return (
      <Link to={`/campus/${campus.id}`}>
        <h2>{campus.name}</h2>
      </Link>
    )
  }
}

export default StudentView;
