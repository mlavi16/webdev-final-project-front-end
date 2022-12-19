/*==================================================
HomePageView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the home page.
================================================== */
import { Link } from 'react-router-dom';


const HomePageView = () => {
  // Render Home page view
  return (
    <div >
      <h1>Home Page</h1>
      <Link to={'/campuses'} >
        <h2 variant="contained" color="primary" style={{ marginRight: '10px' }}>
          All Campuses
        </h2>
      </Link>
      <img src="https://siteimages.textbooks.com/uploads/2014/10/Textbookscom-Blog-Most-Beautiful-College-Campuses-Prettiest-College-Campuses-Campus-Tours.jpeg" width="400" alt="collage of campuses"/>
      <br /> <br />
      <Link to={'/students'} >
        <h2 variant="contained" color="primary">
          All Students
        </h2>
      <img src="https://englishtribuneimages.blob.core.windows.net/gallary-content/2020/3/Desk/2020_3$largeimg_210030787.jpeg" width="400" alt="students standing in lines with their hands up"/>
      </Link>
    </div>
  );
}

export default HomePageView;
