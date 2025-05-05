import { DoubleArrow, ExpandLess, ExpandMore, Star } from '@mui/icons-material';
import {
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { useState } from 'react';

import UniOfYorkImg from '../../assets/uni_of_york.jpg';
import { Paragraph, TwoBox } from './layout.jsx';

function ExperienceItem({
  state,
  handler,
  title,
  organisation,
  dates,
  description,
  icon,
}) {
  icon = icon || <DoubleArrow />;
  return (
    <>
      <ListItemButton onClick={handler}>
        <ListItem>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={title} secondary={organisation} />
          <Typography variant="caption" sx={{ fontWeight: 'light', mr: 1 }}>
            {dates}
          </Typography>
          {state ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
      </ListItemButton>
      <Collapse in={state} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem>
            <ListItemText primary={description} />
          </ListItem>
        </List>
      </Collapse>
    </>
  );
}

function Experience() {
  const [rseOpen, setRseOpen] = useState(false);
  const [btOpen, setBtOpen] = useState(false);
  const [basOpen, setBasOpen] = useState(false);

  const handleRse = () => {
    setRseOpen((prev) => !prev);
  };
  const handleBt = () => {
    setBtOpen((prev) => !prev);
  };
  const handleBas = () => {
    setBasOpen((prev) => !prev);
  };

  let rseDescription = (
    <>
      <Paragraph>
        I am currently working as a Research Software Engineer (RSE) on the
        PlasmaFAIR project at the University of York Plasma Institute. Working
        alongside Dr Peter Hill, my role focuses on improving the sustainability
        of scientific software used in plasma physics research.
      </Paragraph>
      <Paragraph>
        My work is guided by the FAIR principles, which emphasise that software,
        data, and metadata should be Findable, Accessible, Interoperable, and
        Reusable. This involves a combination of small-scale improvements, such
        as writing documentation and implementing unit tests for existing
        software, as well as larger-scale efforts, such as developing entirely
        new tools libraries to support the plasma physics community.
      </Paragraph>
      <Paragraph>
        During my time at the University of York, I have experienced a quantum
        leap in my skills as a software engineer. I have gained expertise in
        developing and maintaining complex software projects using languages
        such as C, C++, Python, Fortran, and Rust, and have additionally honed
        my proficiency in modern software engineering practices, including
        version control, continuous integration, code review, documentation, and
        testing. Above all, I have learned that effective communication and
        collaboration are essential to the success of any software engineering
        project.
      </Paragraph>
      <Paragraph>
        In addition to my technical development, I have gained valuable
        experience in project management, public speaking, and academic
        engagement. I have been an active contributor to the University of York
        Coding Club, where I have taught topics such as Python packaging and
        optimisation. I have also contributed to organising the York Plasma
        Institute student seminar series and regular postdoctoral development
        meetings. Furthermore, I have presented my work at several prominent
        conferences, including the European Physical Society (EPS) Conference on
        Plasma Physics and RSECon.
      </Paragraph>
    </>
  );

  let btDescription = (
    <>
      <Paragraph>
        During my time at BT Research, I analysed broadband fault data from
        across the United Kingdom to develop a predictive model linking
        broadband quality with the likelihood of customers requesting an
        engineer call-out.
      </Paragraph>
      <Paragraph>
        I implemented machine learning models using Python and its ecosystem of
        libraries, including pandas, scikit-learn, and TensorFlow. The data was
        sourced via SQL queries from a large Spark/Hadoop cluster, enabling the
        processing of live, high-volume datasets. This project provided me with
        valuable experience in data analysis, machine learning, distributed
        computing, and working with 'big data' technologies.
      </Paragraph>
    </>
  );

  let basDescription = (
    <>
      <Paragraph>
        Following the conclusion of my undergraduate studies, I undertook a
        summer internship at the British Antarctic Survey. During this time, I
        developed a model to predict the behavior of low-energy, low-altitude
        electrons in the Earth's radiation belts. in the Earth's radiation
        belts.
      </Paragraph>
      <Paragraph>
        This model was used to generate boundary conditions from POES satellite
        data for the British Antarctic Survey Radiation Belt Model simulation
        code. My work primarily involved using the language IDL for data
        processing and visualisation.
      </Paragraph>
    </>
  );

  let img = (
    <img
      src={UniOfYorkImg}
      style={{
        maxWidth: '100%',
        maxHeight: '100%',
        objectFit: 'contain',
      }}
      alt="University of York"
    />
  );

  let text = (
    <List dense="true">
      <ExperienceItem
        state={rseOpen}
        handler={handleRse}
        title="Research Software Engineer Associate"
        organisation="York Plasma Institute, University of York, UK"
        dates="2022 - Present"
        description={rseDescription}
        icon={<Star />}
      />
      <ExperienceItem
        state={btOpen}
        handler={handleBt}
        title="Data Science Internship"
        organisation="BT Research, Ipswich, UK"
        dates="Mar. 2019 - Jun. 2019"
        description={btDescription}
      />
      <ExperienceItem
        state={basOpen}
        handler={handleBas}
        title="Summer Internship"
        organisation="British Antarctic Survey, Cambridge, UK"
        dates="Jul. 2015 - Sep. 2015"
        description={basDescription}
      />
    </List>
  );

  return <TwoBox title="Experience" img={img} text={text} img_left={true} />;
}

export default Experience;
