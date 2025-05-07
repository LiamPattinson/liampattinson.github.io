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
import { TwoBox } from './components.jsx';

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
      src={ProfileImg}
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
        variant="h5"
        sx={{ width: '100%', mb: 3, fontWeight: 'light' }}
      >
        Research Software Engineer
      </Typography>
      <Typography
        variant="h5"
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
  return (
    <TwoBox title="Liam Pattinson" img={img} text={text} img_left={true} main />
  );
}

export default Profile;
