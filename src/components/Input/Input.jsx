import React from 'react';

const Input = (props) => {
   const { setData, classStyle, lable } = props;
   return (
      <>
         <label>{lable}</label>
         <input
            type="text"
            className={classStyle}
            onChange={(e) => {
               setData(e.target.value);
            }}
         />
      </>
   );
};

export default Input;
