"use client";
import React, { useState } from "react";
import "react-phone-number-input/style.css";


import AutocompleteCategory from "@/ui/autoCompleteBlogCategory";
import { createBlog } from "@/redux/features/admin/api";
import Loader from "@/ui/loader";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import TextEditor from "./editor";

const AdminBlogArea = () => {
    const dispatch = useAppDispatch();
  const { currAdmin } = useAppSelector((state) => state.admin);
  const [category, setCategory] = useState<string[]>([]);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const { loading } = useAppSelector((state) => state.blog);
  const handleSubmit = async () => {
    // console.log(title, content, category);
    const bodyObj = {
      title,
      content,
      category,
      createdBy: {
        id: currAdmin?._id || "",
        name: currAdmin?.name || "",
      },
    };

    await createBlog(dispatch, bodyObj);
    setContent("");
    setTitle("");
    setCategory([]);
  };
  return (
    <div>
        <h2 className="main-title">Post a new blog</h2>
        <div className="bg-white card-box border-20">
          {/* <h4 className="dash-title-three">Job Details</h4> */}
          <div className="dash-input-wrapper mb-30">
            <label htmlFor="">Title*</label>
            <input
              type="text"
              placeholder="What is redis"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="dash-input-wrapper mb-30">
            <label htmlFor="">Category*</label>
            <AutocompleteCategory
              categories={category}
              setCategories={setCategory}
            />
            <div className="skill-input-data d-flex align-items-center flex-wrap">
              {category.map((value) => (
                <button key={value}>{value}</button>
              ))}
            </div>
          </div>
          <div className="dash-input-wrapper mb-30">
            <label htmlFor="">Blog Content*</label>
            <TextEditor content={content} setContent={setContent} />
          </div>
          <div className="button-group d-inline-flex align-items-center mt-30">
            <button
              disabled={loading}
              type={"submit"}
              onClick={handleSubmit}
              className="dash-btn-two tran3s me-3"
            >
              {loading ? <Loader /> : "Save"}
            </button>
            {/* <a href="#" className="dash-cancel-btn tran3s">
            Cancel
          </a> */}
          </div>
        </div>
    </div>
  )
}

export default AdminBlogArea