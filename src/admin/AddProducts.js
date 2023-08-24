import React, { useState } from 'react'

import { useHistory } from 'react-router-dom'
import { API } from '../config';

import { ProductColors } from './ProductColors';

function AddProducts() {

    const history = useHistory()

    const  [productName, setProductName] = useState('')
    const  [productprice, setProductPrice] = useState('')
    const  [loading, setLoading] = useState(false);
    const [productsize, setProductSize]=useState('');
    const [productdescription, setProductDescription]=useState('');



    const [selectedColors, setSelectedColors] = useState([]);

  const handleColorToggle = (color) => {
    const isSelected = selectedColors.includes(color);

    if (isSelected) {
      setSelectedColors((prevColors) =>
        prevColors.filter((item) => item !== color)
      );
    } else {
      setSelectedColors((prevColors) => [...prevColors, color]);
    }
  };



console.log(productName);
console.log(selectedColors);
console.log(productprice);
console.log(productsize);



    const productInfoHandler = async ()=>{
        setLoading(true)
        const response = await fetch(`${API}/product`,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title:productName,
                price:productprice,
                count:1,
                colors:selectedColors,
                description:productdescription,
                size:productsize
            })
        })
        // const data = await response.json()
         const data = await response.json()



         if(data){
            setLoading(false)
            history.push(`/upload_images/${data}`)
         
         }

        
        console.log(data)
        

    }
  return (
    <div className="container">
    <div className="row">
      <div className="col l3" />
      <div className="col l6">
        <div>
          <div className="row">
            <div className="input-field col s12">
              <input
                onChange={(e) => setProductName(e.target.value)}
                id="product_name"
                type="text"
                className="validate"
              />
              <label htmlFor="product_name">Product Name</label>
            </div>
            <div className="input-field col s12">
              <input
                onChange={(e) => setProductPrice(e.target.value)}
                id="product_price"
                type="text"
                className="validate"
              />
              <label htmlFor="product_price">Product Price</label>
            </div>
          </div>
          
          <h5>Choose Colors</h5>
          <div className="row">
            {ProductColors.map((color) => (
              <div className="col l2" key={color}>
                <button
                  onClick={() => handleColorToggle(color)}
                  className={`btn ${
                    selectedColors.includes(color)
                      ? 'indigo darken-4'
                      : 'grey'
                  } white-text`}
                >
                  {color}
                </button>
              </div>
            ))}
          </div>
  
          <div className="input-field col s12">
            <input
              onChange={(e) => setProductSize(e.target.value)}
              id="product_size"
              type="text"
              className="validate"
            />
            <label htmlFor="product_size">Size</label>
          </div>
  
          <div className="input-field col s12">
            <input
              onChange={(e) => setProductDescription(e.target.value)}
              id="product_description"
              type="text"
              className="validate"
            />
            <label htmlFor="product_description">Description</label>
          </div>
  
          <button onClick={productInfoHandler}>Submit</button>
        </div>
      </div>
      <div className="col l3" />
    </div>
  </div>
  
  )
}

export default AddProducts;