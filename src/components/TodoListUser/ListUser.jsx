import React, { useEffect, useState } from 'react';
import './listuser.css';

const ListUser = () => {
   const [user, setUser] = useState([]);

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
         <button className="btn-add-sv">Thêm sinh viên</button>
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
                           <td>{users.masv}</td>
                           <td>{users.name}</td>
                           <td>{users.namsinh}</td>
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
