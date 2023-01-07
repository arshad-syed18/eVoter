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
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GroupsIcon from '@mui/icons-material/Groups';
import Logout from '@mui/icons-material/Logout';
import { useLocation, useNavigate } from 'react-router-dom';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { green, grey } from '@mui/material/colors';
import UserDetails from './userDetails';
import AddCandidate from './addCandidate';
import PreviousElections from './previousElections';
import CurrentCandidates from './currentCandidates';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import AddElections from './addElection';
import UpcomingElections from './upcomingElections';


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

// Below is the main component for home
function DashboardContent() {
  const [open, setOpen] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [pageTitle, setPageTitle] = React.useState('Current Users');
  const [themeMode, setThemeMode] = React.useState(createTheme({
    palette: {mode: 'dark'}
  }));
  const [currentTheme, setCurrentTheme] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();
    React.useEffect(() => {
      if(location.state == null){
        console.log('Error!');
        navigate("/");
    }
    // eslint-disable-next-line
    }, []);

    // below is the data of admin
    const userData = location.state;
    console.log(userData);

    // Below is code to switch pages
    function switchPages() {
        switch (page) {
            case 0:
                return <UserDetails />;
            case 1:
                return <AddCandidate />;
            case 2:
                return  <PreviousElections />;
            case 3:
                return <AddElections />;
            case 4:
                return <CurrentCandidates />;
            case 5:
                return <UpcomingElections />;
            default:
                return <UserDetails />;
        }
    }
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={themeMode}>
      <CssBaseline />
      <Box sx={{ display: 'flex'}}>
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
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
            onClick={() => { currentTheme ? 
              setThemeMode(createTheme({ palette: {mode: 'dark'}})) : 
              setThemeMode(createTheme({palette: {
                primary: green,
                background: {
                  default: grey[400],
                  paper: grey[400],
                },
              }}));
              setCurrentTheme(!currentTheme);
              console.log(currentTheme); 
            }}
            sx={{paddingRight: 5}}
            >
              <DarkModeIcon />
            </IconButton>
            <IconButton
            onClick={() => {navigate('/')}}
            sx={{paddingRight: 5}}
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
            <ListItemButton onClick={() => {console.log("Users clicked!");setPage(0);setPageTitle('Current Users');}}>
                <ListItemIcon>
                <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary="Current Users" />
            </ListItemButton>
            <ListItemButton onClick={() => {console.log("Current Candidates clicked!");setPage(4);setPageTitle('Current Candidates');}}>
                <ListItemIcon>
                <GroupsIcon />
                </ListItemIcon>
                <ListItemText primary="Current Candidates" />
            </ListItemButton>
            <ListItemButton onClick={() => {console.log("Add Candidate clicked!");setPage(1);setPageTitle('Add Candidate');}}>
              <ListItemIcon>
                <PersonAddIcon />
              </ListItemIcon>
              <ListItemText primary="Add Candidate" />
            </ListItemButton>
            <ListItemButton onClick={() => {console.log("Previous Elections clicked!");setPage(2);setPageTitle('Previous Elections');}}>
                <ListItemIcon>
                    <FactCheckIcon />
                </ListItemIcon>
                <ListItemText primary="Previous Elections" />
            </ListItemButton>
            <ListItemButton onClick={() => {console.log("upcoming Elections clicked!");setPage(5);setPageTitle('Upcoming Elections');}}>
              <ListItemIcon>
                <HowToVoteIcon />
              </ListItemIcon>
              <ListItemText primary="Upcoming Elections" />
            </ListItemButton>
            <ListItemButton onClick={() => {console.log("Add Elections clicked!");setPage(3);setPageTitle('Add Elections');}}>
                <ListItemIcon>
                    <LibraryAddIcon />
                </ListItemIcon>
                <ListItemText primary="Add Elections" />
            </ListItemButton>
            <Divider sx={{ my: 1 }} />
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container
           sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* List of elections */}
              <Grid item xs={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: 660,
                    height: 'auto'
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
export default function adminHome() {
  return <DashboardContent />;
}