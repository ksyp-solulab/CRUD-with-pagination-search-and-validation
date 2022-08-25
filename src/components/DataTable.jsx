import { useState } from "react";
import Table from "react-bootstrap/Table";
import ReactPaginate from "react-paginate";


import {deleteUser,getUser} from '../redux/userSlice'


const DataTable = ({mainData,data,dispatch,setShowModel,handleSidebarShow,setEdit }) => {
    const [pageNumber, setPageNumber] = useState(0);
    const dataPerPage = 5;
  const pagesVisited = pageNumber * dataPerPage;
    const displayUsers = mainData
  .slice(pagesVisited, pagesVisited + dataPerPage)
  .map((item) => {
    return (
      <tbody key={item.id}>
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
  const pageCount = Math.ceil(data.length / dataPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const singleUserDelete = (id) => {
    if (window.confirm("Do You Want To Delete Record")) {
      dispatch(deleteUser(id));
    }
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

  const handleShow = () => setShowModel(true);
  return (
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
  )
}

export default DataTable