import React from "react";
import Image from "next/image";
import edit from "@/assets/dashboard/images/icon/icon_20.svg";
import delete_icon from "@/assets/dashboard/images/icon/icon_21.svg";
import Link from "next/link";
import { removeSavedJob } from "@/redux/features/candidate/api";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setCompanyBeingEdited } from "@/redux/features/company/slice";
import { setEditBlog } from "@/redux/features/admin/blogSlice";
import { deleteBlog, getAllBlog } from "@/redux/features/admin/api";
import { notifySuccess } from "@/utils/toast";

const ActionDropdown = ({ id }: { id: string }) => {
  const {page} = useAppSelector((state) => state.blog);
  
  const dispatch = useAppDispatch();

  const handleDelete = async () => {
    await deleteBlog(dispatch,id);
    notifySuccess("Blog Deleted Successfully")
    // removeSavedJob(dispatch, {
    //   companyId: id, // Change jobPostId to companyId
    //   candidateId: currUser,
    //   page: savedJobsPage,
    // });
    await getAllBlog(dispatch, { page });
  };
  const handleClick = () => {
    dispatch(setEditBlog(id));
  }

  return (
    <ul className="dropdown-menu dropdown-menu-end">
      <li>
      <button className="dropdown-item" type="button" data-bs-toggle="modal"
        data-bs-target="#editBlogModal" onClick={handleClick}>
          <Image src={edit} alt="icon" className="lazy-img" /> Edit
        </button>
      </li>
      <li>
        <button className="dropdown-item" type="button" onClick={handleDelete}>
          <Image src={delete_icon} alt="icon" className="lazy-img" /> Delete
        </button>
      </li>
    </ul>
  );
};
{/* <ul className="dropdown-menu dropdown-menu-end">
      <li>
        <Link className="dropdown-item" href={`/job-details-v1/${id}`}>
          <Image src={view} alt="icon" className="lazy-img" /> View
        </Link>
      </li>
      <Link className="dropdown-item" href="#">
        <Image src={share} alt="icon" className="lazy-img" /> Share
      </Link>
      <li>
        <button className="dropdown-item" type="button" data-bs-toggle="modal"
        data-bs-target="#editJobPostByEmployer" onClick={handleClick}>
          <Image src={edit} alt="icon" className="lazy-img" /> Edit
        </button>
      </li>
    </ul> */}
export default ActionDropdown;
