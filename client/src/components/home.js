import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ActiveElections from './ActiveElections'
import AboutCandidates from './AboutCandidates';
import PreviousElections from './PreviousElections';
import UserProfile from './UserProfile';
import BallotIcon from '@mui/icons-material/Ballot';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GroupsIcon from '@mui/icons-material/Groups';
import Logout from '@mui/icons-material/Logout';
import { useLocation, useNavigate } from 'react-router-dom';


const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);


const mdTheme = createTheme();

// Below is the main component for home
function DashboardContent() {
  const [open, setOpen] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [pageTitle, setPageTitle] = React.useState('Active Elections')
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.state);
  
    React.useEffect(() => {
      if(location.state == null){
        console.log('Error!');
      navigate("/");
    }
    }, []);

    // Below is code to switch pages
    function switchPages() {
        switch (page) {
            case 0:
                return <ActiveElections />;
            case 1:
                return <AboutCandidates />;
            case 2:
                return  <PreviousElections />;
            case 3:
                return <UserProfile />;
            default:
                return <ActiveElections />;
        }
    }
  const toggleDrawer = () => {
    setOpen(!open);
  };

  // background-image: linear-gradient(0deg, #138808 33%, #ffffff 33%, #ffffff 66%, #FF9933 66% );
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex'}}>
        <CssBaseline />
        <AppBar position="absolute" open={open} sx={{background: 'linear-gradient(to bottom right, orange, white, green)'}}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
              color: 'black'
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
              align="justify"
            >
              {pageTitle}
            </Typography>
            <IconButton
            onClick={() => {navigate('/')}}
            >
                <Logout />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open} >
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          {/*list items here that show in navbar three dash one*/}
          <List component="nav">    
            <ListItemButton onClick={() => {console.log("Active Elections clicked!");setPage(0);setPageTitle('Active Elections');}}>
                <ListItemIcon>
                    <BallotIcon />
                </ListItemIcon>
                <ListItemText primary="Active Elections" />
            </ListItemButton>
            <ListItemButton onClick={() => {console.log("About Candidates clicked!");setPage(1);setPageTitle('About Candidates');}}>
                <ListItemIcon>
                    <GroupsIcon />
                </ListItemIcon>
                <ListItemText primary="About Candidates" />
            </ListItemButton>
            <ListItemButton onClick={() => {console.log("Previous Elections clicked!");setPage(2);setPageTitle('Previous Elections');}}>
                <ListItemIcon>
                    <FactCheckIcon />
                </ListItemIcon>
                <ListItemText primary="Previous Elections" />
            </ListItemButton>
            <ListItemButton onClick={() => {console.log("User Profile clicked!");setPage(3);setPageTitle('User Profile');}}>
                <ListItemIcon>
                    <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary="User Profile" />
            </ListItemButton>
            <Divider sx={{ my: 1 }} />
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* List of elections */}
              <Grid item xs={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                    {/* Below function switches pages based on click input from navbar */}
                    {switchPages()}
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

//returns home dashboard content
export default function home() {
  return <DashboardContent />;
}