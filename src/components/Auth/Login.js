import "./Auth.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postLogin } from "../../services/apiService";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { doLogin } from "../../redux/action/userAction";
import { ImSpinner10 } from "react-icons/im";
import validateEmail from "../../utils/validateEmail";

const Login = (props) => {
  // state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async () => {
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

    setIsLoading(true);

    // call api
    const data = await postLogin(email, password);
    if (data && data.EC === 0) {
      dispatch(doLogin(data));
      toast.success(data.EM);
      setIsLoading(false);
      navigate("/");
    }
    if (data && data.EC !== 0) {
      toast.error(data.EM);
    }
  };

  return (
    <div className={"login-container"}>
      <div className={"header"}>
        <span>Don't have an account yet?</span>
        <button onClick={() => navigate("/register")}>Sign Up</button>
      </div>
      <div className={"title col-4 mx-auto"}>WEB TEST</div>
      <div className={"welcome col-4 mx-auto"}>Hello, who's this?</div>
      <div className={"content-form col-4 mx-auto"}>
        <div className={"form-group"}>
          <label>Email</label>
          <input
            type={"email"}
            className={"form-control"}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <label>Password</label>
          <input
            type={"password"}
            className={"form-control"}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <span className={"forgot-password"}>Forgot password</span>
        <div>
          <button
            disabled={isLoading}
            className={"btn-submit"}
            onClick={() => handleLogin()}
          >
            {isLoading === true && <ImSpinner10 className="loader-icon" />}
            <span>Login</span>
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

export default Login;
