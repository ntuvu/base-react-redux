import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import _ from "lodash";

function ModalViewUser(props) {
  const { show, setShow, dataUpdate } = props;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("USER");
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    if (!_.isEmpty(dataUpdate)) {
      // update state
      setEmail(dataUpdate.email);
      setUsername(dataUpdate.username);
      setRole(dataUpdate.role);
      if (dataUpdate.image) {
        setPreviewImage(`data:image/jpeg;base64,${dataUpdate.image}`);
      }
    }
  }, [dataUpdate]);

  // close modal, reset form data
  const handleClose = () => {
    setShow(false);
    setEmail("");
    setPassword("");
    setUsername("");
    setRole("USER");
    setPreviewImage("");
    props.resetDataUpdate();
  };

  return (
    <>
      <Modal
        className={"modal-add-user"}
        show={show}
        onHide={handleClose}
        size={"xl"}
        backdrop={"static"}
      >
        <Modal.Header closeButton>
          <Modal.Title>View user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input
                disabled
                type="email"
                className="form-control"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Password</label>
              <input
                disabled
                type="password"
                className="form-control"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Username</label>
              <input
                disabled
                type="text"
                className="form-control"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Role</label>
              <select
                disabled
                className="form-select"
                value={role}
                onChange={(event) => setRole(event.target.value)}
              >
                <option value={"ADMIN"}>ADMIN</option>
                <option value={"USER"}>USER</option>
              </select>
            </div>

            {/*<div className={"col-md-12"}>*/}
            {/*  <label*/}
            {/*    className={"form-label label-upload"}*/}
            {/*    htmlFor={"labelUpload"}*/}
            {/*  >*/}
            {/*    <FcPlus /> Upload File Image*/}
            {/*  </label>*/}
            {/*  <input*/}
            {/*    type={"file"}*/}
            {/*    hidden*/}
            {/*    id={"labelUpload"}*/}
            {/*    onChange={(event) => handleUploadImage(event)}*/}
            {/*  />*/}
            {/*</div>*/}
            <div className={"col-md-12 img-preview"}>
              {previewImage ? (
                <img alt={"avatar"} src={previewImage} />
              ) : (
                <span>Preview Image</span>
              )}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalViewUser;
