import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  card: {
    position: "relative",
    width: "90vw",
    margin: theme.spacing(3),
    transition: "0.3s",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
    },
  },
  titleContainer: {
    display: "flex",
  },
  content: {
    textAlign: "left",
    textTransform: "uppercase",
    padding: theme.spacing(3),
  },
  deleteButtonContainer: {
    textAlign: "right",
  },
}));

const OfferCard = (props) => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardContent className={classes.content}>
        <div className={classes.titleContainer}>
          <Typography variant="body1" gutterBottom>
            <strong>{props.offer.title}</strong>
          </Typography>
        </div>

        <Typography variant="body1" gutterBottom color="secondary">
          <strong>
            {props.offer.seller} , {props.offer.category} , Rs{" "}
            {props.offer.price}
          </strong>
        </Typography>
        <div className={classes.deleteButtonContainer}>
          <Button
            variant="contained"
            color="primary"
            onClick={props.deleteOffer}
            classes={{ root: classes.deleteButton }}
          >
            remove
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default OfferCard;
