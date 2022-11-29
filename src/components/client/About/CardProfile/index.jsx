import React from 'react';
import {
  FacebookLogo,
  GoogleLogo,
  TelephoneLogo
} from '../../../../asset/images/about';

const CardProfile = ({items}) => {
   return (
     <>
       {items.map((item) => (
         <div className="d-flex flex-column align-items-center p-2 mb-5" key={item.id}>
           <img
             src={item.image}
             alt="PROFILE"
             style={{
               height: '15rem',
               width: '15rem',
               objectFit: 'cover',
             }}
             className="rounded-circle border border-secondary border-2 p-2 mt-4 shadow"
           />
           <div className="info-content my-4 d-flex flex-column align-items-center gap-4">
             <h5 className="title fw-bold fs-4 text-dark">{item.name}</h5>
             <p className="working">{item.role}</p>
           </div>
           <div className="w-100 d-flex justify-content-center gap-3">
             <a href={item.facebook}>
               <img src={FacebookLogo} alt="LOGO" style={{ width: '2rem' }} />
             </a>
             <a href={item.facebook}>
               <img src={TelephoneLogo} alt="LOGO" style={{ width: '2rem' }} />
             </a>
             <a href={item.email}>
               <img src={GoogleLogo} alt="LOGO" style={{ width: '2rem' }} />
             </a>
           </div>
         </div>
       ))}
     </>
   );
};

export default CardProfile;