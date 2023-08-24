import React, { useState, useEffect } from "react";
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "./Product.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { addItem, updateItem, removeItem } from './cartHelpers';

import ShowImage from "./ShowImage";
import { read, listRelated } from "./apiCore";
import Card1 from "./Card";
import Menu from "./Menu";
import Copyright from "./Copyright";
import ShowImageProd from "./ShowImageProd";

const Product = (props) => {
  
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [error, setError] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const loadSingleProduct = (productId) => {
    read(productId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProduct(data);
        // fetch related products
        listRelated(data._id).then((data) => {
          if (data.error) {
            setError(data.error);
          } else {
            setRelatedProduct(data);
          }
        });
      }
    });
  };

 const showAddToCartButton=true;
  const addToCart = () => {
    
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
        <div className="center" style={{ textAlign: "center" }}>
          <Button variant="contained" color="primary" onClick={addToCart}>Add to Cart </Button>
        </div>
      )
    );
  };
  
 


  useEffect(() => {
    const productId = props.match.params.productId;
    loadSingleProduct(productId);
  }, [props]);

  return (
    <>
    
    
      <div style={{ padding: 25 }}>
        <Menu />
      </div>
      <div style={{ minHeight: "550px" }} className="container my-2 py-4">
        <div className="row mt-2 mb-5">
          <div
            className="col-12 col-lg-7 mr-5"
            // style={{ boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}
          >
            <div className="h-28 border-t border-gray-300 px-4 py-2 flex justify-between items-center text-base lg:font-medium !important">
              <h4>Product Details</h4>
              {product && product.description && (
                // <Card product={product} showViewProductButton={false} />
                <div className="card">
                  <div className="wrapper">
                    <div
                      className="card_img"
                      style={{
                        borderRadius: "5px",
                        backgroundColor: "rgb(169 181 196 / 28%)",
                        height: "400px",
                      }}
                    >
                       {shouldRedirect(redirect)}
                      <ShowImageProd item={product} url="product" />
                    </div>
                  </div> 
                 
                  <div style={{ textAlign: "center" }} className="cardInfo ">
                    <h1>{product.name}</h1>
                    <div className="action">
                      <div className="priceGroup">
                        <p
                          style={{ textAlign: "center" }}
                          className="price newPrice"
                        >
                          Rs {product.price}
                         
                        </p>
                         
                        
                        
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="center">
          {showAddToCartBtn(showAddToCartButton)}
          </div>
          {/* <div className="row mt-4"> */}
          <div className="col-12 col-md-4  mt-3 p-4">
            <div className="desc">
              <h5>Description</h5>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias
                accusamus vel nobis neque, exercitationem omnis ipsa totam
                eveniet ex voluptas voluptatibus nesciunt quis, eos autem
                aliquam perspiciatis iste aliquid quam?
              </p>
            </div>
            <h5>Product Specification</h5>
            <ul className="prod-specification">
              <li>Full Sleeve</li>
              <li>Check Design</li>
              <li>Button Down Coton</li>
            </ul>
            <div>
              <h5>
                Fabric :{" "}
                <span style={{ fontSize: "13px", fontWeight: "normal" }}>
                  65% Linen 35% Cotton
                </span>{" "}
              </h5>
            </div>
            <h5>
              Fit :{" "}
              <span style={{ fontSize: "13px", fontWeight: "normal" }}>
                Slim Fit
              </span>{" "}
            </h5>
            <h5>
              Model :{" "}
              <span style={{ fontSize: "13px", fontWeight: "normal" }}>
                Height 6 feet
              </span>{" "}
            </h5>
          </div>
          
        </div>

        
      </div>

      <Copyright />
    </>
  );
};

export default Product;





