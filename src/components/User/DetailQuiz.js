import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getQuestionsByQuizId } from "../../services/apiService";

const DetailQuiz = () => {
  const params = useParams();
  const quizId = params.id;

  useEffect(() => {
    fetchQuestions();
  }, [quizId]);

  const fetchQuestions = async () => {
    const res = await getQuestionsByQuizId(quizId);
    console.log(">>> check questions: ", res);
  };
  return <div className="detail-quiz-container">DetailQuiz</div>;
};

export default DetailQuiz;
