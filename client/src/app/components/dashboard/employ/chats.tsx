import React from "react";
import DashboardHeader from "../candidate/dashboard-header";
import EmployJobItem from "./job-item";
import { IJobPost } from "@/types/jobPost-type";
import DeepMenus from "@/layouts/headers/component/deep-dash-nav";
import Messenger from "../candidate/chat/messanger";
import { useAppSelector } from "@/redux/hook";
import Conversation from "../candidate/chat/conversation";
// props type
type IProps = {
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};
const EmployChatArea = ({ setIsOpenSidebar }: IProps) => {
  const { chat, chatsByEmp } = useAppSelector((s) => s.jobApplication);
  return (
    <div className="dashboard-body">
      <div className="position-relative">
        {/* header start */}
        <DashboardHeader setIsOpenSidebar={setIsOpenSidebar} />
        {/* header end */}

        <div className="d-sm-flex align-items-center justify-content-between mb-40 lg-mb-30">
          <DeepMenus />
        </div>

        <div className="bg-white card-box border-20">
          <div className="chat-body">
            <div>
              <input
                placeholder="Search for friends"
                className="chatMenuInput"
              />
              {chatsByEmp?.map((c) => (
                <div>
                  <Conversation conversation={c} currentUser={""} />
                </div>
              ))}
            </div>
            {chat && (
              <div className="form-wrapper m-auto container-fluid ">
                <Messenger />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployChatArea;
