/*==================================================
StudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the single student view page.
================================================== */
const StudentView = (props) => {
  const { student } = props;

  // Render a single Student view
  if (!student.gpa) {

  }
  return (
    <div>
      <h1>{student.firstname + " " + student.lastname}</h1>
      <h3>{student.campus.name}</h3>
      <img src={student.imageUrl} alt={student.name} width="250px"></img>
      <h3>Email: {student.email}</h3>
      {student.gpa &&
        <h3>GPA: {student.gpa}</h3>
      }
    </div>
  );

};

export default StudentView;
