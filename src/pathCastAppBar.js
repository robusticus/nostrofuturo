import './index.css';
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const theme = createTheme({
    typography: {
        fontFamily: [
            '"Segoe UI"',
            'Tahoma',
            'Geneva',
            'Verdana',
            'sans-serif',
        ].join(','),
    },
});

const drawerWidth = 240;
const navItems = ['Securities', 'Sports', 'Media', 'Contact'];

// Responsive Menu
function PathCastAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }} href={'#' + item}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <ThemeProvider theme={theme}>
        <Toolbar>
            <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { xs: 'block', sm: 'block', md: 'none' } }}
            >
            <MenuIcon />
            </IconButton>
            <Box sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }}>
            {navItems.map((item) => (
                <Button key={item} sx={{ color: 'black' }} href={'#' + item}>
                {item}
                </Button>
            ))}
            </Box>
        </Toolbar>
        <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
            keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
            display: { xs: 'block', sm: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
            }
            }}
        >
            {drawer}
        </Drawer>
    </ThemeProvider>
  );
}

export default PathCastAppBar;
