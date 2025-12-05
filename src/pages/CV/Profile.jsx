import { Email, GitHub } from '@mui/icons-material';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';

import OrcidSvg from '../../assets/orcid.svg';
import ProfileImg from '../../assets/profile.png';
import { Heading } from '../../core_components.jsx';
import { TwoBox } from './components.jsx';

function ContactItem({ primary, secondary, href, icon }) {
  return (
    <ListItem>
      <ListItemButton href={href} aria-label={`Link to ${primary}`}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={primary} secondary={secondary} />
      </ListItemButton>
    </ListItem>
  );
}

function Profile() {
  let img = (
    <img
      src={ProfileImg}
      style={{
        maxWidth: '100%',
        maxHeight: '100%',
        objectFit: 'contain',
      }}
      alt="Profile image of Liam Pattinson"
    />
  );
  let text = (
    <>
      <Typography
        variant="h5"
        component="div"
        sx={{ width: '100%', mb: 3, fontWeight: 'light', textAlign: 'center' }}
      >
        Research Software Engineer
        <br />
        University of York Plasma Institute
      </Typography>

      <List dense={true}>
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
              alt=""
              aria-hidden="true"
              style={{ width: '1.5em', height: '1.5em' }}
            />
          }
        />
        {/* TODO: Should really get a LinkedIn! */}
      </List>
    </>
  );
  return (
    <TwoBox
      title="Liam Pattinson"
      img={img}
      text={text}
      img_left={false}
      main
    />
  );
}

export default Profile;
