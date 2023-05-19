import React, { useEffect, useState } from 'react';
import './listuser.css';

const ListUser = () => {
   const Api = 'https://6440e462792fe886a8986bf7.mockapi.io/api/v1/students';

   const [user, setUser] = useState([]);

   const [name, setName] = useState('');
   const [code, setCode] = useState('');
   const [date, setDate] = useState('');

   const [searchTerm, setSearchTerm] = useState('');

   const [errors, setErrors] = useState({
      name: '',
      code: '',
      date: '',
   });

   const [editingUser, setEditingUser] = useState({
      name: '',
      code: '',
      date: '',
   });

   const handleEditUser = (user) => {
      setEditingUser(user);
      setName(user.name);
      setCode(user.code);
      setDate(user.date);
   };

   const handleAddSv = () => {
      fetch(Api, {
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

      const newErrors = {};

      if (!name) {
         newErrors.name = 'Không được để trống';
      } else if (name.length < 2) {
         newErrors.name = 'Tên của sinh viên phải lớn hơn 2 kí tự';
      } else if (name.length > 30) {
         newErrors.name = 'Tên của sinh viên phải bé hơn 30 kí tự';
      }

      if (!code) {
         newErrors.code = 'Không được để trống';
      } else if (code.length !== 4) {
         newErrors.code = 'Mã sinh viên phải có 4 kí tự';
      }

      if (!date) {
         newErrors.date = 'Không được để trống';
      } else if (date.length !== 4) {
         newErrors.date = 'Năm sinh phải có 4 chữ số';
      }

      setErrors(newErrors);

      const formIsValid = Object.keys(newErrors).length === 0;

      if (formIsValid) {
         handleAddSv();
      } else {
         // alert('Vui lòng nhập lại');
         return;
      }
   };

   const handleDelete = (userId) => {
      fetch(`${Api}/${userId}`, {
         method: 'DELETE',
      })
         .then(() => {
            const updatedUser = user.filter((user) => user.id !== userId);
            setUser(updatedUser);
         })
         .catch((error) => console.error('Error deleting item:', error));
   };

   const handleUpdateSv = () => {
      fetch(`${Api}/${editingUser.id}`, {
         method: 'PUT',
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
            setUser(user.map((user) => (user.id === editingUser.id ? data : user)));

            setName('');
            setCode('');
            setDate('');
            setEditingUser(null);
         })
         .catch((error) => console.error('Error updating item:', error));
   };

   useEffect(() => {
      fetch(Api)
         .then((res) => res.json())
         .then((user) => {
            setUser(user);
         })
         .catch((error) => {
            console.log(error);
         });
   }, []);

   const handleSearch = (event) => {
      setSearchTerm(event.target.value);
   };

   const filteredUser = user.filter((student) => {
      return (
         student.name.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
         student.code.toString().toLowerCase().includes(searchTerm.toLowerCase())
      );
   });

   return (
      <div className="list-page">
         <form action="" onSubmit={handleSubmit} className="form-input">
            <button
               className="btn-add-sv"
               onClick={(e) => {
                  const editingUser = false;
                  if (editingUser) {
                     handleAddSv();
                  } else {
                     handleUpdateSv();
                  }
               }}
            >
               {!editingUser?.name ? 'Add ' : 'Update'} sinh viên
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
               <div className="search-student">
                  <input type="text" placeholder="Tìm kiếm sinh viên" onChange={handleSearch} />
               </div>
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
                  <tbody className="table-search">
                     {filteredUser.map((item, id) => (
                        <tr key={id}>
                           <td>{item.id}</td>
                           <td>{item.code}</td>
                           <td>{item.name}</td>
                           <td>{item.date}</td>
                           <td>
                              <button type="button" className="btn btn-edit" onClick={() => handleEditUser(item)}>
                                 Edit
                              </button>

                              <button type="button" className="btn btn-delete" onClick={() => handleDelete(item.id)}>
                                 Dele
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
