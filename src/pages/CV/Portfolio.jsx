import { ExpandLess, ExpandMore, GitHub } from '@mui/icons-material';
import {
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { useState } from 'react';

import { Paragraph } from '../../core_components.jsx';
import { CentreBox } from './components.jsx';

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
    <CentreBox title="Portfolio">
      <List>
        <PortfolioItem
          state={fortitudeOpen}
          handler={handleFortitude}
          project="Fortitude"
          organisation="PlasmaFAIR"
          description="A modern Fortran linter, written in Rust"
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
    </CentreBox>
  );
}

export default Portfolio;
