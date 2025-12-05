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

import { CentreBox } from './components.jsx';

function DevelopmentItem({ primary, secondary }) {
  return (
    <ListItem>
      <ListItemIcon>
        <ArrowForward />
      </ListItemIcon>
      <ListItemText primary={primary} secondary={secondary} />
    </ListItem>
  );
}

function DevelopmentCategory({ state, handler, category, children }) {
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
        aria-label={`Expand '${category}' details`}
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

function Development() {
  const [talksOpen, setTalksOpen] = useState(false);
  const [eventsOpen, setEventsOpen] = useState(false);
  const [otherOpen, setOtherOpen] = useState(false);

  const handleTalks = () => {
    setTalksOpen((prev) => !prev);
  };
  const handleEvents = () => {
    setEventsOpen((prev) => !prev);
  };
  const handleOther = () => {
    setOtherOpen((prev) => !prev);
  };

  return (
    <CentreBox title="Professional Development">
      <List>
        <DevelopmentCategory
          state={talksOpen}
          handler={handleTalks}
          category="Conference Talks and Presentations"
        >
          <DevelopmentItem
            primary="FortranCon 2025, Online, November 4th 2025"
            secondary="Delivered a talk on the Fortitude linter."
          />
          <DevelopmentItem
            primary="RSECon2025, University of Warwick, September 9th-11th 2025"
            secondary="Fortitude workshop at the 'Back to the Fortran Future 2' satellite event."
          />
          <DevelopmentItem
            primary="N8CIR RSE Annual Meetup, York, July 10th 2025"
            secondary="Lightning talk on the Fortran Tooling HackWeek."
          />
          <DevelopmentItem
            primary="York Plasma Institute Seminar, June 6th 2025"
            secondary="A talk discussing the PlasmaFAIR project, Fortitude, and the RSE career path."
          />
          <DevelopmentItem
            primary="University of Cambridge RSE Seminar, May 22nd 2025"
            secondary="A talk on the Fortitude linter."
          />
          <DevelopmentItem
            primary="RSECon2024, Newcastle, September 3rd-5th 2024"
            secondary="Poster presentation on the PlasmaFAIR project."
          />
          <DevelopmentItem
            primary="EPS Plasma Physics Conference 2024, Salamanca (Spain), July 8th-12th 2024"
            secondary="A poster presentation on the PlasmaFAIR project."
          />
          <DevelopmentItem
            primary="IOP Plasma Physics Conference 2024, York, April 8th-11th 2024"
            secondary="Poster presentation on the PlasmaFAIR project."
          />
          <DevelopmentItem
            primary="University of Cambridge RSE Seminar, May 18th 2023"
            secondary="A talk on best practices in Python packaging."
          />
        </DevelopmentCategory>
        <DevelopmentCategory
          state={eventsOpen}
          handler={handleEvents}
          category="Events"
        >
          <DevelopmentItem
            primary="Fortran Tooling HackWeek, Online, May 27th-30th 2025"
            secondary={`Organised a four-day online hackathon to improve Fortran developer tooling.
              Included advertising the event, mentoring participants, and handling
              communications. Coordinated the introductory talks, regular stand-up meetings,
              and the closing presentations.`}
          />
        </DevelopmentCategory>
        <DevelopmentCategory
          state={otherOpen}
          handler={handleOther}
          category="Other Professional Development"
        >
          <DevelopmentItem
            primary="SocRSE Mentoring Scheme, 2025"
            secondary={`Participated as both a mentor and a mentee. In the latter role, I aimed to raise
              my professional profile within the RSE community.`}
          />
          <DevelopmentItem
            primary="Attended SSI Collaborations Workshop 2025"
            secondary="Sterling, 13th-15th May 2025"
          />
          <DevelopmentItem
            primary="Attended Open Source Software in Fusion Energy 2025"
            secondary="Online, 18th March 2025"
          />
          <DevelopmentItem
            primary="Attended N8CIR RSE Annual Meetup 2024"
            secondary="York, 18th July 2024"
          />
          <DevelopmentItem
            primary="Attended RSECon2023"
            secondary="Swansea, September 5th-7th 2023"
          />
          <DevelopmentItem
            primary="Attended N8CIR RSE Annual Meetup 2023"
            secondary="Durham, 18th June 2023"
          />
          <DevelopmentItem
            primary="Attended RSECon2022"
            secondary="Newcastle, September 6th-8th 2022"
          />
        </DevelopmentCategory>
      </List>
    </CentreBox>
  );
}

// Other:
// Attendance at RSECon2022 and RSECon2023
// Attendance at CollaborationsWorkshop 2025
// Attendance at N8CIR RSE Annual Meetup 2024 (remotely), 2023
export default Development;
