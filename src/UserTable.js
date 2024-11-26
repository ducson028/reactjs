import React, { useState, useEffect } from 'react';

function DataTable() {
  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [sortOrder, setSortOrder] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState(data);
  

  useEffect(() => {
    // Initial mock data
    const initialData =[
      { name: "John Doe", email: "john@example.com", role: 'Admin' },
      { name: "Jane Smith", email: "jane@example.com", role: 'Admin' },
      { name: "Sam Green", email: "sam@example.com", role: 'User' },
      { name: " Doe", email: "doe@example.com", role: 'User' },
      { name: " Smith", email: "smith@example.com", role: 'User' },
      { name: " Green", email: "grenn@example.com", role: 'User' },
      { name: "Son ", email: "Son@example.com", role: 'Admin' },
      { name: "Cole ", email: "Cole@example.com", role: 'Admin' },
      { name: "Rone ", email: "Rone@example.com", role: 'User' },
      { name: "Haki ", email: "Haki@example.com", role: 'User' },
      { name: "Mason ", email: "Mason@example.com", role: 'User' },
      { name: "Cheas ", email: "Cheas@example.com", role: 'User' },
      { name: "Wiliam ", email: "wili@example.com", role: 'User' },
      { name: "Lami ", email: "lami@example.com", role: 'User' },
      { name: "Ledo ", email: "ledo@example.com", role: 'User' },
      { name: "Marco ", email: "marco@example.com", role: 'User' },
      { name: "Peter ", email: "peter@example.com", role: 'User' },
      { name: "Oscar ", email: "oscar@example.com", role: 'User' },
      { name: "Sky ", email: "sky@example.com", role: 'User' },
      { name: "Hurry ", email: "hurry@example.com", role: 'User' },
      { name: "Nega ", email: "nega@example.com", role: 'User' },
      { name: "Mita ", email: "mita@example.com", role: 'User' },
      { name: "Septem ", email: "septem@example.com", role: 'User' },
      { name: "Gray ", email: "gray@example.com", role: 'User' },
    ];
    setData(initialData);
    setFilteredData(initialData);
  }, []);

  const resetForm = () => {
    setName('');
    setEmail('');
    setRole('');
    setEditIndex(null);
  };

  // Thêm dữ liệu
  const handleAdd = () => {
    if (validateForm()) {
      if (editIndex !== null) { // đang chỉnh sửa một mục
        const updatedData = data.map((item, index) =>
          index === editIndex ? { name, email, role } : item
        );
        setData(updatedData); // cập nhật lại data
        setFilteredData(updatedData);
      } else {  // thêm mục
        const newData = [...data, { name, email, role }];
        setData(newData); // Thêm mục mới vào cuối mảng
        setFilteredData(newData); // Cập nhật filteredData
      }
      resetForm();
    }
  };

  

  const handleEdit = (index) => {
    const actualIndex = index + indexOfFirstItem; // Tính chỉ số thực tế trong mảng `data`
    setEditIndex(actualIndex);
    setName(data[actualIndex].name);
    setEmail(data[actualIndex].email);
    setRole(data[actualIndex].role);
  };
  
  // Xóa dữ liệu
  const handleDelete = (index) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa?')) {
      const newData = data.filter((_, i) => i !== index);
      setData(newData);
      setFilteredData(newData); // Cập nhật filteredData sau khi xóa
    }
  };

  // Hàm kiểm tra form
  const validateForm = () => {
    let isValid = true;

    // Reset thông báo lỗi
    setNameError('');
    setEmailError('');

    // Kiểm tra tên
    if (name === '') {
      setNameError('Vui lòng nhập tên của bạn.');
      isValid = false;
    }

    // Kiểm tra email
    if (email === '') {
      setEmailError('Vui lòng nhập email của bạn.');
      isValid = false;
    }

    return isValid;
  };

  // Tìm kiếm dữ liệu
  const handleSearch = () => {
    const filtered = data.filter(item =>//sử dụng filter để tạo ra 1 mảng chỉ chứ items với tiêu chí tìm kiếm
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.role.toLowerCase().includes(searchTerm.toLowerCase())
    );// includes() kiểm tra từ khóa tìm kiếm
    setData(filtered);
    setFilteredData(filtered);// kết quả lọc mảng filter được lưa vào biến filteresData
                              // thông qua hàm setFilteredData(filter). Biến này chứa dsach các mục khớp với từ tìm kiếm
    setCurrentPage(1); // Reset về trang 1 sau khi tìm kiếm
  };                          

 


  // useEffect(() => { // tham số data thay đổi thì useEffect mới chạy
  //   setFilteredData(data);// khi đó filteredData  sẽ được cập nhật
  // }, [data]);

  // Sắp xếp dữ liệu
  const handleSort = (field) => { // hàm sẽ sắp xếp dựa trên giá trị của field
    const sortedData = [...filteredData].sort((a, b) =>// sao chép mảng để tạo ra bản mới.
      sortOrder
        ? a[field].toString().localeCompare(b[field].toString())// sortOreder là true sắp xếp tăng dần và so sánh  a[field] với b[field]
        : b[field].toString().localeCompare(a[field].toString())// sortOreder là false sắp xếp giảm dần và so sánh b[field] với a[field]
    );
    setSortOrder(!sortOrder); 
    setFilteredData(sortedData); // cập nhật lại dữ liệu đã lọc
  };

  
    // Tính toán các chỉ số để cắt dữ liệu cho trang hiện tại
    const itemsPerPage = 3; // số lượng itesm hiển thị mỗi trang
    const totalItems = filteredData.length; //tổng số mục trong data
    const totalPages = Math.ceil(totalItems / itemsPerPage);// tính tổng số trang
    const maxPageButtons = 5; // Số nút phân trang hiển thị
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);


  const paginate = (pageNumber) => setCurrentPage(pageNumber);//cập nhật giá trị của currentPage với trang người dùng chọn (pageNumber)

  // Tính toán trang đầu tiên và trang cuối cùng để hiển thị
