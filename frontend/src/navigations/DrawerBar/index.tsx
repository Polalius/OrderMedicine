import { Drawer, IconButton, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { styled } from '@mui/material/styles';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MedicationIcon from '@mui/icons-material/Medication';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useNavigate } from 'react-router-dom';



export default function DrawerBar({ role, drawerWidth, handleDrawerClose, open , theme}: any) {
    

    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    }));
    const Listitemlink = () => {
        var menu: any[] = [];

        if (role === "admin") {
            menu = [
                { "text": "A", "icon": <InboxIcon />, "link": "/" },
                { "text": "B", "icon": <InboxIcon />, "link": "/dashboard" },
                { "text": "C", "icon": <InboxIcon />, "link": "/localdashboard" },
            ]
        } else if (role === "intendant") {
            menu = [
                { "text": "Home", "icon": <InboxIcon />, "link": "/" },
                { "text": "Order", "icon": <InboxIcon />, "link": "/order" },
                { "text": "Order History", "icon": <InboxIcon />, "link": "/orderhistory" },
            ]
        }
        else if (role === "pharmacist") {
            menu = [
                { "text": "Dashboard", "icon": <DashboardIcon />, "link": "/" },
                { "text": "Medicine Pay", "icon": <MedicationIcon />, "link": "/medicinepay" },
            ]
        }
        else if (role === "payment") {
            menu = [
                //{ "text": "A", "icon": <InboxIcon />, "link": "/" } form 

            ]
        }

        
        const navigator = useNavigate();
        return (
            menu.map((data, index) => (
                <ListItem key={data.text} disablePadding>
                    <ListItemButton onClick={()=>{navigator(data.link)}}>
                        <ListItemIcon>
                            {data.icon}
                        </ListItemIcon>
                        <ListItemText primary={data.text} />
                    </ListItemButton>
                </ListItem>
            ))
        )
    }
    return (
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                },
            }}
            variant="persistent"
            anchor="left"
            open={open}
        >
            <DrawerHeader>
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
                {
                    Listitemlink()
                }
            </List>
        </Drawer>
    )
}
