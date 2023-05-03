import React, { useEffect, useState } from 'react';
import './listuser.css';

const ListUser = () => {
   const [user, setUser] = useState([]);

   const [name, setName] = useState('');
   const [code, setCode] = useState('');
   const [date, setDate] = useState('');

   const [errors, setErrors] = useState({
      name: '',
      code: '',
      date: '',
   });

   // const [formData, setFormData] = useState({
   //    name: '',
   //    code: '',
   //    date: '',
   // });

   const handleAddSv = () => {
      fetch('https://6440e462792fe886a8986bf7.mockapi.io/api/v1/students', {
         method: 'POST',
         headers: {
            'Content-type': 'application/json; charset=UTF-8',
         },
         body: JSON.stringify({
            code: code,
            date: date,
            name: name,
            completed: false,
         }),
      })
         .then((response) => {
            if (response.ok) {
               return response.json();
            }
         })
         .then((data) => {
            setUser([...user, data]);

            setName('');
            setCode('');
            setDate('');
         })
         .catch((error) => console.error('Error adding item:', error));
   };

   const handleSubmit = (event) => {
      event.preventDefault();
      let formIsValid = false;

      const newErrors = {};

      if (!name.name) {
         newErrors.name = 'Không được để trống';
         formIsValid = false;
      } else if (name.name.length < 2) {
         newErrors.name = 'Tên của sinh viên phải lớn hơn 2 kí tự';
         formIsValid = false;
      } else if (name.name.length > 30) {
         newErrors.name = 'Tên của sinh viên phải bé hơn 30 kí tự';
         formIsValid = false;
      }

      if (!code.code) {
         newErrors.code = 'Không được để trống';
         formIsValid = false;
      } else if (code.code.length < 3) {
         newErrors.code = 'Mã sinh viên phải có 4 kí tự';
         formIsValid = false;
      } else if (code.code.length > 5) {
         newErrors.code = 'Mã sinh viên phải có 4 kí tự';
         formIsValid = false;
      }

      if (!date.date) {
         newErrors.date = 'Không được để trống';
         formIsValid = false;
      } else if (date.date.length < 3) {
         newErrors.date = 'Năm sinh phải có 4 chứ số';
         formIsValid = false;
      } else if (date.date.length > 5) {
         newErrors.date = 'Năm sinh phải có 4 chứ số';
         formIsValid = false;
      }

      setErrors(newErrors);

      console.log('formIsValid:', formIsValid);
      if (formIsValid) {
         handleAddSv();
      }
   };

   const handleDelete = (userId) => {
      fetch(`https://6440e462792fe886a8986bf7.mockapi.io/api/v1/students/${userId}`, {
         method: 'DELETE',
      })
         .then(() => {
            const updatedUser = user.filter((user) => user.id !== userId);
            setUser(updatedUser);
         })
         .catch((error) => console.error('Error deleting item:', error));
   };

   const handleEdit = () => {};

   useEffect(() => {
      fetch('https://6440e462792fe886a8986bf7.mockapi.io/api/v1/students')
         .then((res) => res.json())
         .then((user) => {
            setUser(user);
         })
         .catch((error) => {
            console.log(error);
         });
   }, []);

   return (
      <div className="list-page">
         <form action="" onSubmit={handleSubmit} className="form-input">
            <button
               className="btn-add-sv"
               // onClick={(e) => {
               //    handleAddSv(e);
               // }}
            >
               Thêm sinh viên
            </button>
            <div className="input-student">
               <label htmlFor="code">Mã sinh viên</label>
               <input
                  type="text"
                  id="code"
                  name="code"
                  value={code}
                  onChange={(e) => {
                     setCode(e.target.value);
                  }}
               />
               {errors.code && <p className="error-validate">{errors.code}</p>}

               <label htmlFor="name">Tên sinh viên</label>
               <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => {
                     setName(e.target.value);
                  }}
               />
               {errors.name && <p className="error-validate">{errors.name}</p>}

               <label htmlFor="date">Năm sinh </label>
               <input
                  type="text"
                  id="date"
                  name="date"
                  value={date}
                  onChange={(e) => {
                     setDate(e.target.value);
                  }}
               />
               {errors.date && <p className="error-validate">{errors.date}</p>}
            </div>
         </form>
         <div className="list-user">
            <div className="title-list">
               <h4 className="title-list-sv"> Danh sách sinh viên </h4>
            </div>
            <div className="table">
               <table>
                  <thead>
                     <tr>
                        <th>STT</th>
                        <th>Mã sinh viên</th>
                        <th>Tên sinh viên</th>
                        <th>Năm sinh</th>

                        <th>Hành động</th>
                     </tr>
                  </thead>
                  <tbody>
                     {user.map((users) => (
                        <tr key={users.id}>
                           <td>{users.id}</td>
                           <td>{users.code}</td>
                           <td>{users.name}</td>
                           <td>{users.date}</td>
                           <td>
                              <button type="button" className="btn btn-edit" onClick={() => handleEdit(users.id)}>
                                 Sửa
                              </button>
                              <button type="button" className="btn btn-delete" onClick={() => handleDelete(users.id)}>
                                 Xóa
                              </button>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>
      </div>
   );
};

export default ListUser;
