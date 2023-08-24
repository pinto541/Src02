import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import ShowImage from './ShowImage';
import moment from 'moment';
import "./Card1.css";
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import CardM from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

import { addItem, updateItem, removeItem } from './cartHelpers';

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
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  productDescription: {
    height: '100px',
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const Card1 = ({
  product,
  showViewProductButton = true,
  showAddToCartButton = false,
  cartUpdate = true,
  showRemoveProductButton = false,
  setRun = (f) => f, // default value of function
  run = undefined, // default value of undefined
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const showViewButton = (showViewProductButton) => {
    return (
      showViewProductButton && (
        <Link href={`/product/${product._id}`} className='mr-2'>
          <Button variant='contained' color='primary'>
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
      return <Redirect to='/cart' />;
    }
  };

  const showAddToCartBtn = (showAddToCartButton) => {
    return (
      showAddToCartButton && (
        <Button variant='contained' color='white' onClick={addToCart} >
            Add to Cart
          </Button>
       
      )
    );
  };

 

  const handleChange = (productId) => (action) => {
    setRun(!run); // Run useEffect in parent Cart
  
    if (action === 'increment') {
      setCount((prevCount) => prevCount + 1);
    } else if (action === 'decrement') {
      setCount((prevCount) => (prevCount > 1 ? prevCount - 1 : 1));
    }
  
    updateItem(productId, count); // Update the item with the new count
  };
  
  

  const showCartUpdateOptions = (cartUpdate) => {
    return (
      cartUpdate && (
       
                            <div className="one">
                    <div className="button-wrap">
                        <button onClick={() => handleChange(product._id, 'increment')}>+</button>
                        <span>1</span>
                        <button onClick={() => handleChange(product._id, 'decrement')}>-</button>
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
          variant='contained'
          color='secondary'
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
  <div className="card-1" >
  <div className="img-wrapper">
          {shouldRedirect(redirect)}
          <ShowImage item={product} url="product" />
       </div>
        
            <b>{product.name}</b>
         
          <p>Price: Rs {product.price}</p>
           <p>
          {showCartUpdateOptions(cartUpdate)}
          </p>
          </div>
          <span>
            {/* {showStock(product.quantity)} */}
            <br></br>
            {showViewButton(showViewProductButton)}
            {showAddToCartBtn(showAddToCartButton)}
            {showRemoveButton(showRemoveProductButton)}
          </span>
       
    </>
  );
};

export default Card1;
