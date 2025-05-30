import Education from './CV/Education.jsx';
import Experience from './CV/Experience.jsx';
import Interests from './CV/Interests.jsx';
import Portfolio from './CV/Portfolio.jsx';
import Profile from './CV/Profile.jsx';
import Skills from './CV/Skills.jsx';

function CV() {
  return (
    <>
      <Profile />
      <Education />
      <Experience />
      <Portfolio />
      <Skills />
      <Interests />
    </>
  );
}

export default CV;
