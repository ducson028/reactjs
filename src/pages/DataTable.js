import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
import useUserStore from '../store';
import { fetchUsers, deleteUser } from '../axios';

function DataTable() {
  const { users, setUsers } = useUserStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [filteredData, setFilteredData] = useState(users);
  const [selectedRole, setSelectedRole] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const navigate = useNavigate();

  // Lấy danh sách người dùng từ API
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
        setFilteredData(data);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu người dùng:', error);
      }
    };
    loadUsers();
  }, [setUsers]);

  // Tìm kiếm và lọc dữ liệu
  const handleSearch = () => {
    const filtered = users.filter(
      (item) =>
        (item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (selectedRole === '' || item.role === selectedRole)
    );
    setFilteredData(filtered);
    setCurrentPage(1);
  };

  // Chọn/xóa người dùng
  const handleSelectUser = (id) => {
    setSelectedUsers((prevSelectedUsers) =>
      prevSelectedUsers.includes(id)
        ? prevSelectedUsers.filter((selected) => selected !== id)
        : [...prevSelectedUsers, id]
    );
  };

  const handleDeleteSelected = async () => {
    try {
      const updatedUsers = users.filter((user) => !selectedUsers.includes(user.id));
      setFilteredData(updatedUsers);

      // Tính lại trang hiện tại nếu cần
      const totalPagesAfterDeletion = Math.ceil(updatedUsers.length / itemsPerPage);
      if (currentPage > totalPagesAfterDeletion) {
        setCurrentPage(totalPagesAfterDeletion);
      }

      // Cập nhật trạng thái người dùng
      setUsers(updatedUsers);

      // Xóa qua API
      await Promise.all(selectedUsers.map((id) => deleteUser(id)));

      setSelectedUsers([]);
    } catch (error) {
      console.error('Lỗi khi xoá người dùng:', error);
    }
  };

  // Sắp xếp dữ liệu
  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Dữ liệu hiện tại sau phân trang
  const currentItems = React.useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return filteredData.slice(indexOfFirstItem, indexOfLastItem);
  }, [currentPage, itemsPerPage, filteredData]);

  const totalPages = React.useMemo(() => {
    return Math.ceil(filteredData.length / itemsPerPage);
  }, [filteredData, itemsPerPage]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <section className="load">
        <div className="data">
          <p>User List</p>
          <button className="btn-add" onClick={() => navigate('/add-edit')}>
            Add
          </button>
          <button
            onClick={handleDeleteSelected}
            className="btn-delete"
            disabled={selectedUsers.length === 0}
          >
            Delete
          </button>

          <input
            type="text"
            className="search"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={handleSearch} className="btn-search">
            Search
          </button>

          <select
            className="filter"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            <option value="">All</option>
            <option value="Admin">Admin</option>
            <option value="User">User</option>
          </select>
        </div>

        <div className="load_data">
          <table>
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      if (e.target.checked) {
                        const newSelections = currentItems.map((user) => user.id);
                        setSelectedUsers([...new Set([...selectedUsers, ...newSelections])]);
                      } else {
                        const currentIds = currentItems.map((user) => user.id);
                        setSelectedUsers(selectedUsers.filter((id) => !currentIds.includes(id)));
                      }
                    }}
                    checked={currentItems.length > 0 && currentItems.every((user) => selectedUsers.includes(user.id))}
                  />
                </th>
                <th onClick={() => handleSort('name')}>
                  Name {sortConfig.key === 'name' ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : ''}
                </th>
                <th onClick={() => handleSort('email')}>
                  Email {sortConfig.key === 'email' ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : ''}
                </th>
                <th onClick={() => handleSort('role')}>
                  Role {sortConfig.key === 'role' ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : ''}
                </th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((user) => (
                <tr key={user.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => handleSelectUser(user.id)}
                    />
                  </td>
                  <td
                    className="click"
                    onClick={() => navigate(`/add-edit/${user.id}`, { state: { user } })}
                  >
                    {user.name}
                  </td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pagination">
          {/* Pagination Controls */}
          <div>
            <select
              className="perpage"
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </div>
          <div className="page">
            <button onClick={() => paginate(1)} disabled={currentPage === 1} className="btn-first">
              First
            </button>
            <button onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)} disabled={currentPage === 1}>
              Prev
            </button>

            {/* Pages */}
            {currentPage > 3 && (
              <>
                <button onClick={() => paginate(1)}>1</button>
                <span>...</span>
              </>
            )}

            {Array.from({ length: totalPages }, (_, index) => {
              const pageNum = index + 1;
              if (pageNum >= currentPage - 1 && pageNum <= currentPage + 1) {
                return (
                  <button
                    key={index}
                    onClick={() => paginate(pageNum)}
                    className={pageNum === currentPage ? 'active' : ''}
                  >
                    {pageNum}
                  </button>
                );
              }
              return null;
            })}

            {currentPage < totalPages - 2 && (
              <>
                <span>...</span>
                <button onClick={() => paginate(totalPages)}>{totalPages}</button>
              </>
            )}

            <button onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : totalPages)} disabled={currentPage === totalPages}>
              Next
            </button>
            <button onClick={() => paginate(totalPages)} disabled={currentPage === totalPages} className="btn-last">
              Last
            </button>
          </div>
        </div>

      </section>
    </div>
  );
}

export default DataTable;
