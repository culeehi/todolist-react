import './listuser.css';
import React, { useState } from 'react';

const Contact = () => {
   const [clear, setClear] = useState(false);

   return (
      <div className="list-user">
         <button
            onClick={() => {
               setClear(!clear);
            }}
         >
            {' '}
            hidden / show
         </button>
         {clear && <h3>show slide </h3>}
      </div>
   );
};

export default Contact;
