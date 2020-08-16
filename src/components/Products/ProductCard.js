import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/DeleteRounded";
import LinkIcon from "@material-ui/icons/Link";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  card: {
    position: "relative",
    width: 250,
    height: "auto",
    margin: theme.spacing(3),
    marginTop: theme.spacing(1),
    transition: "0.3s",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
    },
  },
  media: {
    margin: "auto",
    height: "200px",
    width: "250px",
  },
  content: {
    textAlign: "left",
    marginBottom: 20,
    padding: theme.spacing(3),
  },
  divider: {
    margin: `${theme.spacing(3)}px 0`,
  },
  heading: {
    fontWeight: "bold",
  },
  subheading: {
    lineHeight: 1.8,
  },
  button: {
    marginRight: theme.spacing(1),
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    marginBottom: theme.spacing(2),

    display: "flex",
  },
}));

const ProductCard = (props) => {
  const classes = useStyles();
  const { product } = props;
  const manageProduct = (
    <>
      <Divider className={classes.divider} light />
      <div className={classes.buttonContainer}>
        <Button
          color="secondary"
          variant="contained"
          className={classes.button}
          onClick={props.deleteProduct}
        >
          <DeleteIcon />
        </Button>
        <Button
          color="secondary"
          variant="contained"
          component={Link}
          to={{
            pathname: "/linkproducts",
            state: { product: product },
          }}
          className={classes.button}
        >
          <LinkIcon />
        </Button>
      </div>
    </>
  );

  return (
    <Card className={classes.card}>
      {product.images[0] !== undefined && (
        <CardMedia
          classes={{ root: classes.media }}
          component="img"
          image={product.images[0].src}
        />
      )}

      <CardContent className={classes.content}>
        <Typography variant="body1" gutterBottom>
          <strong>{product.name}</strong>
        </Typography>
        <Typography variant="body1" gutterBottom color="secondary">
          <strong>Rs {product.price}</strong>
        </Typography>
        {manageProduct}
      </CardContent>
    </Card>
  );
};

export default ProductCard;
