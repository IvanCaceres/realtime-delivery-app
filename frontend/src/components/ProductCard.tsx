import React from "react";
import { connect } from 'react-redux'

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import FormHelperText from '@material-ui/core/FormHelperText'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'

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

interface formErrors {
    option: string | null,
    customOrderMessage: string | null
}

function ProductCard({
    title,
    price,
    image,
    manufacturer,
    item,
    addToCart,
    cart,
    removeFromCart,
    options,
    onOptionSelected,
    cartButton = false,
    infoString = '',
}: {
    title: string;
    image: string;
    price: string;
    manufacturer: string;
    item: any;
    addToCart?: any;
    cart?: any[];
    removeFromCart?: any;
    options?: any[],
    onOptionSelected?: any;
    cartButton?: boolean;
    infoString?: string;
}) {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;

    let formErrorsState = {
        option: null,
        customOrderMessage: null
    }
    // state
    const [labelWidth, setLabelWidth] = React.useState(0);
    const [formErrors, setFormErrors] = React.useState<formErrors>(formErrorsState)
    const [optionSelected, setOptionSelected] = React.useState<string>('')
    const [customOrderMessage, setCustomOrderMessage] = React.useState<string>('')

    const inputLabel = React.useRef<HTMLLabelElement>(null);

    // effects
    // set initial select label width
    React.useEffect(() => {
        if (options) {
            setLabelWidth(inputLabel.current!.offsetWidth);
        }
    }, [options]);

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

    let productOptionsRender

    if (options) {
        productOptionsRender = options.map((option: any) => {
            return <MenuItem key={option.id} value={option.id}>{option.name}</MenuItem>
        })
    }

    function optionSelectedUpdated(value: number | string, custom = false) {
        onOptionSelected(value, item.id, custom)
    }

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

                {/* product options */}
                {options && <FormControl required error={!!formErrors['option']} variant="outlined" fullWidth margin="normal">
                    <InputLabel ref={inputLabel} id="option-select-label" htmlFor="outlined-option-native-simple">
                        Product Option
                    </InputLabel>
                    <Select
                        required
                        value={optionSelected}
                        onChange={(e: any) => {
                            setOptionSelected(e.target.value)
                            optionSelectedUpdated(e.target.value)
                        }}
                        labelId="option-select-label"
                        labelWidth={labelWidth}
                        inputProps={{
                            name: 'options',
                            id: 'outlined-option-native-simple',
                        }}
                    >
                        {productOptionsRender}
                    </Select>
                    <FormHelperText>Option must be selected.</FormHelperText>
                </FormControl>
                }
                {
                    optionSelected === 'Custom' &&
                    // custom order message
                    <TextField
                        error={!!formErrors['customOrderMessage']}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="customOrderMessage"
                        label="Custom order message"
                        name="customOrderMessage"
                        autoComplete="off"
                        value={customOrderMessage}
                        onChange={(e) => {
                            setCustomOrderMessage(e?.target.value)
                            optionSelectedUpdated(e.target.value, true)
                        }}
                    />
                }
                <Typography variant="body2" component="p">
                    <b>{infoString}</b>
                </Typography>
            </CardContent>
            <CardActions>
                {cartButton && (!inCart ?
                    <Button variant="contained" color="primary" onClick={handleAddToCart}>
                        Add to Cart
                    </Button>
                    :
                    <Button variant="contained" color="secondary" onClick={remove}>
                        Remove from Cart
                    </Button>
                )}
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