import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

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

export default function ProductCard({
    title,
    price,
    image,
    manufacturer
}: {
    title: string;
    image: string;
    price: string;
    manufacturer: string;
}) {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;

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
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    );
}