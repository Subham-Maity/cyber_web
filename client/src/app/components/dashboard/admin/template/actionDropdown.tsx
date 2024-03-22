import React, { useEffect, useState } from "react";
import Image from "next/image";
import view from "@/assets/dashboard/images/icon/icon_18.svg";
import share from "@/assets/dashboard/images/icon/icon_19.svg";
import edit from "@/assets/dashboard/images/icon/icon_20.svg";
import delete_icon from "@/assets/dashboard/images/icon/icon_21.svg";
import Link from "next/link";
import {
  getTemplates,
  updateBeingUsedFor,
} from "@/redux/features/emailTemplate/api";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { EmailTemplate } from "@/redux/features/emailTemplate/slice";

const ActionDropdown = ({Template}:{Template:any}) => {
  //   const { savedJobsPage, loading } = useAppSelector(
  //     (state) => state.candidate.candidateDashboard
  //   );
  // console.log(Template)
  const { page } = useAppSelector((state) => state.emailTemplate);
  //   const { currUser } = useAppSelector((state) => state.persistedReducer.user);
  const dispatch = useAppDispatch();
  //   const handleDelete = () => {
  //     removeSavedJob(dispatch, {
  //       jobPostId: id,
  //       candidateId: currUser,
  //       page: savedJobsPage,
  //     });
  // const [templateId, setTemplateId] = useState(Template._id)
  //   };
  // useEffect(() => {
  //   setTemplateId(Template._id)
  // },[Template])
  const handleBeingUsedFor = async (item: string, TemplateId: string) => {
    // setBeingUsedFor(item.value);
    // console.log(templateId);
    await updateBeingUsedFor(dispatch, Template._id, item);
    await getTemplates(dispatch, {
      page: page,
      limit: 8,
      templateType: Template.templateType,
    });
  };

  return (
    <ul className="dropdown-menu dropdown-menu-end">
      <li>
        <button
          className="dropdown-item"
          onClick={() => handleBeingUsedFor("signup", Template._id)}
        >
          <Image src={view} alt="icon" className="lazy-img" /> Signup
        </button>
      </li>
      {/* <li>
        <a className="dropdown-item" href="#">
          <Image src={share} alt="icon" className="lazy-img" /> Chat
        </a>
      </li> */}
      <li>
        <button
          className="dropdown-item"
          onClick={() => handleBeingUsedFor("login", Template._id)}
        >
          <Image src={view} alt="icon" className="lazy-img" /> Login
        </button>
      </li>
      <li>
        <button
          className="dropdown-item"
          onClick={() => handleBeingUsedFor("paymentSuccess", Template._id)}
        >
          <Image src={view} alt="icon" className="lazy-img" /> Payment Success
        </button>
      </li>
    </ul>
  );
};

export default ActionDropdown;
