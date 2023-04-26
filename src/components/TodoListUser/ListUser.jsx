import React, { useEffect, useState } from 'react';
import './listuser.css';

const ListUser = () => {
   const [user, setUser] = useState([]);

   const [name, setName] = useState('Thanh Dong');
   const [code, setCode] = useState('20187161');
   const [date, setDate] = useState('2000');

   const [errors, setErrors] = useState({
      name: '',
      code: '',
      date: '',
   });

   const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
   });

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

   const handleAddSv = (e) => {
      e.preventDefault();
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
         <form action="" className="form-input">
            <button
               className="btn-add-sv"
               onClick={(e) => {
                  handleAddSv(e);
               }}
            >
               Thêm sinh viên
            </button>
            <div className="input-student">
               <label htmlFor="">Mã sinh viên</label>
               <input
                  type="text"
                  onChange={(e) => {
                     setCode(e.target.value);
                  }}
               />

               <label htmlFor="">Tên sinh viên</label>
               <input
                  type="text"
                  onChange={(e) => {
                     setName(e.target.value);
                  }}
               />

               <label htmlFor="">Năm sinh </label>
               <input
                  type="text"
                  onChange={(e) => {
                     setDate(e.target.value);
                  }}
               />
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
