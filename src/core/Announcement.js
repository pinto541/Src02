import './Announcement.css'
import Marquee from 'react-fast-marquee';
export const Announcement = () => {
  return (
    <div className="announcement">
        <Marquee speed={60} gradient={false} pauseOnHover>
     <div className="announcement-text text1">
        <span>We Are Live In Benaglure</span>
        <span>Namaskara Benaglure</span>
     </div>

     <div className="announcement-text text2">
        <span>Fast Delivery</span>
        <span>Namaskara Benaglure</span>
     </div>
     </Marquee>

    </div>
  )
}
