import view from "@/assets/dashboard/images/icon/icon_18.svg";
import share from "@/assets/dashboard/images/icon/icon_19.svg";
import delete_icon from "@/assets/dashboard/images/icon/icon_21.svg";
import { getAllCoupons, updateCoupon } from "@/redux/features/Coupons/api";
import { removeSavedCompany } from "@/redux/features/candidate/api";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import Image from "next/image";
import edit from "@/assets/dashboard/images/icon/icon_20.svg";
import Link from "next/link";
import { setCurrCouponEdit } from "@/redux/features/Coupons/couponSlice";

const ActionDropdown = ({ id }: { id: string }) => {
  const { savedCompanyPage } = useAppSelector(
    (state) => state.candidate.candidateDashboard
  );
  const { currUser } = useAppSelector((state) => state.persistedReducer.user);
  const { page } = useAppSelector((state) => state.coupon);
  const dispatch = useAppDispatch();
  const handleDelete = async  () => {
    await updateCoupon(dispatch,{_id:id,isValid:false})
    await getAllCoupons(dispatch,page);
  };
  const handleClick = () => {
    dispatch(setCurrCouponEdit(id));
  };
  return (
    <ul className="dropdown-menu dropdown-menu-end">
      {/* <li>
        <Link className="dropdown-item" href={`/company-details/${id}`}>
          <Image src={view} alt="icon" className="lazy-img" /> View
        </Link>
      </li> */}  
      <li>
        <button
          className="dropdown-item"
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#editCouponModal"
          onClick={handleClick}
        >
          <Image src={edit} alt="icon" className="lazy-img" /> Edit
        </button>
      </li>    
      <li>
        <button className="dropdown-item" type="button" onClick={handleDelete}>
          <Image src={delete_icon} alt="icon" className="lazy-img" /> Terminate
        </button>
      </li>
    </ul>
  );
};

export default ActionDropdown;
