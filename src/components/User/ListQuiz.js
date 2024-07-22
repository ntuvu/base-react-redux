import { useEffect, useState, useCallback } from "react";
import { getQuizsByUser } from "../../services/apiService";
import "./ListQuiz.scss";
import { useNavigate } from "react-router-dom";

const ListQuiz = () => {
  const navigate = useNavigate();
  // state
  const [listQuiz, setListQuiz] = useState([]);
  const [loading, setLoading] = useState(true);

  const getListQuiz = useCallback(async () => {
    try {
      const res = await getQuizsByUser();
      if (res?.EC === 0) {
        setListQuiz(res.DT);
      }
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getListQuiz();
  }, [getListQuiz]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (listQuiz.length === 0) {
    return <div>You don't have any quizzes now</div>;
  }

  return (
    <div className="list-quiz-container">
      {listQuiz.map((quiz, index) => (
        <div key={quiz.id} className="card" style={{ width: "18rem" }}>
          <img
            src={`data:image/jpeg;base64,${quiz.image}`}
            className="card-img-top"
            alt={`Quiz ${index + 1}`}
          />
          <div className="card-body">
            <h5 className="card-title">Quiz {index + 1}</h5>
            <p className="card-text">{quiz.description}</p>
            <button
              onClick={() => navigate(`/quiz/${quiz.id}`)}
              className="btn btn-primary"
            >
              Start now
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListQuiz;
