import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { UserContext } from '../context/UserContext';
import { addUser, updateUser } from '../userAxios/axios'; 
import './style.css';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Vui lòng nhập tên'),
  email: Yup.string().email('Email không đúng định dạng').required('Vui lòng nhập email'),
  role: Yup.string().required('Vui lòng chọn role'),
});

function AddEditUser() {
  const { users, setUsers } = useContext(UserContext);
  const navigate = useNavigate();
  const { name: userNameParam } = useParams();
  const location = useLocation();
  const [initialValues, setInitialValues] = useState({ name: '', email: '', role: '' });

  useEffect(() => {
    if (location.state?.user) { // nếu có user được truyền qua location.state
      setInitialValues(location.state.user);  // cập nhật user vào initialValues
    } else if (userNameParam) { // kiểm tra xem có userNameParam chưa 
      const user = users.find((u) => u.name === userNameParam); // nếu có tìm kiếm người dùng trong users bằng cách so sánh user.name = userNameParam
      if (user) { // nếu thấy thông tin
        setInitialValues(user);  // cập nhật người dùng
      }
    }
  }, [userNameParam, location.state, users]); // hàm sẽ chạy khi 1 trong 3 tham số thay đổi.

  const handleSubmit = async (values) => {
    try {
      if (userNameParam && initialValues.id) {
        const updatedUsers = users.map((u) => (u.id === values.id ? values : u));// duyệt qua users, nếu user.id = values.id thay thế thông tin = values
        setUsers(updatedUsers); // cập nhật danh sách người dùng
        await updateUser(initialValues.id, values); // Sử dụng API updateUser
      } else {
        if (users.some((u) => u.email === values.email)) { 
          alert('Người dùng với email này đã tồn tại');
          return;
        }
        const newUser = await addUser(values); // Sử dụng API addUser
        setUsers([...users, newUser]);// cập nhật newUser vào cuối danh sách.
      }
      navigate('/data');
    } catch (error) {
      console.error("Lỗi khi cập nhật hoặc thêm người dùng:", error);
    }
  };

  return (
    <div>
      <div className="form">
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="form-group">
              <p>{userNameParam ? 'Edit User' : 'Add User'}</p>
              <div className="form-row">
                <label className="form-label">Name:</label>
                <Field className="form-input" type="text" name="name" />
                <ErrorMessage name="name" component="span" className="error" />
              </div>
              <div className="form-row">
                <label className="form-label">Email:</label>
                <Field className="form-input" type="text" name="email" />
                <ErrorMessage name="email" component="span" className="error" />
              </div>
              <div className="form-row">
                <label className="form-label">Role:</label>
                <Field as="select" name="role">
                  <option value="">Chọn role</option>
                  <option value="Admin">Admin</option>
                  <option value="User">User</option>
                </Field>
                <ErrorMessage name="role" component="span" className="error" />
              </div>
              <div className="form-btn">
                <button className="btn" type="submit">
                  {userNameParam ? 'Update' : 'Add'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default AddEditUser;