const getPageNumbers = () => {
  let startPage, endPage;
  if (totalPages <= maxPageButtons) { //nếu tổng số trang <= số nút trang
    startPage = 1;                    //hiển thị từ trang 1 đến cuối
    endPage = totalPages;
  } else {                    //nếu tổng số trang lớn hơn số nút tràn
    const halfMaxButtons = Math.floor(maxPageButtons / 2);
    if (currentPage <= halfMaxButtons) { // xử lý trang nằm gần đầu
      startPage = 1;
      endPage = maxPageButtons;
    } else if (currentPage + halfMaxButtons >= totalPages) { //xử lý trang nằm gần cuối
      startPage = totalPages - maxPageButtons + 1;
      endPage = totalPages;
    } else { //xử lý trang nằm giữa
      startPage = currentPage - halfMaxButtons;
      endPage = currentPage + halfMaxButtons;
    }
  }
  return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
};

// Hàm phân trang động
const pageNumbers = getPageNumbers();


  return (
    <div>
      {/* Form thêm/sửa */}
      <div className="form">
        <form className="form-group" onSubmit={(e) =>
          {e.preventDefault();handleAdd();}
        }>
          <p>Add User</p><br />
          <div className="form-row">
            <label className="form-label" htmlFor="name">Name</label>
            <input className="form-input" type="text" id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {nameError && <span style={{ color: 'red' }}>{nameError}</span>}
          </div>

          <div className="form-row">
            <label className="form-label" htmlFor="email">Email</label>
            <input className="form-input" type="text" id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && <span style={{ color: 'red' }}>{emailError}</span>}
          </div>

          <div className="form-row">
            <label className="form-label">Role</label>
            <select className="form-input"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value=""></option>
              <option value="Admin">Admin</option>
              <option value="User">User</option>
            </select>
          </div>

          <div className="form-btn">
            <button type="button" className="btn" onClick={handleAdd}>
              {editIndex !== null ? 'Update' : 'Submit'}
            </button>
          </div>
        </form>
      </div>

      {/* Tìm kiếm */}
      <section className="load">
        <div className="data">
          <p>User List</p><br />
        </div>
        <input className="search" type="text" id="searchInput" placeholder="Search for names..."
          value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <button className="btn-search" onClick={handleSearch}>
          Search
        </button>

        <div className="load_data">
          <table id="myTable">
            <thead>
              <tr>
                <th>Name<i onClick={() => handleSort('name')} className="fas fa-sort" style={{ padding: "5px" }}></i></th>
                <th>Email<i onClick={() => handleSort('email')} className="fas fa-sort" style={{ padding: "5px" }}></i></th>
                <th>Role<i onClick={() => handleSort('role')} className="fas fa-sort" style={{ padding: "5px" }}></i></th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.role}</td>
                  <td>
                  <button onClick={() => handleEdit(index + indexOfFirstItem)} className='btn-edit'>Edit</button>
                  <button onClick={() => handleDelete(index + indexOfFirstItem)} className='btn-delete'>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>


        <div className="pagination">
        <p>Số lượng người dùng: {filteredData.length}</p>
    <button onClick={() => paginate(1)} disabled={currentPage === 1}>
      First
    </button>
    <button onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)} disabled={currentPage === 1}>
      Prev
    </button>
    
    {/* Hiển thị các nút trang */}
    {pageNumbers[0] > 1 && <span>...</span>}
    {pageNumbers.map((number) => (
      <button
        key={number}
        onClick={() => paginate(number)}
        className={number === currentPage ? 'active' : ''}
      >
        {number}
      </button>
    ))}
    {pageNumbers[pageNumbers.length - 1] < totalPages && <span>...</span>}
    
    <button onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : totalPages)} disabled={currentPage === totalPages}>
      Next
    </button>
    <button onClick={() => paginate(totalPages)} disabled={currentPage === totalPages}>
      Last
    </button>
  </div>

      </section>
    </div>
  );
}

export default DataTable;







