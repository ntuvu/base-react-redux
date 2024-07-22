import videoHomePage from "../../assets/video-homepage.mp4";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const HomePage = (props) => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  return (
    <div className={"homepage-container"}>
      <video autoPlay muted loop>
        <source src={videoHomePage} type={"video/mp4"} />
      </video>
      <div className={"homepage-content"}>
        <div className={"title-1"}>There's a better way to ask</div>
        <div className={"title-2"}>
          You don't want to answer one. Create a typeform instead-and make
          everyone happy.
        </div>
        <div className={"title-3"}>
          {isAuthenticated === false ? (
            <button onClick={() => navigate("/login")}>
              Get's started. It's free
            </button>
          ) : (
            <button onClick={() => navigate("/users")}>Start now!!!</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
