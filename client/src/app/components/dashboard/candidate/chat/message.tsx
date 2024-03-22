import { time } from "console";
import "./message.css";
import { format } from "timeago.js";
import { useAppSelector } from "@/redux/hook";
import { RootState } from "@/redux/store";

const StyledResponse = ({ text }: { text: string }) => {
  const textArr = text.split("\n");

  return (
    <div>
      {textArr.map((val) => (
        <p key={val}>{val}</p>
      ))}
    </div>
  );
};

export default function Message({
  message,
  own,
  time,
}: {
  message: string;
  own: boolean;
  time: Date;
}) {
  const { currEmployer } = useAppSelector((state: RootState) => state.employer);
  const { currCandidate } = useAppSelector(
    (state: RootState) => state.candidate.candidateDashboard
  );

  return (
    <div className={own ? "message own" : "message"}>
      {own ? (
        <div className="d-flex justify-content-start">
          <div className=" d-flex flex-column align-items-end   ">
            <p className="messageText">{message}</p>
            <div className="messageBottom">{format(time)}</div>
          </div>
          <div className="messageTop">
            <img
              className="messageImg "
              src={currEmployer?.avatar || currCandidate?.avatar}
              alt=""
            />
          </div>
        </div>
      ) : (
        <div className="d-flex justify-content-start">
          <div className="messageTop">
            <img
              className="messageImg "
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              alt=""
            />
          </div>
          <div className=" d-flex flex-column align-items-start   ">
            <p className="messageText">
              <StyledResponse text={message} />
            </p>
            <div className="messageBottom"> {format(time)}</div>
          </div>
        </div>
      )}
    </div>
  );
}
