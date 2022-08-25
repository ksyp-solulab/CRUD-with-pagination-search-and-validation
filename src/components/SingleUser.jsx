import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import { clearUser } from "../redux/userSlice";

const SingleUser = ({showModel, setShowModel,singleData,dispatch}) => {
    

  const handleClose = () => {
    setShowModel(false);
    dispatch(clearUser());
  };
  
  return (
    <Modal show={showModel} onHide={handleClose}>
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
  )
}

export default SingleUser