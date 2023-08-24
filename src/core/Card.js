import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import ShowImage from "./ShowImage";
import moment from "moment";
import "./Card.css";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import CameraIcon from "@material-ui/icons/PhotoCamera";
import CardM from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import DeleteIcon from "@material-ui/icons/Delete";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";

import { addItem, updateItem, removeItem } from "./cartHelpers";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  productDescription: {
    height: "100px",
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const Card = ({
  product,
  showViewProductButton = true,
  showAddToCartButton = true,
  cartUpdate = false,
  showRemoveProductButton = false,
  setRun = (f) => f, // default value of function
  run = undefined, // default value of undefined
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const showViewButton = (showViewProductButton) => {
    return (
      showViewProductButton && (
        <Link href={`/product/${product._id}`} className="mr-2">
          <Button variant="contained" color="primary">
            View Product
          </Button>
        </Link>
      )
    );
  };

  const addToCart = () => {
    // console.log('added');
    addItem(product, setRedirect(true));
  };

  const shouldRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddToCartBtn = (showAddToCartButton) => {
    return (
      showAddToCartButton && (
        <Button variant="contained" color="white" onClick={addToCart}>
          Add to Cart
        </Button>
      )
    );
  };

  const showStock = (quantity) => {
    return quantity > 0 ? (
      <span className="badge badge-primary badge-pill">In Stock </span>
    ) : (
      <span className="badge badge-primary badge-pill">Out of Stock </span>
    );
  };

  const handleChange = (productId) => (event) => {
    setRun(!run); // run useEffect in parent Cart
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value);
    }
  };

  const showCartUpdateOptions = (cartUpdate) => {
    return (
      cartUpdate && (
        <div className="mt-2">
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Adjust Quantity</span>
            </div>
            <input
              type="number"
              className="form-control"
              value={count}
              onChange={handleChange(product._id)}
            />
          </div>
        </div>
      )
    );
  };

  const showRemoveButton = (showRemoveProductButton) => {
    return (
      showRemoveProductButton && (
        <Button
          onClick={() => {
            removeItem(product._id);
            setRun(!run); // run useEffect in parent Cart
          }}
          variant="contained"
          color="secondary"
          className={classes.button}
          startIcon={<DeleteIcon />}
        >
          Remove Product
        </Button>
      )
    );
  };

  const classes = useStyles();

  return (
    <>
      <div>
        <div className="card" style={{ cursor: "pointer" }}>
          <div className="wrapper">
            <div
              className="card_img"
              style={{
                borderRadius: "5px",
                backgroundColor: "rgb(169 181 196 / 28%)",
              }}
            >
              <ShowImage item={product} url="product" />
            </div>
          </div>

          <div className="cardInfo">
            <h1>{product.name}</h1>
            <div className="action">
              <div className="priceGroup">
                <p className="price newPrice">Rs {product.price}</p>
                <p>Rs 0.00</p>
                <p>38% off</p>
                
              </div>
            </div>
          </div>
          <span>
            {/* {showStock(product.quantity)} */}
            <br></br>
          </span>
        </div>
      </div>
    </>
  );
};

export default Card;
