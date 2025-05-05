import {
  ArrowForward,
  DoubleArrow,
  Email,
  ExpandLess,
  ExpandMore,
  GitHub,
  Star,
} from '@mui/icons-material';
import {
  Box,
  Collapse,
  IconButton,
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

function CentreBox({ maxWidth, children }) {
  maxWidth = maxWidth || '80em';
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
          maxWidth: { maxWidth },
          height: 'auto',
          textAlign: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

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
    <CentreBox>
      {img_left ? img_box : text_box}
      {img_left ? text_box : img_box}
    </CentreBox>
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
    </>
  );

  return <TwoBox img={img} text={text} img_left={false} />;
}

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
      src="/src/assets/uni_of_york.jpg"
      style={{
        maxWidth: '100%',
        maxHeight: '100%',
        objectFit: 'contain',
      }}
      alt="Experience"
    />
  );

  let text = (
    <>
      <Typography
        variant="h2"
        sx={{ width: '100%', mb: 2, fontWeight: 'light' }}
      >
        Experience
      </Typography>
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
    </>
  );

  return <TwoBox img={img} text={text} img_left={true} />;
}

function PortfolioItem({
  state,
  handler,
  project,
  organisation,
  description,
  long_description,
}) {
  let project_url = project.replace(' ', '_');
  let href = `https://github.com/${organisation}/${project_url}`;
  let badge = (
    <img
      src={`https://img.shields.io/github/stars/${organisation}/${project_url}`}
    />
  );
  return (
    <>
      <ListItemButton
        onClick={handler}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          textAlign: 'left',
          width: '100%',
        }}
      >
        <ListItem sx={{ width: '100%' }}>
          <ListItemIcon>
            <IconButton href={href} target="_blank">
              <GitHub />
            </IconButton>
          </ListItemIcon>
          <ListItemText primary={project} secondary={description} />
          {badge}
          {state ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
      </ListItemButton>
      <Collapse in={state} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem width="100%">
            <ListItemText primary={long_description} />
          </ListItem>
        </List>
      </Collapse>
    </>
  );
}

