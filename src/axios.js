import axios from 'axios';

// Cấu hình cơ bản của axios
const axiosInstance = axios.create({
  baseURL: 'https://670f29fa3e7151861656bff0.mockapi.io/api/ds',
  headers: {
    'Content-Type': 'application/json',
  },
});

// API để thêm người dùng mới
export const addUser = async (user) => {
  try {
    const response = await axiosInstance.post('/name', user);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi thêm người dùng:', error);
    throw error;
  }
};

// API để cập nhật thông tin người dùng
export const updateUser = async (id, user) => {
  try {
    const response = await axiosInstance.put(`/name/${id}`, user);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi cập nhật người dùng:', error);
    throw error;
  }
};

// API để lấy danh sách người dùng
export const fetchUsers = async () => {
  try {
    const response = await axiosInstance.get('/name');
    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách người dùng:', error);
    throw error;
  }
};

// API để xóa người dùng theo email
export const deleteUser = async (id) => {
  try {
    const response = await axiosInstance.delete(`/name/${id}`);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi xóa người dùng:', error);
    throw error;
  }
};
