import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { addComment } from "@/redux/features/admin/api";
import { notifyError, notifyInfo } from "@/utils/toast";
import Loader from "@/ui/loader";
import LoginModal from "../common/popup/login-modal";

const BlogCommentForm = ({ blogId }: { blogId: string }) => {
  const dispatch = useAppDispatch();
  const { blog, loading } = useAppSelector((state) => state.blog);
  const { currAdmin } = useAppSelector((state) => state.admin);
  const [text, setText] = useState("");
  const {isAuthenticated,currUser} = useAppSelector((state) => state.persistedReducer.user)
  const {currEmployer} = useAppSelector((state) => state.employer)
  const {currCandidate} = useAppSelector((state) => state.candidate.candidateDashboard)
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!isAuthenticated) {
      // Show login modal
      handleSubscribePopup();
      return;
    }
    if (!blog) {
      notifyError("blog not found");
    }
    const bodyObj = {
      userId: currUser,
      userAvatar: currAdmin?.avatar || currEmployer?.avatar || currCandidate?.avatar,
      userName: currAdmin?.name || currEmployer?.firstName || currCandidate?.firstName,
      text: text,
    };
    await addComment(dispatch, blogId, bodyObj);
    setText("");
  };
  const handleSubscribePopup = () => {};
  return (
    <>
    <form onSubmit={handleSubmit} className="mt-30">
      
      <div className="input-wrapper mb-30">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Your Comment"
          ></textarea>
      </div>
          
      {isAuthenticated ? (
      <button
        type="submit"
        className="btn-ten fw-500 text-white text-center pe-5 ps-5 tran3s"
      >
        {loading ? <Loader /> : "Post Comment"}
      </button>
       ):(
      <button
      data-bs-toggle="modal"
      data-bs-target="#loginModal"
      type="button"
      //  className="apply-btn text-center tran3s"
      onClick={handleSubscribePopup}
      >
        <button
        className="btn-ten fw-500 text-white text-center pe-5 ps-5 tran3s"
      >
        {loading ? <Loader /> : "Post Comment"}
      </button>
      </button>
      )}
      </form>
    <LoginModal />
    </>
  );
};

export default BlogCommentForm;
