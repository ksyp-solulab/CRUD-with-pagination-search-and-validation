import { useState,useEffect } from "react";

import Form from "react-bootstrap/Form";
import Offcanvas from "react-bootstrap/Offcanvas";
import Button from "react-bootstrap/Button";
import { uid } from 'uid';

import { updateUser,clearUser,addUser,clearDup} from "../redux/userSlice";
import DataTable from "./DataTable";

const InputForm = ({dispatch,singleData,mainData,data,setShowModel}) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [edit, setEdit] = useState(false);
  const [user, setUser] = useState({
    id: uid(),
    number: "",
    email: "",
    region: "",
  });

  const handleChange = (props) => (event) => {
    setUser({ ...user, [props]: event.target.value });
  };

  const editData = () => {
    dispatch(updateUser({id:singleData.id,user}));
    setShowSidebar(false);
  }

  const handleSidebarClose = () => {
    setShowSidebar(false);
    dispatch(clearUser());
    setEdit(false);
  };

  const handelSubmit = (e) => {
    e.preventDefault();
  dispatch(addUser(user));
  setShowSidebar(false);
};
const handleSidebarShow = () => {
  dispatch(clearDup())
  setShowSidebar(true);
  setUser({
    id: uid(),
    number: "",
    email: "",
    region: "",
  });
};

useEffect(() => {
  setUser({
    id: singleData.id,
    number: singleData.number,
    email: singleData.email,
    region: singleData.region,
  });
}, [singleData]);
  return (
    <>
    <Button
        variant="primary"
        onClick={handleSidebarShow}
        className="addBtn"
      >
        Add User
      </Button>
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
      <DataTable  mainData={mainData} dispatch={dispatch} data={data} setShowModel={setShowModel} setEdit={setEdit} handleSidebarShow={handleSidebarShow}/>
      
      </>
  )
}

export default InputForm