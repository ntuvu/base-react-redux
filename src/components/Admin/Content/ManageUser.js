import ModalCreateUser from "./ModalCreateUser";
import "./ManageUser.scss";
import { FcPlus } from "react-icons/fc";
import { useEffect, useState } from "react";
import { getUsersWithPaginate } from "../../../services/apiService";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalViewUser from "./ModalViewUser";
import ModalDeleteUser from "./ModalDeleteUser";
import TableUserPaginate from "./TableUserPaginate";

const ManageUser = (props) => {
  const LIMIT_USER = 6;
  // state
  const [isShowModalCreateUser, setIsShowModalCreateUser] = useState(false);
  const [isShowModalUpdateUser, setIsShowModalUpdateUser] = useState(false);
  const [isShowModalViewUser, setIsShowModalViewUser] = useState(false);
  const [isShowModalDeleteUser, setIsShowModalDeleteUser] = useState(false);
  const [listUsers, setListUsers] = useState([]);
  const [dataUpdate, setDataUpdate] = useState({});
  const [dataDelete, setDataDelete] = useState({});
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchListUsersWithPaginate(1);
  }, []);

  // const fetchListUsers = async () => {
  //   const res = await getAllUsers();
  //   if (res.EC === 0) {
  //     setListUsers(res.DT);
  //   }
  // };

  const fetchListUsersWithPaginate = async (page) => {
    const res = await getUsersWithPaginate(page, LIMIT_USER);
    if (res.EC === 0) {
      setListUsers(res.DT.users);
      setPageCount(res.DT.totalPages);
    }
  };

  const handleClickBtnUpdate = (user) => {
    setIsShowModalUpdateUser(true);
    setDataUpdate(user);
  };

  const resetDataUpdate = () => {
    setDataUpdate({});
  };

  const handleClickBtnView = (user) => {
    setIsShowModalViewUser(true);
    setDataUpdate(user);
  };

  const handleClickBtnDelete = (user) => {
    setIsShowModalDeleteUser(true);
    setDataDelete(user);
  };

  return (
    <div className={"manage-user-container"}>
      <div className={"title"}>Manage user</div>
      <div className={"users-content"}>
        <div className={"btn-add-new"}>
          <button
            className={"btn btn-primary"}
            onClick={() => setIsShowModalCreateUser(true)}
          >
            <FcPlus />
            Add new user
          </button>
        </div>
        <div className={"table-users-container"}>
          {/*<TableUser*/}
          {/*  listUsers={listUsers}*/}
          {/*  handleClickBtnUpdate={handleClickBtnUpdate}*/}
          {/*  handleClickBtnView={handleClickBtnView}*/}
          {/*  handleClickBtnDelete={handleClickBtnDelete}*/}
          {/*/>*/}
          <TableUserPaginate
            listUsers={listUsers}
            handleClickBtnUpdate={handleClickBtnUpdate}
            handleClickBtnView={handleClickBtnView}
            handleClickBtnDelete={handleClickBtnDelete}
            fetchListUsersWithPaginate={fetchListUsersWithPaginate}
            pageCount={pageCount}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
        <ModalCreateUser
          show={isShowModalCreateUser}
          setShow={setIsShowModalCreateUser}
          fetchListUsersWithPaginate={fetchListUsersWithPaginate}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        <ModalUpdateUser
          show={isShowModalUpdateUser}
          setShow={setIsShowModalUpdateUser}
          dataUpdate={dataUpdate}
          fetchListUsersWithPaginate={fetchListUsersWithPaginate}
          resetDataUpdate={resetDataUpdate}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        <ModalViewUser
          show={isShowModalViewUser}
          setShow={setIsShowModalViewUser}
          dataUpdate={dataUpdate}
          resetDataUpdate={resetDataUpdate}
        />
        <ModalDeleteUser
          show={isShowModalDeleteUser}
          setShow={setIsShowModalDeleteUser}
          dataDelete={dataDelete}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          fetchListUsersWithPaginate={fetchListUsersWithPaginate}
        />
      </div>
    </div>
  );
};

export default ManageUser;
