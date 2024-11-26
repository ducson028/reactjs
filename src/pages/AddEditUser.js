import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import useUserStore from '../store';
import { addUser, updateUser } from '../axios'; 
import './style.css';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Vui lòng nhập tên'),
  email: Yup.string().email('Email không đúng định dạng').required('Vui lòng nhập email'),
  role: Yup.string().required('Vui lòng chọn role'),
});

function AddEditUser() {
  const { users, setUsers } = useUserStore();
  const navigate = useNavigate();
  const { name: userNameParam } = useParams();
  const location = useLocation();
  const [initialValues, setInitialValues] = useState({ name: '', email: '', role: '' });

  useEffect(() => {
    if (location.state?.user) {
      setInitialValues(location.state.user);
    } else if (userNameParam) {
      const user = users.find((u) => u.name === userNameParam);
      if (user) {
        setInitialValues(user);
      }
    }
  }, [userNameParam, location.state, users]);

  const handleSubmit = async (values) => {
    try {
      if (userNameParam && initialValues.id) {
        const updatedUsers = users.map((u) => (u.id === values.id ? values : u));
        setUsers(updatedUsers);
        await updateUser(initialValues.id, values); // Sử dụng API updateUser
      } else {
        if (users.some((u) => u.email === values.email)) {
          alert('Người dùng với email này đã tồn tại');
          return;
        }
        const newUser = await addUser(values); // Sử dụng API addUser
        setUsers([...users, newUser]);
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
