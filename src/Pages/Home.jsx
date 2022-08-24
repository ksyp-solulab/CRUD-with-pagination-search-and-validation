import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useSelector, useDispatch } from "react-redux";
import Form from "react-bootstrap/Form";
import { addUser, getUser,clearDup, deleteUser, clearUser, updateUser } from "./../Redux/userSlice";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ReactPaginate from "react-paginate";

const Home = () => {
  const data = useSelector((state) => state.user.users);
  const [showSidebar, setShowSidebar] = useState(false);
  const [edit, setEdit] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [mainData, setMainData] = useState(data);
  const [filterVal,setFilterVal] = useState("")
  const dataPerPage = 5;
  const pagesVisited = pageNumber * dataPerPage;
  const dispatch = useDispatch();
  

  const handleSidebarClose = () => {
    setShowSidebar(false);
    dispatch(clearUser());
    setEdit(false);
  };
  const handleSidebarShow = () => {
    dispatch(clearDup())
    setShowSidebar(true);
    setUser({
      id: Math.floor(Math.random() * 10000000000 + 1),
      number: "",
      email: "",
      region: "",
    });
  };
  
  const DUP = useSelector((state) => state.user.dup);
  const singleData = useSelector((state) => state.user.singleUser);
  
  const [user, setUser] = useState({
    id: Math.floor(Math.random() * 10000000000 + 1),
    number: "",
    email: "",
    region: "",
  });
  const pageCount = Math.ceil(data.length / dataPerPage);
  const displayUsers = mainData
  .slice(pagesVisited, pagesVisited + dataPerPage)
  .map((item, index) => {
    return (
      <tbody key={index}>
        <tr>
          <td>{item.email}</td>
          <td>{item.number}</td>
          <td>{item.region}</td>
          <td>
            <button
              className="action"
              onClick={() => singleUsershow(item.id)}
            >
              <i className="fa-solid fa-eye" />
            </button>
            <button
              className="action"
              onClick={() => {
                singleUseredit(item.id);
              }}
            >
              <i className="fa-solid fa-pen" />
            </button>
            <button
              className="action"
              onClick={() => singleUserDelete(item.id)}
            >
              <i className="fa-solid fa-trash" />
            </button>
          </td>
        </tr>
      </tbody>
    );
  });
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  const handleChange = (props) => (event) => {
    setUser({ ...user, [props]: event.target.value });
  };
  const handelSubmit = (e) => {
      e.preventDefault();
    dispatch(addUser(user));

    setShowSidebar(false);

  };

  const singleUsershow = (id) => {
    dispatch(getUser(id));
    handleShow();
  };
  const singleUseredit = (id) => {
    dispatch(getUser(id));
    setEdit(true);
    handleSidebarShow();
  };
  const singleUserDelete = (id) => {
    if (window.confirm("Do You Want To Delete Record")) {
      dispatch(deleteUser(id));
    }
  };
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    dispatch(clearUser());
  };
  const handleShow = () => setShow(true);
  const editData = () => {
    dispatch(updateUser({id:singleData.id,user}));
    setShowSidebar(false);
  }
  useEffect(() => {
    setUser({
      id: singleData.id,
      number: singleData.number,
      email: singleData.email,
      region: singleData.region,
    });
  }, [singleData]);

  useEffect(() => {
    setMainData(data)
  },[data])

const handelFilter = (e) => {
  if(e.target.value === ""){
    setMainData(data)
  }else{
    const filterData = data.filter(item => item.email.toLowerCase().includes(e.target.value.toLowerCase()) || item.number.toLowerCase().includes(e.target.value.toLowerCase()) ||item.region.toLowerCase().includes(e.target.value.toLowerCase()));
    setMainData(filterData)
  }
  setFilterVal(e.target.value)
}

  return (
    <>
      {/* {
        DUP === true && alert("User ragistred with same email")
      } */}
      <h2>CRUD WITH Redux-Saga</h2>
      <Button
        variant="primary"
        onClick={handleSidebarShow}
        style={{ marginBottom: "10px" }}
      >
        Add User
      </Button>
      <input className="searchBar" placeholder="Search Data" value={filterVal} onInput={(e) => {handelFilter(e)}}/>
      <Offcanvas show={showSidebar} onHide={handleSidebarClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            {edit ? <>Update Data</> : <>Add New Data</>}
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form onSubmit={handelSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={handleChange("email")}
                value={user.email}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter phone number"
                onChange={handleChange("number")}
                value={user.number}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Region</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Region"
                onChange={handleChange("region")}
                value={user.region}
              />
            </Form.Group>
            {edit ? (
              <Button variant="primary" onClick={() => editData()}>
                 Update Data
              </Button>
            ) : (
              <Button variant="primary" type="submit">
                Add Data
              </Button>
            )}
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
      <Table striped bordered size="s">
        <thead>
          <tr>
            <th>email</th>
            <th>number</th>
            <th>Region</th>
            <th>Actions</th>
          </tr>
        </thead>
        {displayUsers}
        <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"active"}
      />
      </Table>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Single User Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table>
            <tr>
              <td>Email:</td>
              <td>{singleData.email}</td>
            </tr>
            <tr>
              <td>Phone:</td>
              <td>{singleData.number}</td>
            </tr>
            <tr>
              <td>Address:</td>
              <td>{singleData.region}</td>
            </tr>
          </table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Home;
