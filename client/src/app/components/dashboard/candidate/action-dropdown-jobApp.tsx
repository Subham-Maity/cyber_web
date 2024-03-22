import view from "@/assets/dashboard/images/icon/icon_18.svg";
import share from "@/assets/dashboard/images/icon/icon_19.svg";
import { setCurrJobApp } from "@/redux/features/jobApp/slice";
import { setSubscriptionModel } from "@/redux/features/model/slice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import Image from "next/image";

const ActionDropdown = ({ jobAppId }: { jobAppId: string }) => {
  const dispatch = useAppDispatch();
  const {currCandidate} = useAppSelector((state) => state.candidate.candidateDashboard);
  const {userRole} = useAppSelector((state) => state.persistedReducer.user);
  const handleGetDetails = () => {
    // getCompanyDetails(dispatch, id);

    dispatch(setSubscriptionModel(true));
    // setModalShown(true);
  };
  return (
    <ul className="dropdown-menu dropdown-menu-end">
      <li>
        {(userRole === 'candidate' && currCandidate?.subscription.offering.isFeedBackLimit === true) ?
      <button
      onClick={handleGetDetails}
      // data-bs-toggle="modal"
      // data-bs-target="#feedbackModal"
      type="button"
      className="dropdown-item"
    >
      <Image src={view} alt="icon" className="lazy-img" /> Ask feedback
    </button>
      :  
        <button
          onClick={() => dispatch(setCurrJobApp(jobAppId))}
          data-bs-toggle="modal"
          data-bs-target="#feedbackModal"
          type="button"
          className="dropdown-item"
        >
          <Image src={view} alt="icon" className="lazy-img" /> Ask feedback
        </button>
      }
      </li>
      <li>
        <button
          onClick={() => dispatch(setCurrJobApp(jobAppId))}
          data-bs-toggle="modal"
          data-bs-target="#chatModal"
          type="button"
          className="dropdown-item"
        >
          <Image src={share} alt="icon" className="lazy-img" />
          Chat
        </button>
      </li>
      
      {/* <li>
        <button className="dropdown-item" type="button" onClick={handleDelete}>
          <Image src={delete_icon} alt="icon" className="lazy-img" /> Delete
        </button>
      </li> */}
    </ul>
  );
};

export default ActionDropdown;
