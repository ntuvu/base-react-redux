import ModalCreateUser from "./ModalCreateUser";
import "./ManageUser.scss";
import { FcPlus } from "react-icons/fc";
import { useState } from "react";

const ManageUser = (props) => {
  const [isShowModalCreateUser, setIsShowModalCreateUser] = useState(false);

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
        <div>table users</div>
        <ModalCreateUser
          show={isShowModalCreateUser}
          setShow={setIsShowModalCreateUser}
        />
      </div>
    </div>
  );
};

export default ManageUser;
