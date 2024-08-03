import _ from "lodash";

const Question = (props) => {
  const { data, currentQuestion } = props;
  if (_.isEmpty(data)) {
    return <></>;
  }

  const handleCheckBox = (event, itemId, questionId) => {
    // console.log(">>> check: ", event.target.checked);
    // console.log(id);
    props.handleCheckbox(itemId, questionId);
  };

  return (
    <>
      <div className="q-image">
        {data.image && (
          <img alt="image" src={`data:image/jpeg;base64,${data.image}`} />
        )}
      </div>

      <div className="question">
        {currentQuestion + 1}: {data.questionDescription}
      </div>
      <div className="answer">
        {data.answers &&
          data.answers.length &&
          data.answers.map((item, index) => {
            return (
              <div key={`answer-${index}`} className="a-child">
                <div className="form-check">
                  <input
                    checked={item.isSelected}
                    className="form-check-input"
                    type="checkbox"
                    onChange={(event) =>
                      handleCheckBox(event, item.id, data.questionId)
                    }
                  />
                  <label>{item.description}</label>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Question;
