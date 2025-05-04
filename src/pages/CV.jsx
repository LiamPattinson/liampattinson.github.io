import {
  DoubleArrow,
  Email,
  ExpandLess,
  ExpandMore,
  GitHub,
} from '@mui/icons-material';
import {
  Box,
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SvgIcon,
  Typography,
} from '@mui/material';
import { useState } from 'react';

import OrcidSvg from '../assets/orcid.svg';

const golden_ratio = 1.6180339887;
const img_width = `${100 - 100 / golden_ratio}%`;
const text_width = `${100 / golden_ratio}%`;

function TwoBox({ img, text, img_left }) {
  let img_box = (
    <Box
      sx={{
        p: 2,
        width: { xs: '100%', md: img_width },
        flexShrink: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        order: img_left ? undefined : { xs: 1, md: 2 },
      }}
    >
      {/* Extra box just adds margin on small screens */}
      <Box
        sx={{
          display: 'flex',
          width: { xs: '75%', md: '100%' },
        }}
      >
        {img}
      </Box>
    </Box>
  );
  let text_box = (
    <Box
      sx={{
        p: 2,
        width: { xs: '100%', md: text_width },
        flexWrap: 'wrap',
        textAlign: 'left',
        display: 'flex',
        flexDirection: 'column',
        order: img_left ? undefined : { xs: 2, md: 1 },
      }}
    >
      {text}
    </Box>
  );
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        p: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          maxWidth: '80em',
          height: 'auto',
          flexWrap: 'wrap',
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        {img_left ? img_box : text_box}
        {img_left ? text_box : img_box}
      </Box>
    </Box>
  );
}

function ContactItem({ primary, secondary, href, icon }) {
  return (
    <ListItem>
      <ListItemButton href={href}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={primary} secondary={secondary} />
      </ListItemButton>
    </ListItem>
  );
}

function Profile() {
  let img = (
    <img
      src="/src/assets/profile.jpg"
      style={{
        maxWidth: '100%',
        maxHeight: '100%',
        objectFit: 'contain',
      }}
      alt="Profile image"
    />
  );
  let text = (
    <>
      <Typography
        variant="h1"
        sx={{ width: '100%', mb: 2, fontWeight: 'light' }}
      >
        Liam Pattinson
      </Typography>
      <Typography
        variant="h3"
        sx={{ width: '100%', mb: 3, fontWeight: 'light' }}
      >
        Research Software Engineer
      </Typography>
      <Typography
        variant="h3"
        sx={{ width: '100%', mb: 3, fontWeight: 'light' }}
      >
        University of York Plasma Institute
      </Typography>
      <Typography
        variant="h5"
        sx={{ width: '100%', mb: 1, fontWeight: 'light' }}
      >
        Contact:
      </Typography>
      <List dense="true">
        <ContactItem
          primary="Email"
          secondary="liam.pattinson@york.ac.uk"
          href="mailto:liam.pattinson@york.ac.uk"
          icon={<Email />}
        />
        <ContactItem
          primary="GitHub"
          secondary="LiamPattinson"
          href="https://github.com/LiamPattinson"
          icon={<GitHub />}
        />
        <ContactItem
          primary="ORCID"
          secondary="https://orcid.org/0000-0001-8604-6904"
          href="https://orcid.org/0000-0001-8604-6904"
          icon={
            <img
              src={OrcidSvg}
              alt="ORCID"
              style={{ width: '1.5em', height: '1.5em' }}
            />
          }
        />
        {/* TODO: Should really get a LinkedIn! */}
      </List>
    </>
  );
  return <TwoBox img={img} text={text} img_left={true} />;
}

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

function Paragraph({ children }) {
  return (
    <Typography
      variant="body1"
      sx={{ mb: 2, textAlign: 'justify', fontWeight: 'light' }}
    >
      {children}
    </Typography>
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

  let phdDescription = () => (
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

  let mphilDescription = () => (
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
    <>
      <Typography
        variant="h2"
        sx={{ width: '100%', mb: 2, fontWeight: 'light' }}
      >
        Education
      </Typography>
      <List dense="true">
        <EducationItem
          state={phdOpen}
          handler={handlePhd}
          degree="PhD Scientific Computing"
          grade="Corrections Ongoing"
          dates="2016 - 2021"
          description={phdDescription()}
        />
        <EducationItem
          state={mphilOpen}
          handler={handleMphil}
          degree="MPhil Scientific Computing"
          grade="Distinction"
          dates="2015 - 2016"
          description={mphilDescription()}
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
    </>
  );

  return <TwoBox img={img} text={text} img_left={false} />;
}

export default function CV() {
  return (
    <>
      <Profile />
      <Education />
    </>
  );
}
