import ModalCreateUser from "./ModalCreateUser";
import "./ManageUser.scss";
import { FcPlus } from "react-icons/fc";
import { useEffect, useState } from "react";
import TableUser from "./TableUser";
import { getAllUsers } from "../../../services/apiService";
import ModalUpdateUser from "./ModalUpdateUser";

const ManageUser = (props) => {
  const [isShowModalCreateUser, setIsShowModalCreateUser] = useState(false);
  const [isShowModalUpdateUser, setIsShowModalUpdateUser] = useState(false);
  const [listUsers, setListUsers] = useState([]);
  const [dataUpdate, setDataUpdate] = useState({});

  useEffect(() => {
    fetchListUsers();
  }, []);

  const fetchListUsers = async () => {
    const res = await getAllUsers();
    if (res.EC === 0) {
      setListUsers(res.DT);
    }
  };

  const handleClickBtnUpdate = (user) => {
    setIsShowModalUpdateUser(true);
    setDataUpdate(user);
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
          <TableUser
            listUsers={listUsers}
            handleClickBtnUpdate={handleClickBtnUpdate}
          />
        </div>
        <ModalCreateUser
          show={isShowModalCreateUser}
          setShow={setIsShowModalCreateUser}
          fetchListUsers={fetchListUsers}
        />
        <ModalUpdateUser
          show={isShowModalUpdateUser}
          setShow={setIsShowModalUpdateUser}
          dataUpdate={dataUpdate}
        />
      </div>
    </div>
  );
};

export default ManageUser;
