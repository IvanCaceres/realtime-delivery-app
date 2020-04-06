import React from "react";
import { connect } from 'react-redux'

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { addCartItem, removeFromCart } from "../store/features/cart";

const useStyles = makeStyles({
    root: {
        minWidth: 275
    },
    media: {
        height: 0,
        paddingTop: "56.25%" // 16:9
    },
    bullet: {
        display: "inline-block",
        margin: "0 2px",
        transform: "scale(0.8)"
    },
    title: {
        fontSize: 14
    },
    pos: {
        marginBottom: 12
    },
    price: {
        color: "red"
    }
});



function ProductCard({
    title,
    price,
    image,
    manufacturer,
    item,
    addToCart,
    cart,
    removeFromCart
}: {
    title: string;
    image: string;
    price: string;
    manufacturer: string;
    item: any;
    addToCart?: any;
    cart?: any[];
    removeFromCart?: any;
}) {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;

    function handleAddToCart() {
        addToCart(item)
    }

    function remove() {
        removeFromCart(item)
    }

    let inCart = cart?.find((cartItem) => {
        if (cartItem.id === item.id) {
            return true
        }
        return false
    })

    return (
        <Card className={classes.root}>
            <CardMedia
                className={classes.media}
                image={`/storage/${image}`}
                title={title}
            />
            <CardContent>
                <Typography variant="h5" component="h3">
                    {title}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    {manufacturer}
                </Typography>
                <Typography variant="body2" component="p">
                    <b className={classes.price}>{price}</b>
                </Typography>
            </CardContent>
            <CardActions>
                {!inCart ?
                    <Button variant="contained" color="primary" onClick={handleAddToCart}>
                        Add to Cart
                    </Button>
                    :
                    <Button variant="contained" color="secondary" onClick={remove}>
                        Remove from Cart
                    </Button>
                }
            </CardActions>
        </Card>
    );
}

function mapStateToProps(state: any) {
    return {
        cart: state.cart.cart,
    }
}

const mapDispatch = {
    addToCart: addCartItem,
    removeFromCart
}

export default connect(
    mapStateToProps,
    mapDispatch
)(ProductCard)