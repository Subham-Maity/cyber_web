import { useState } from "react";
import { RadioGroup } from "@headlessui/react";

const Question = ({
  question,
  options,
}: {
  question: string[];
  options: string[];
}) => {
  const [selected, setSelected] = useState("");
  // console.log(selected);
  return (
    <>
      {question.length > 1 && (
        <div className="_questionContainer">
          <p className="mb-1">{question[0]}</p>
          <div className="_row">
            <RadioGroup value={selected} onChange={setSelected}>
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
                              <RadioGroup.Label
                                as="div"
                                // className={`font-medium  ${
                                //   checked ? "text-white" : "text-gray-900"
                                // }`}
                              >
                                {option}
                              </RadioGroup.Label>
                              {/* <RadioGroup.Description
                            as="span"
                            className={`inline ${
                              checked ? "text-sky-100" : "text-gray-500"
                            }`}
                          >
                            <span>
                              {plan.ram}/{plan.cpus}
                            </span>{" "}
                            <span aria-hidden="true">&middot;</span>{" "}
                            <span>{plan.disk}</span>
                          </RadioGroup.Description> */}
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
            </RadioGroup>
          </div>
          {/* <div>{question[question.length - 1]}</div> */}
        </div>
      )}
    </>
  );
};

export default function Example({ text }: { text: string[][] }) {
  return (
    <div>
      {text?.map((obj, index) => {
        const option = obj.filter(
          (item, index) => index !== 0 && index !== obj.length - 1
        );
        // console.log(option, "[[question]]");
        return <Question question={obj} options={option} />;
      })}
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
