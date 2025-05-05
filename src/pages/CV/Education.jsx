import {
  ArrowForward,
  DoubleArrow,
  ExpandLess,
  ExpandMore,
} from '@mui/icons-material';
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

import ClareCollegeImg from '../../assets/clare_college.jpg';
import { Paragraph, TwoBox } from './layout.jsx';

function EducationItem({ state, handler, degree, dates, grade, children }) {
  let list_item = (
    <ListItemButton onClick={handler}>
      <ListItem>
        <ListItemIcon>
          <DoubleArrow />
        </ListItemIcon>
        <ListItemText primary={degree} secondary={dates} />
        <Typography variant="caption" sx={{ fontWeight: 'light', mr: 1 }}>
          {grade}
        </Typography>
        {state ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
    </ListItemButton>
  );
  return (
    <>
      {list_item}
      <Collapse in={state} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {children}
        </List>
      </Collapse>
    </>
  );
}

function EducationDescription({ bullet, children }) {
  bullet = bullet !== undefined ? <ArrowForward /> : null;
  return (
    <ListItem>
      <ListItemIcon>{bullet}</ListItemIcon>
      <ListItemText primary={children} />
    </ListItem>
  );
}

function Education() {
  const [phdOpen, setPhdOpen] = useState(false);
  const [mphilOpen, setMphilOpen] = useState(false);
  const [msciOpen, setMsciOpen] = useState(false);
  const [maOpen, setMaOpen] = useState(false);
  const [otherOpen, setOtherOpen] = useState(false);

  const handlePhd = () => {
    setPhdOpen((prev) => !prev);
  };
  const handleMphil = () => {
    setMphilOpen((prev) => !prev);
  };
  const handleMsci = () => {
    setMsciOpen((prev) => !prev);
  };
  const handleMa = () => {
    setMaOpen((prev) => !prev);
  };
  const handleOther = () => {
    setOtherOpen((prev) => !prev);
  };

  let phdDescription = (
    <>
      <Paragraph>
        Working at the University of Cambridge under the supervision of
        Professor Mike Payne and sponsored by BT Research, my research was
        focused on the development of numerical methods to model the
        electromagnetic behaviour of complex bundles of wires operating at high
        frequencies.
      </Paragraph>
      <Paragraph>
        My research extended Finite-Difference Time-Domain (FDTD) methods by
        integrating Edelvik's thin-wire model with Bérenger's multiwire method.
        This enhanced model enabled the simulation of arbitrary wire
        arrangements with spacings smaller than the FDTD cell size, supported
        coupling with Convolutional Perfectly Matched Layer (CPML) boundary
        conditions, and accounted for frequency-dependent resistive losses in
        wires.
      </Paragraph>
      <Paragraph>
        It was during my PhD that I developed a strong interest in research
        software engineerings, particularly in the areas of computational
        physics, and high-performance computing. I also gained extensive
        experience in modern C++ programming and the use of Python for data
        analysis and visualisation.
      </Paragraph>
      <Paragraph>
        I also gained valuable teaching experience working with undergraduate
        students between 2016 and 2018, where I conducted small-group
        mathematics supervisions and assisted with practical classes for
        programming in C++. In 2018 and 2019, I also supported practical
        sessions for the Advanced Programming in C++ course, part of the MPhil
        in Scientific Computing programme.
      </Paragraph>
    </>
  );

  let mphilDescription = (
    <>
      <Paragraph>
        The MPhil in Scientific Computing at the University of Cambridge
        provided a comprehensive foundation in numerical methods and parallel
        computing, serving as a precursor to my PhD studies. This one-year
        taught program covered a wide range of topics, equipping me with the
        skills necessary for research in computational physics.
      </Paragraph>
      <Paragraph>
        My dissertation focused on cut-cell methods for the electromagnetic
        Finite-Volume Time-Domain (FVTD) method. These techniques enable the
        simulation of complex reflective surfaces on structured rectilinear
        grids, which are well-suited for powerful parallel computing approaches
        such as domain decomposition and GPU offloading. This work was
        supervised by Professor Mike Payne and sponsored by BT Research.
      </Paragraph>
    </>
  );

  let msciDescription = (
    <>
      <Paragraph>
        The MSci in Natural Sciences (Physics) at the University of Cambridge
        provided me with a stronger foundation in physics, mathematics, and
        computational methods.
      </Paragraph>
      <Paragraph>
        For my final year project, I worked with British Antarctic Survey to
        study radiation belt physics using POES satellite data.
      </Paragraph>
    </>
  );

  let maDescription = (
    <>
      <Paragraph>
        The BA in Natural Sciences (Physics) at the University of Cambridge,
        later upgraded to an MA, provided me with a foundation in physics,
        mathematics, and computational methods.
      </Paragraph>
      <Paragraph>
        In my first year, I studied mathematics, physics, chemistry, and
        computer science. From my second year onwards, I focused on physics and
        mathematics, with a particular interest in computational physics.
      </Paragraph>
    </>
  );

  let img = (
    <img
      src={ClareCollegeImg}
      style={{
        maxWidth: '100%',
        maxHeight: '100%',
        objectFit: 'contain',
      }}
      alt="Clare College, Cambridge"
    />
  );

  let text = (
    <List dense="true">
      <EducationItem
        state={phdOpen}
        handler={handlePhd}
        degree="PhD Scientific Computing"
        grade="Corrections Ongoing"
        dates="2016 - 2021"
      >
        <EducationDescription>{phdDescription}</EducationDescription>
      </EducationItem>
      <EducationItem
        state={mphilOpen}
        handler={handleMphil}
        degree="MPhil Scientific Computing"
        grade="Distinction"
        dates="2015 - 2016"
      >
        <EducationDescription>{mphilDescription}</EducationDescription>
      </EducationItem>
      <EducationItem
        state={msciOpen}
        handler={handleMsci}
        degree="MSci Natural Sciences (Physics)"
        grade="Upper Second Class"
        dates="2014 - 2015"
      >
        <EducationDescription>{msciDescription}</EducationDescription>
      </EducationItem>
      <EducationItem
        state={maOpen}
        handler={handleMa}
        degree="MA (CANTAB) Natural Sciences (Physics)"
        grade="First Class"
        dates="2011 - 2014"
      >
        <EducationDescription>{maDescription}</EducationDescription>
      </EducationItem>
      <EducationItem
        state={otherOpen}
        handler={handleOther}
        degree="Other Training"
      >
        <EducationDescription bullet>
          <Typography variant="body1" sx={{ fontWeight: 'light' }}>
            2025 (ongoing): Attending a course on neural networks with PyTorch.
          </Typography>
        </EducationDescription>
        <EducationDescription bullet>
          <Typography variant="body1" sx={{ fontWeight: 'light' }}>
            2022-Present: Regular attendee of Archer2 training courses on topics
            such as OpenMP, MPI, GPU programming, and performance analysis.
          </Typography>
        </EducationDescription>
        <EducationDescription bullet>
          <Typography variant="body1" sx={{ fontWeight: 'light' }}>
            2018-2019: Completed online courses by Andrew Ng on Coursera. on
            machine learning and neural networks using TensorFlow and Keras.
          </Typography>
        </EducationDescription>
      </EducationItem>
    </List>
  );

  return <TwoBox title="Education" img={img} text={text} img_left={false} />;
}

export default Education;
