import React from 'react';
import { connect } from 'react-redux'

import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import HomeIcon from '@material-ui/icons/Home';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        appBarSpacer: theme.mixins.toolbar,
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        cart: {
            marginLeft: 'auto'
        },
        title: {
            flexGrow: 1,
        },
    }),
);

function ButtonAppBar({ children, cart, user }: any) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="home" component={Link} to="/">
                        <HomeIcon />
                    </IconButton>
                    {
                        user && user.admin ?
                            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" component={Link} to="/admin">
                                <SupervisorAccountIcon />
                            </IconButton>
                            : null
                    }
                    {!user ? <Button color="inherit" component={Link} to="/login">Login</Button> : null}
                    {(user && user.admin || !user) ? <Button color="inherit" component={Link} to="/register">Register</Button> : null}
                    {user ? <Button color="inherit" component={Link} to="/login">Logout</Button> : null}
                    <IconButton edge="end" className={classes.cart} color="inherit" aria-label="cart" component={Link} to="/cart">
                        <Badge badgeContent={cart.length} color="secondary">
                            <ShoppingCartIcon />
                        </Badge>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <main>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg">
                    {children}
                </Container>
            </main>
        </div>
    );
}

function mapStateToProps(state: any) {
    return {
        user: state.user.user,
        cart: state.cart.cart,
    }
}

export default connect(
    mapStateToProps,
)(ButtonAppBar)