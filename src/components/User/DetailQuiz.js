import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getQuestionsByQuizId } from "../../services/apiService";
import _ from "lodash";
import "./DetailQuiz.scss";
import Question from "./Question";

const DetailQuiz = () => {
  const params = useParams();
  const location = useLocation();
  const quizId = params.id;

  // state
  const [dataQuiz, setDataQuiz] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  useEffect(() => {
    fetchQuestions();
  }, [quizId]);

  const fetchQuestions = async () => {
    const res = await getQuestionsByQuizId(quizId);
    if (res.EC === 0) {
      const raw = res.DT;
      const data = _.chain(raw)
        .groupBy("id")
        .map((value, key) => {
          let answers = [];
          let questionDescription,
            image = null;
          value.forEach((item, index) => {
            if (index === 0) {
              questionDescription = item.description;
              image = item.image;
            }
            item.answers.isSelected = false;
            answers.push(item.answers);
          });
          return { questionId: key, answers, questionDescription, image };
        })
        .value();
      setDataQuiz(data);
    }
  };

  const handleBack = () => {
    if (currentQuestion - 1 < 0) {
      return;
    }
    setCurrentQuestion(currentQuestion - 1);
  };

  const handleNext = () => {
    if (dataQuiz && dataQuiz.length > currentQuestion + 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleFinish = () => {};

  const handleCheckbox = (answerId, questionId) => {
    console.log(`answerId=${answerId}, questionId=${questionId}`);
    let dataQuizClone = _.cloneDeep(dataQuiz);
    console.log(`dataQuizClone=${dataQuizClone}`);
    let question = dataQuizClone.find((item) => item.questionId === questionId);
    console.log(">>> question", question);
    if (question && question.answers) {
      question.answers.forEach((item) => {
        if (item.id === answerId) {
          item.isSelected = !item.isSelected;
        }
      });
    }
    const index = dataQuizClone.findIndex(
      (item) => item.questionId === questionId,
    );
    if (index > -1) {
      dataQuizClone[index] = question;
      setDataQuiz(dataQuizClone);
    }
    console.log(">>> question after update", question);
  };

  return (
    <div className="detail-quiz-container">
      {/*left content*/}
      <div className="left-content">
        <div className="title">
          Quiz {quizId}: {location?.state?.quizTitle}
        </div>

        <hr />

        <div className="q-body">
          <img />
        </div>

        <div className="q-content">
          <Question
            currentQuestion={currentQuestion}
            data={
              dataQuiz && dataQuiz.length > 0 ? dataQuiz[currentQuestion] : []
            }
            handleCheckbox={handleCheckbox}
          />
        </div>

        <div className="footer">
          <button className="btn btn-secondary" onClick={() => handleBack()}>
            Back
          </button>
          <button className="btn btn-primary" onClick={() => handleNext()}>
            Next
          </button>
          <button className="btn btn-warning" onClick={() => handleFinish()}>
            Finish
          </button>
        </div>
      </div>
      {/*right content*/}
      <div className="right-content">count down</div>
    </div>
  );
};

export default DetailQuiz;
