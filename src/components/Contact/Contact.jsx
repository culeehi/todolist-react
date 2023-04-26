import React, { useState } from 'react';

const MyForm = () => {
   const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
   });
   const [errors, setErrors] = useState({
      // name: '', name,
      // email: '', code,
      // password: '',date,
   });

   const handleInputChange = (event) => {
      const { name, value } = event.target;
      setFormData({ ...formData, [name]: value });
   };

   const handleSubmit = (event) => {
      event.preventDefault();
      // Perform form validation
      let formIsValid = true;
      const newErrors = {};

      if (!formData.name) {
         newErrors.name = 'Name is required';
         formIsValid = false;
      }

      if (!formData.email) {
         newErrors.email = 'Email is required';
         formIsValid = false;
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
         newErrors.email = 'Email is invalid';
         formIsValid = false;
      }

      if (!formData.password) {
         newErrors.password = 'Password is required';
         formIsValid = false;
      } else if (formData.password.length < 6) {
         newErrors.password = 'Password must be at least 6 characters';
         formIsValid = false;
      }

      setErrors(newErrors);

      if (formIsValid) {
         // Submit the form
         console.log('Form data:', formData);
      }
   };

   return (
      <form onSubmit={handleSubmit}>
         <div>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} />
            {errors.name && <p>{errors.name}</p>}
         </div>
         <div>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} />
            {errors.email && <p>{errors.email}</p>}
         </div>
         <div>
            <label htmlFor="password">Password</label>
            <input
               type="password"
               id="password"
               name="password"
               value={formData.password}
               onChange={handleInputChange}
            />
            {errors.password && <p>{errors.password}</p>}
         </div>
         <button type="submit">Submit</button>
      </form>
   );
};

export default MyForm;
