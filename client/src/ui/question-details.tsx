import { notifyInfo } from "@/utils/toast";
import { RadioGroup } from "@headlessui/react";
import { useState } from "react";

const Question = ({
  question,
  options,
  setUserAnswer,
  setAnswer,
  index,
}: {
  question: string[];
  options: string[];
  setAnswer: React.Dispatch<React.SetStateAction<string[]>>;
  setUserAnswer: React.Dispatch<React.SetStateAction<string[]>>;
  index: number;
}) => {
  const [selected, setSelected] = useState("");
  const value = selected;
  // if (selected && question[question.length - 1].includes(selected)) {
  //   setScore((prev) => prev + 1);
  // }
  const handleSelected = (value: string) => {
    setUserAnswer((prevUserAnswer) => {
      const updatedUserAnswer = [...prevUserAnswer];
      updatedUserAnswer[index] = value;
      return updatedUserAnswer;
    });

    setAnswer((prevAnswer) => {
      const updatedAnswer = [...prevAnswer];
      updatedAnswer[index] = question[question.length - 1];
      return updatedAnswer;
    });

    setSelected(value);
  };

  return (
    <>
      {question.length > 1 && (
        <div className="_questionContainer">
          <p className="mb-1">{question[0]}</p>
          <div className="_row">
            <RadioGroup
              value={selected}
              onChange={(value) => handleSelected(value)}
              // onChange={setSelected}
            >
              <RadioGroup.Label className="sr-only">
                Server size
              </RadioGroup.Label>
              <div className="" style={{ marginTop: "0.5rem" }}>
                {options.map((option: string) => (
                  <RadioGroup.Option
                    key={option}
                    value={option}
                    className={({ active, checked }) =>
                      `${active ? "_active" : ""}
                  ${checked ? "_checked" : "bg_white"}
                  _shadow _common mb-3`
                    }
                  >
                    {({ active, checked }) => (
                      <>
                        <div className="_insideDiv1">
                          <div className="_insideDiv2">
                            <div className="text-sm">
                              <RadioGroup.Label as="div">
                                {option}
                              </RadioGroup.Label>
                            </div>
                          </div>
                          {checked && (
                            <div className="shrink-0 text-white">
                              <CheckIcon className="circle" />
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </RadioGroup.Option>
                ))}
              </div>
              {/* <p>{question[question.length - 1]}</p> */}
            </RadioGroup>
          </div>
        </div>
      )}
    </>
  );
};

export default function Example({
  text,
  setStep,
  setForm,
}: {
  text: string[][];
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setForm: React.Dispatch<
    React.SetStateAction<{
      testScore: number;
      appliedWithResume: string;
      jobLetter: string;
    }>
  >;
}) {
  // console.log(text, "text is here");
  // const questions = text.split("\n");
  // console.log(questions, "questions");

  const [userAnswer, setUserAnswer] = useState<string[]>(new Array(4).fill(""));
  const [answer, setAnswer] = useState<string[]>(new Array(4).fill(""));
  const [isSaved, setSaved] = useState(false);
  const [isAnsweredAll, setAnsweredAll] = useState(true);

  const handleSave = async () => {
    // console.log(text, "text");
    // console.log(userAnswer, "userAnswer");
    // console.log(answer, "answer");

    let score = 0;
    for (let index = 0; index < userAnswer.length; index++) {
      const val = userAnswer[index].trim();
      // Your logic here
      if (val) {
        if (answer[index].trim().includes(val)) {
          score++;
          // console.log(index, "score");
        }
        setAnsweredAll(true);
      } else {
        setAnsweredAll(false);
        notifyInfo("please Answer the all Questions");
        break;
      }
    }
    // console.log(score, "score");
    if (isAnsweredAll) {
      const netScore = (score / userAnswer.length) * 100;
      setForm((form) => ({
        ...form,
        testScore: netScore,
      }));
      setSaved(true);
    }
  };

  return (
    <div>
      {text?.map((obj, index) => {
        const options = obj.filter(
          (element, index) => index !== 0 && index !== obj.length - 1
        );

        return (
          <Question
            question={obj}
            options={options}
            index={index}
            setUserAnswer={setUserAnswer}
            setAnswer={setAnswer}
          />
        );
      })}
      {/* <button onClick={handleClick}>save</button>
      <button>apply now</button> */}
      <div className="button-group d-inline-flex align-items-center mt-30">
        <button
          type="button"
          onClick={handleSave}
          className="btn-one tran3s me-3"
        >
          {isSaved ? <span>Saved</span> : <span>Save</span>}
        </button>

        <button
          onClick={() => setStep((p) => p + 1)}
          className="btn-two tran3s"
        >
          {isSaved ? <span>Next</span> : <span>Skip</span>}
        </button>
      </div>
    </div>
  );
}

function CheckIcon(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
      <path
        d="M7 13l3 3 7-7"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
