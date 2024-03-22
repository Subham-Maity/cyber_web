import view from "@/assets/dashboard/images/icon/icon_18.svg";
import share from "@/assets/dashboard/images/icon/icon_19.svg";
import delete_icon from "@/assets/dashboard/images/icon/icon_21.svg";
import { removeSavedCompany } from "@/redux/features/candidate/api";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import Image from "next/image";
import Link from "next/link";

const ActionDropdown = ({ id }: { id: string }) => {
  const { savedCompanyPage } = useAppSelector(
    (state) => state.candidate.candidateDashboard
  );
  const { currUser } = useAppSelector((state) => state.persistedReducer.user);
  const dispatch = useAppDispatch();
  const handleDelete = () => {
    removeSavedCompany(dispatch, {
      companyId: id,
      candidateId: currUser,
      page: savedCompanyPage,
    });
  };
  return (
    <ul className="dropdown-menu dropdown-menu-end">
      {/* <li>
        <Link className="dropdown-item" href={`/company-details/${id}`}>
          <Image src={view} alt="icon" className="lazy-img" /> View
        </Link>
      </li> */}      
      <li>
        <button className="dropdown-item" type="button" onClick={handleDelete}>
          <Image src={delete_icon} alt="icon" className="lazy-img" /> Remove
        </button>
      </li>
    </ul>
  );
};

export default ActionDropdown;