function Portfolio() {
  const [fortitudeOpen, setFortitudeOpen] = useState(false);
  const [pyrokineticsOpen, setPyrokineticsOpen] = useState(false);
  const [packagingOpen, setPackagingOpen] = useState(false);

  const handleFortitude = () => {
    setFortitudeOpen((prev) => !prev);
  };
  const handlePyrokinetics = () => {
    setPyrokineticsOpen((prev) => !prev);
  };
  const handlePackaging = () => {
    setPackagingOpen((prev) => !prev);
  };

  let fortitudeDescription = (
    <>
      <Paragraph>
        Fortitude is a Fortran linter, written in Rust and installable using
        Python. Inspired by (and borrowing heavily from) the Python linter Ruff,
        Fortitude combines incredible speed, robust parsing, and a user-friendly
        interface familiar to Python developers.
      </Paragraph>
      <Paragraph>
        Originally developed as an in-house tool for the PlasmaFAIR project,
        Fortitude has quickly gained widespread recognition within the Fortran
        community. The initial prototype was created in just a few days,
        requiring me to quickly learn the Rust programming language, the
        TreeSitter parsing framework, and some of the inner workings of Ruff. By
        leveraging these technologies and following the philosophy of "don't
        reinvent the wheel", Fortitude has jumped straight to the cutting edge.
      </Paragraph>
    </>
  );

  let pyrokineticsDescription = (
    <>
      <Paragraph>
        Pyrokinetics is a Python package that aims to standarise gyrokinetic
        analysis, a branch of plasma physics commonly used to model turbulent
        behaviour in magnetically confined fusion plasmas. The package provides
        a common interface for reading input and output data from various
        gyrokinetic codes and facilitates conversion between them.
      </Paragraph>
      <Paragraph>
        My contribution to this project involved refactoring the existing
        codebase to improve its extensibility and maintainability. I implemented
        a plugin-based architecture, enabling developers to more easily add
        support for new gyrokinetic codes without modifying the core
        functionality. Following this work, Pyrokinetics has evolved into a
        community-driven project with a growing number of contributors.
      </Paragraph>
    </>
  );

  let packagingDescription = (
    <>
      <Paragraph>
        Python packaging can be a frustrating and confusing process,
        particularly for researchers who may not have a background in software
        development. To remedy this, I created a comprehensive tutorial using
        the Carpentries Workbench to guide users through upgrading their Python
        scripts into reusable modules and, eventually, into fully installable
        packages hosted on PyPI.
      </Paragraph>
      <Paragraph>
        The tutorial covers a wide range of topics, from the fundamentals of
        Python packaging to more advanced topics such as versioning,
        distribution, and the evolution Python packaging tools. By simplifying
        the packaging process, this resource empowers researchers to share their
        work more effectively and adopt best practices in software development.
      </Paragraph>
    </>
  );

  return (
    <CentreBox maxWidth="50em">
      <Typography
        variant="h2"
        sx={{ width: '100%', mb: 2, fontWeight: 'light' }}
      >
        Portfolio
      </Typography>
      <Box
        sx={{
          p: 2,
          width: '100%',
          flexWrap: 'wrap',
          textAlign: 'left',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <List>
          <PortfolioItem
            state={fortitudeOpen}
            handler={handleFortitude}
            project="Fortitude"
            organisation="PlasmaFAIR"
            description="A Fortran linter, written in Rust"
            long_description={fortitudeDescription}
          />
          <PortfolioItem
            state={pyrokineticsOpen}
            handler={handlePyrokinetics}
            project="Pyrokinetics"
            organisation="pyro-kinetics"
            description="A Python package for gyrokinetic analysis"
            long_description={pyrokineticsDescription}
          />
          <PortfolioItem
            state={packagingOpen}
            handler={handlePackaging}
            project="Python Packaging"
            organisation="carpentries-incubator"
            description="A tutorial on Python packaging"
            long_description={packagingDescription}
          />
        </List>
      </Box>
    </CentreBox>
  );
}

function SkillItem({ primary, secondary }) {
  return (
    <ListItem>
      <ListItemIcon>
        <ArrowForward />
      </ListItemIcon>
      <ListItemText primary={primary} secondary={secondary} />
    </ListItem>
  );
}

function SkillCategory({ state, handler, category, children }) {
  return (
    <>
      <ListItemButton
        onClick={handler}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          textAlign: 'left',
          width: '100%',
        }}
      >
        <ListItem sx={{ width: '100%' }}>
          <ListItemText primary={category} />
          {state ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
      </ListItemButton>
      <Collapse in={state} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {children}
        </List>
      </Collapse>
    </>
  );
}

function Skills() {
  const [languagesOpen, setLanguagesOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);

  const handleLanguages = () => {
    setLanguagesOpen((prev) => !prev);
  };
  const handleTools = () => {
    setToolsOpen((prev) => !prev);
  };

  let pythonDescription = `Expert level. Developed multiple packages and familiar with high-level
      language features, the standard library, the scientific ecosystem, and
      developer tooling.`;
  let cppDescription = `Expert level. Comfortable with modern C++ features and idioms, template
      metaprogramming, the STL, and parallelisation via OpenMP and MPI. Can
      additionally manage complex build systems using CMake.`;
  let fortranDescription = `Intermediate level. Familiar with modern Fortran features, including the
      use of modules, derived types, and parallelisation via OpenMP and MPI.
      Can additionally manage complex build systems using CMake.`;
  let rustDescription = `Intermediate level. Used to develop the Fortitude linter. Familiar with
      the Rust ecosystem and idioms, and comfortable with developer tooling. No
      longer fighting the borrow checker!`;
  let javascriptDescription = `Beginner level. Comfortable with React, and having fun figuring things out.
    Used it to write this!`;
  return (
    <CentreBox maxWidth="50em">
      <Typography
        variant="h2"
        sx={{ width: '100%', mb: 2, fontWeight: 'light' }}
      >
        Skills
      </Typography>
      <Box
        sx={{
          p: 2,
          width: '100%',
          flexWrap: 'wrap',
          textAlign: 'left',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <List>
          <SkillCategory
            state={languagesOpen}
            handler={handleLanguages}
            category="Programming Languages"
          >
            <SkillItem primary="Python" secondary={pythonDescription} />
            <SkillItem primary="C++" secondary={cppDescription} />
            <SkillItem primary="Fortran" secondary={fortranDescription} />
            <SkillItem primary="Rust" secondary={rustDescription} />
            <SkillItem primary="JavaScript" secondary={javascriptDescription} />
          </SkillCategory>
          <SkillCategory
            state={toolsOpen}
            handler={handleTools}
            category="Other Tools and Libraries"
          >
            <SkillItem
              primary="Git"
              secondary="Version control."
            />
            <SkillItem
              primary="GitHub"
              secondary="Collaborative coding, code review, project management, etc."
            />
            <SkillItem
              primary="GitHub Actions"
              secondary="Automation, continuous integration."
            />
            <SkillItem
              primary="readthedocs"
              secondary="Automated documentation hosting."
            />
            <SkillItem
              primary="Python Developer Tools"
              secondary="pip/uv, Black, Ruff, mypy, venv, Setuptools, etc."
            />
            <SkillItem
              primary="Python Scientific Ecosystem"
              secondary="NumPy, SciPy, Matplotlib, Pandas, Xarray, etc."
            />
            <SkillItem primary="pytest" secondary="Python testing framework." />
            <SkillItem
              primary="Sphinx"
              secondary="Python documentation generation."
            />
            <SkillItem
              primary="CMake"
              secondary="Build system for C, C++, and Fortran. Comfortable with modern CMake techniques."
            />
            <SkillItem
              primary="GoogleTest"
              secondary="C++ testing framework."
            />
            <SkillItem
              primary="pfUnit"
              secondary="Fortran testing framework."
            />
            <SkillItem
              primary="Doxygen"
              secondary="Documentation generation for C/C++."
            />
            <SkillItem
              primary="OpenMP"
              secondary="Multithreading parallelism in C/C++/Fortran."
            />
            <SkillItem primary="MPI" secondary="Multiprocessing parallelism." />
            <SkillItem
              primary="Cargo"
              secondary="Rust build system and general-purpose development tool"
            />
            <SkillItem primary="Slurm" secondary="HPC workload manager." />
            <SkillItem primary="VSCode" secondary="Preferred IDE." />
            <SkillItem primary="Vim" secondary="The superior text editor." />
          </SkillCategory>
        </List>
      </Box>
    </CentreBox>
  );
}

export default function CV() {
  return (
    <>
      <Profile />
      <Education />
      <Experience />
      <Portfolio />
      <Skills />
    </>
  );
}
