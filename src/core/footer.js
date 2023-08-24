import React from 'react'

import { BiPhoneCall } from "react-icons/bi"

function Footer() {
  return (
    <footer className='footer1'>
      <div className="container">
        <ul className='footer'>
          <li className='location'>
            <hr/>
            <h2>Contact Us</h2>
            <div className='phone' style={{paddingTop:"10px"}}>
              <BiPhoneCall style={{fontSize:"20px"}}/>
              <span>(+91) 7675839201</span>
            </div>
            <span>weUgly@support.com</span>
            <p>sai,nagar,bengaluru,560097</p>
          </li>
          
        </ul>
      </div>
    </footer>
  )
}

export default Footer