import { DoubleArrow, ExpandLess, ExpandMore } from '@mui/icons-material';
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

import { Paragraph, TwoBox } from './layout.jsx';

function EducationItem({ state, handler, degree, dates, grade, description }) {
  // If a description is needed, also add state and handler.
  // If not, just add the degree, dates, and grade.
  const has_description = description !== undefined;
  let list_item = (
    <ListItemButton
      onClick={handler}
      disableRipple={!has_description}
      sx={{
        cursor: has_description ? 'pointer' : 'default',
        '&:hover': {
          backgroundColor: has_description ? 'action.hover' : 'inherit',
        },
      }}
    >
      <ListItem>
        <ListItemIcon>
          <DoubleArrow />
        </ListItemIcon>
        <ListItemText primary={degree} secondary={dates} />
        <Typography variant="caption" sx={{ fontWeight: 'light', mr: 1 }}>
          {grade}
        </Typography>
        {has_description ? state ? <ExpandLess /> : <ExpandMore /> : null}
      </ListItem>
    </ListItemButton>
  );
  return (
    <>
      {list_item}
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

function Education() {
  const [phdOpen, setPhdOpen] = useState(false);
  const [mphilOpen, setMphilOpen] = useState(false);

  const handlePhd = () => {
    setPhdOpen((prev) => !prev);
  };
  const handleMphil = () => {
    setMphilOpen((prev) => !prev);
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

  let img = (
    <img
      src="/src/assets/clare_college.jpg"
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
        description={phdDescription}
      />
      <EducationItem
        state={mphilOpen}
        handler={handleMphil}
        degree="MPhil Scientific Computing"
        grade="Distinction"
        dates="2015 - 2016"
        description={mphilDescription}
      />
      <EducationItem
        degree="MSci Natural Sciences (Physics)"
        grade="Upper Second Class"
        dates="2014 - 2015"
      />
      <EducationItem
        degree="MA (CANTAB) Natural Sciences (Physics)"
        grade="First Class"
        dates="2011 - 2014"
      />
    </List>
  );

  return <TwoBox title="Education" img={img} text={text} img_left={false} />;
}

export default Education;
