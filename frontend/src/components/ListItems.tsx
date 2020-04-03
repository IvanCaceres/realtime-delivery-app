import React from 'react';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import CategoryIcon from '@material-ui/icons/Category';
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import FeaturedVideoIcon from '@material-ui/icons/FeaturedVideo';
import HomeIcon from '@material-ui/icons/Home';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import PostAddIcon from '@material-ui/icons/PostAdd';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';

interface ListItemLinkProps {
    icon?: React.ReactElement;
    primary: string;
    to: string;
}

function ListItemLink(props: ListItemLinkProps) {
    const { icon, primary, to } = props;

    const renderLink = React.useMemo(
        () =>
            React.forwardRef<any, Omit<RouterLinkProps, 'to'>>((itemProps, ref) => (
                <RouterLink to={to} ref={ref} {...itemProps} />
            )),
        [to],
    );

    return (
        <li>
            <ListItem button component={renderLink}>
                {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
                <ListItemText primary={primary} />
            </ListItem>
        </li>
    );
}

export const MainListItems = ({ callback }: { callback: any; }) => {
    return (
        <div>
            <ListItemLink to="/" primary="Home" icon={<HomeIcon />} />
            <ListItemLink to="/admin" primary="Dashboard" icon={<DashboardIcon />} />
            <ListSubheader inset>Featured Items</ListSubheader>
            <ListItemLink to="/admin/featured/add" primary="Add" icon={<FeaturedVideoIcon />} />
            <ListItemLink to="/admin/featured/add" primary="View All" icon={<FeaturedVideoIcon />} />
            <ListSubheader inset>Categories</ListSubheader>
            <ListItemLink to="/admin/category" primary="Add" icon={<CategoryIcon />} />
            <ListItemLink to="/admin/category/view" primary="View All" icon={<CategoryIcon />} />
            <ListSubheader inset>Products</ListSubheader>
            <ListItemLink to="/admin/products/add" primary="Add Product" icon={<PostAddIcon />} />
            <ListItemLink to="/admin/products/add" primary="View Products" icon={<PostAddIcon />} />
            <ListSubheader inset>Product Options</ListSubheader>
            <ListItemLink to="/admin/productOption" primary="Add" icon={<AddToPhotosIcon />} />
            <ListItemLink to="/admin/productOption" primary="View All" icon={<AddToPhotosIcon />} />
            <ListSubheader inset>Referral Codes</ListSubheader>
            <ListItemLink to="/admin/referral/add" primary="Generate" icon={<ConfirmationNumberIcon />} />
            <ListItemLink to="/admin/referral/add" primary="View All" icon={<ConfirmationNumberIcon />} />

            {/* <ListItemLink to="/admin/conferences" primary="All Conferences" icon={<CalendarTodayIcon />} /> */}
            {/* <ListItemLink to="/admin/rooms" primary="Rooms" icon={<MeetingRoomIcon />} /> */}
            {/* <ListItemLink to="/admin/users" primary="Users" icon={<PeopleIcon />} /> */}
            <ListItem button onClick={() => callback()}>
                <ListItemIcon><ExitToAppIcon /></ListItemIcon>
                <ListItemText primary={"Logout"} />
            </ListItem>
        </div>
    )
};
