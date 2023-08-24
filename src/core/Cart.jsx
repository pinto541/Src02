import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
//cart
import swal from 'sweetalert2';
import Checkout  from "./Checkout";
import { getCart } from "./cartHelpers";
import Card1 from './Card1';
import { useHistory } from 'react-router-dom';

import Menu from './Menu';
import { checkoutItems, getProducts } from "../core/apiCore";
import ShowImageProd from "./ShowImageProd";
import { Button } from "@material-ui/core";
import Copyright from './Copyright';
import { addItem, updateItem, removeItem } from './cartHelpers';
import { isAuthenticated } from '../auth';

const Cart = ({ product, products ,Checkout}) => {

  const token = isAuthenticated() && isAuthenticated().token;
  const [items, setItems] = useState([]);
  const [run, setRun] = useState(false);
  
 // console.log('CART_ITEMS::', items)


  const handleCount = (idx, item, type) => {
    if (type === 'DECREMENT') {
      items[idx].count = items[idx].count - 1

    } else {
      items[idx].count = items[idx].count + 1
    }
    localStorage.setItem('cart', JSON.stringify(items))
    setItems(items)
    setRun(!run)
  }
 

  useEffect(() => {
    setItems(getCart());
  }, [run]);



const handleSuccess=() => {

  swal.fire(
    'Order Successful!',
    'Our Agent will Call You sho rtly',
    'success'
    )

}
 
 



  







  const handleCheckout = () => {
    if (validateForm()) {
      if (items.length) {
        checkoutItems(items, token)
          .then((data) => {
            console.log('SUCCESS::', data);
            localStorage.setItem('cart', JSON.stringify([]));
            handleSuccess();
            setRun(!run);
          }) 
          .catch((err) => console.log('ERROR', err));
      } else {
        alert('No items in the cart...!');
      }
    }
  };

 
    

  const validateForm = () => {
    // Your validation logic here

    const fullNameInput = document.getElementById('name');
    const addressInput = document.getElementById('address');
    const zipInput = document.getElementById('zip');
    // Inside your validateForm function
     const phoneInput = document.getElementById('phone'); 



    let isValid = true;

    if (!fullNameInput.value.trim()) {
      fullNameInput.classList.add('is-invalid');
      isValid = false;
    } else {
      fullNameInput.classList.remove('is-invalid');
    }

    

    const phoneNumberRegex = /^[6-9]\d{9}$/;
    if (!phoneInput.value.trim() || !phoneNumberRegex.test(phoneInput.value)) {
      phoneInput.classList.add('is-invalid');
      isValid = false;
    } else {
      phoneInput.classList.remove('is-invalid');
    }

    if (!addressInput.value.trim()) {
      addressInput.classList.add('is-invalid');
      isValid = false;
    } else {
      addressInput.classList.remove('is-invalid');
    }

    const zipRegex = /^\d{6}$/;
    if (!zipInput.value.trim() || !zipRegex.test(zipInput.value)) {
      zipInput.classList.add('is-invalid');
      isValid = false;
    } else {
      zipInput.classList.remove('is-invalid');
    }

    return isValid;
  };

  const showItems = (items) => {
    return (
      <>
        <div style={{ padding: 25 }}>
          <Menu />
        </div>
        <div
          className="container my-4 pt-2"
          style={{

            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div className="row">
            <div className="col-12 col-md-10">
              <div className="d-flex justify-content-between align-items-center">
                <h2>Your cart</h2>

              </div>
              <hr />
              {/* {items.length > 0 ? showItems(items) : noItemsMessage()} */}
              <div className="row p-1">
                {items.map((product, i) => (
                  <div
                    key={i}
                    className="col-12 col-md-7 my-2 clor p-1"
                    style={{ margin: "0 auto" }}
                  >
                    <div className="card">

                      <div className="wrapper d-flex">
                        <div
                          className="card_img"
                          style={{
                            borderRadius: "5px",
                            backgroundColor: "rgb(169 181 196 / 28%)",
                            height: "240px",
                            width: "200px",
                            marginRight: "1rem",
                          }}
                        >

                          <Button
                            onClick={() => {
                              removeItem(product._id);
                              setRun(!run); // run useEffect in parent Cart
                            }}
                            style={{ cursor: "pointer", marginLeft: "19 rem" }}>❌</Button>
                          <ShowImageProd item={product} url="product" />
                        </div>
                        <div
                          className="cart-one"
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            // justifyContent: "space-around",
                            gap: "1rem",
                          }}
                        >
                          <h5 className="mt-3 cart-h5">{product.name}</h5>
                          <h6>
                            Color:{" "}
                            <span
                              style={{
                                fontSize: "13px",
                                fontWeight: 400,
                                marginLeft: "0.4rem",
                              }}
                            >
                              Maroon
                            </span>{" "}
                          </h6>
                          <h6>
                            Size:{" "}
                            <span
                              style={{
                                fontSize: "13px",
                                fontWeight: 400,
                                marginLeft: "0.4rem",
                              }}
                            >
                              XXl
                            </span>{" "}
                          </h6>
                          <div className="d-flex justify-content-between align-items-center cart-incr">
                            <div
                              style={{
                                border: "1px solid #e3e3e3",
                                fontSize: "18px",
                                padding: "0px",
                                fontWeight: "bolder",
                              }}
                            >
                              <Button onClick={() => handleCount(i, product, 'DECREMENT')}> &ndash;</Button>
                              <span>{product.count}</span>
                              <Button onClick={() => handleCount(i, product, 'INCREMENT')}>+</Button>
                            </div>
                            <div
                              className="cart-pricing"
                              style={{ marginLeft: "1rem" }}
                            >
                              <h6>Rs.{product.price}</h6>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const noItemsMessage = () => (
    <h2>
      Your cart is empty. <br /> <Link to='/shop'>Continue shopping</Link>
    </h2>
  );

  return (
    <
      >
      <div className='row'>

        <div className='col-md-4'>
          {items.length > 0 ? showItems(items) : noItemsMessage()}
        </div>
        {/*<div className='col-md-4'> 
          <h2 className='mb-4'>Your cart summary</h2>
          <hr />
          <Checkout products={items} setRun={setRun} run={run} />
  </div> */}

      </div>

      {/* <h2 className="mb-4">Your cart summary</h2> */}
      <hr />
      <div

        style={{ margin: "0 auto" }}
      >
        <div className="d-flex justify-content-between">
          <h5>   Total :</h5>
          <span>{Checkout}</span>
        </div>

      </div>
      <div
        className="col-12 col-md-7 my-2 px-3"
        style={{ margin: "0 auto" }}
      >
        <div className="">
          <h6 className="my-4">
            Note: We are currently available only for bangalore.
          </h6>
        </div>

        <div className="card-header py-3">
          <h4 className="mb-0">Contact Information</h4>
        </div>
        <div className="card-body">
          <form className="needs-validation" novalidate>

            <div className="col-12 my-1">
              <label for="name" className="form-label">
                Full Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder=""
                
                required
              />
              <div className="invalid-feedback">
                please provide a valid name.
              </div>

            </div>

            <div className="col-12 my-1">
              <label for="phone" className="form-label">
                phone number
              </label>
              <input
                type="text"
                className="form-control"
                id="phone"
                placeholder=""
                
              />
              <div className="invalid-feedback">
                Please enter your valid phone number.
              </div>
            </div>

            <div className="col-12 my-1">
              <label for="address" className="form-label">
                Address
              </label>
              <input
                type="text"
                className="form-control"
                id="address"
                placeholder="only available for bangalore"
                
              />
              <div className="invalid-feedback">
                Please enter your shipping address.
              </div>
            </div>


            <div className="col-md-3 my-1">
              <label for="zip" className="form-label">
                Zip
              </label>
              <input
                type="text"
                className="form-control"
                id="zip"
                placeholder="eg-560097"
                required
              />
              <div className="invalid-feedback">
                Zip code required.
              </div>

            </div>


          
          <Button onClick={handleCheckout} className="d-flex justify-content-between bg-dark pt-3 pb-0 px-3 align-items-center "
          style={{ color: "#fff", cursor: "pointer",padding:" 40px", marginLeft:"50px" ,textAlign:"center"}}>
        <div
          
        >
          
              Proceed to order

          
          
        </div>
         </Button>
        </form>
        </div>
      </div>




      <Copyright />
    </>
  );
};

export default Cart;


