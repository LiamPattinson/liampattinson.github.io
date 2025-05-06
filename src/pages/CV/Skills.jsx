import { ArrowForward, ExpandLess, ExpandMore } from '@mui/icons-material';
import {
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { useState } from 'react';

import { CentreBox, Paragraph } from './layout.jsx';

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
    <CentreBox title="Technical Skills">
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
          <SkillItem primary="Git" secondary="Version control." />
          <SkillItem
            primary="GitHub"
            secondary="Collaborative coding, code review, project management, etc."
          />
          <SkillItem
            primary="GitHub Actions"
            secondary="Automation, continuous integration."
          />
          <SkillItem
            primary="Docker"
            secondary="Containerisation and reproducibility."
          />
          <SkillItem
            primary="Apptainer"
            secondary="Containerisation on HPC systems."
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
          <SkillItem primary="GoogleTest" secondary="C++ testing framework." />
          <SkillItem primary="pfUnit" secondary="Fortran testing framework." />
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
            secondary="Rust build system and general-purpose development tool."
          />
          <SkillItem primary="LaTeX" secondary="Scientific typesetting." />
          <SkillItem primary="Slurm" secondary="HPC workload manager." />
          <SkillItem primary="VSCode" secondary="Preferred IDE." />
          <SkillItem primary="Vim" secondary="The superior text editor." />
        </SkillCategory>
      </List>
    </CentreBox>
  );
}

export default Skills;
