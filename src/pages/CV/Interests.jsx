import { ArrowForward, ExpandLess, ExpandMore } from '@mui/icons-material';
import {
  Collapse,
  ImageList,
  ImageListItem,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { useState } from 'react';

import { TwoBox } from './layout.jsx';

function InterestsCategory({ state, handler, bullet, interest, children }) {
  let list_item = (
    <ListItemButton onClick={handler}>
      <ListItem>
        <ListItemIcon>{bullet}</ListItemIcon>
        <ListItemText primary={interest} />
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

function InterestsItem({ children }) {
  let text = (
    <Typography variant="body1" sx={{ fontWeight: 'light' }}>
      {children}
    </Typography>
  );
  return (
    <ListItem>
      <ListItemIcon>
        <ArrowForward />
      </ListItemIcon>
      <ListItemText primary={text} />
    </ListItem>
  );
}

function Interests() {
  const [languagesOpen, setLanguagesOpen] = useState(false);
  const [archeryOpen, setArcheryOpen] = useState(false);
  const [fitnessOpen, setFitnessOpen] = useState(false);
  const [otherOpen, setOtherOpen] = useState(false);

  const handleLanguages = () => {
    setLanguagesOpen((prev) => !prev);
  };
  const handleArchery = () => {
    setArcheryOpen((prev) => !prev);
  };
  const handleFitness = () => {
    setFitnessOpen((prev) => !prev);
  };
  const handleOther = () => {
    setOtherOpen((prev) => !prev);
  };

  let img = (
    <ImageList cols={1}>
      <ImageListItem>
        <img
          src="/src/assets/archery.jpg"
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            objectFit: 'contain',
          }}
          alt="Archery at Churchill College, Cambridge"
        />
      </ImageListItem>
      <ImageListItem>
        <img
          src="/src/assets/ultramarines_phobos_librarian.jpg"
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            objectFit: 'contain',
          }}
          alt="A Phobos Librarian from Warhammer 40k"
        />
      </ImageListItem>
    </ImageList>
  );

  let text = (
    <List dense="true">
      <InterestsCategory
        state={languagesOpen}
        handler={handleLanguages}
        bullet="🇫🇷"
        interest="Languages"
      >
        <InterestsItem>
          I find language learning to be a rewarding and enriching experience. I
          value the insights that come with learning a new language and believe
          that consistency and patience are key to achieving proficiency over
          time.
        </InterestsItem>
        <InterestsItem>
          Since 2023, I have been studying French through the University of
          York's Languages for All programme. I have achieved a
          lower-intermediate proficiency (CEFR A2+/B1) and plan to continue my
          studies to a higher level.
        </InterestsItem>
        <InterestsItem>
          I studied German to an upper-intermediate standard (CEFR B2) at the
          University of Cambridge Language Centre between 2017 and 2018.
          Although my skills have become rusty, I took a short German short
          course at the University of York in 2024 to refresh my knowledge, and
          I'm keen to resume my studies after achieving a greater proficiency in
          French.
        </InterestsItem>
      </InterestsCategory>
      <InterestsCategory
        state={archeryOpen}
        handler={handleArchery}
        bullet="🏹"
        interest="Archery"
      >
        <InterestsItem>
          Since taking up archery in 2015, I have been an active member of both
          Cambridge University Bowmen and the York Archers Society. In addition
          to regularly practicing the sport, I have contributed these clubs by
          taking on committee roles and assisting on beginners courses.
        </InterestsItem>
        <InterestsItem>
          I competed regularly for Cambridge University Bowmen, achieving
          consistent success in the Gents Barebow category at both student and
          county-level competitions. Highlights of my competitive career include
          participating in the BUCS Outdoor Championships, where I earned a
          bronze medal on the second day of the 2018 event and a team silver
          medal in 2021.
        </InterestsItem>
        <InterestsItem>
          I held several committee roles with Cambridge University Bowmen,
          including Secretary, Equipment Officer, Tournaments Officer, and
          Webmaster. In these roles, I contributed to the smooth operation of
          the club by managing equipment, organising tournaments, maintaining
          the club's website, and supporting its overall administration.
        </InterestsItem>
        <InterestsItem>
          I'm currently serving as Tournaments Officer for the York Archers
          Society, where I am responsible for organising and running
          competitions for the club. These include regular indoor events, clout
          shoots, and even weekend-long World Record Status tournaments with up
          to 80 participants. The continued success of these events has provided
          a consistent source of revenue for the club.
        </InterestsItem>
      </InterestsCategory>
      <InterestsCategory
        state={fitnessOpen}
        handler={handleFitness}
        bullet="👟"
        interest="Fitness"
      >
        <InterestsItem>
          I have been a regular runner since 2010, participating in events such
          as the Cambridge Half-Marathon, which I have completed three times,
          and numerous ParkRuns in York. Running has helped me develop
          discipline, perseverance, and a strong focus on personal goals.
        </InterestsItem>
        <InterestsItem>
          In addition to running, I engage in resistance training three to four
          times a week to maintain strength and overall fitness. This routine
          has taught me the importance of consistency and balancing different
          aspects of physical health.
        </InterestsItem>
      </InterestsCategory>
      <InterestsCategory
        state={otherOpen}
        handler={handleOther}
        bullet="🖌️"
        interest="Other Interests"
      >
        <InterestsItem>
          I enjoy model making and painting, a hobby that requires patience,
          precision, creativity, and attention to detail. In 2021, I earned a
          bronze award at the online Miniature Painting Open.
        </InterestsItem>
        <InterestsItem>
          I also enjoy nature photography, hiking, and exploring the outdoors. I
          frequently visit local RSPB reserves to capture wildlife and
          landscapes, and have recently enjoyed trips from the Yorkshire Coast
          to the Lake District. In 2024, I completed the Yorkshire Three Peaks
          Challenge in under 10 hours!
        </InterestsItem>
      </InterestsCategory>
    </List>
  );

  return <TwoBox title="Interests" img={img} text={text} img_left={false} />;
}

export default Interests;
