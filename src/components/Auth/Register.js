import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Auth.scss";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { postRegister } from "../../services/apiService";

const Register = (props) => {
  // state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);

  const navigate = useNavigate();

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
  };

  const handleRegister = async () => {
    // validate
    const isValidEmail = validateEmail(email);
    if (!isValidEmail) {
      toast.error("Invalid Email");
      return;
    }

    if (!password) {
      toast.error("Invalid Password");
      return;
    }

    // call api
    const data = await postRegister(email, username, password);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      navigate("/");
    }
    if (data && data.EC !== 0) {
      toast.error(data.EM);
    }
  };

  return (
    <div className={"login-container"}>
      <div className={"header"}>
        <span>Already have an account?</span>
        <button onClick={() => navigate("/login")}>Login</button>
      </div>
      <div className={"title col-4 mx-auto"}>WEB TEST</div>
      <div className={"welcome col-4 mx-auto"}>Start your journey?</div>
      <div className={"content-form col-4 mx-auto"}>
        <div className={"form-group"}>
          <label>Email</label>
          <input
            required
            type={"email"}
            className={"form-control"}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <label>Username</label>
          <input
            required
            type={"text"}
            className={"form-control"}
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <div className={"pass-group"}>
            <label>Password</label>
            <input
              required
              type={isShowPassword ? "text" : "password"}
              className={"form-control"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            {isShowPassword ? (
              <span
                className={"icons-eye"}
                onClick={() => setIsShowPassword(false)}
              >
                <VscEye />
              </span>
            ) : (
              <span
                className={"icons-eye"}
                onClick={() => setIsShowPassword(true)}
              >
                <VscEyeClosed />
              </span>
            )}
          </div>
        </div>
        <div>
          <button className={"btn-submit"} onClick={() => handleRegister()}>
            Create free account
          </button>
        </div>
        <div className={"text-center"}>
          <span
            className={"back"}
            onClick={() => {
              navigate("/");
            }}
          >
            {" "}
            &#60;&#60; Go to homepage{" "}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;
