import { useAppDispatch, useAppSelector } from "@/redux/hook";
import React, { useEffect, useState } from "react";
import TextEditor from "./editor";
import Loader from "@/ui/loader";
import AutocompleteCategory from "@/ui/autoCompleteBlogCategory";
import { IBlogPost } from "@/types/for-admin-type";
import { getAllBlog, updateBlog } from "@/redux/features/admin/api";
import { notifyInfo, notifySuccess } from "@/utils/toast";

const AdminBlogEditModal = () => {
  const dispatch = useAppDispatch();
  const { currAdmin } = useAppSelector((state) => state.admin);

  const [category, setCategory] = useState<string[]>([]);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const { blogBeingEdited, blogs, page, totalBlogs, totalPages, loading } =
    useAppSelector((state) => state.blog);
  const [currBlog, setCurrBlog] = useState<IBlogPost | null>(null);
  useEffect(() => {
    const editBlog = blogs.find((blog) => blog._id === blogBeingEdited);
    setCurrBlog(editBlog!);
  }, [blogBeingEdited]);

  useEffect(() => {
    setCategory(currBlog?.category || []);
    setTitle(currBlog?.title || "");
    setContent(currBlog?.content || "");
  }, [currBlog]);

  const handleSubmit = async () => {
    // console.log(title, content, category);
    if(title==="" || content===""){
      notifyInfo("Enter a valid title or content")
      return;
    }
    const bodyObj = {
      title,
      content,
      category,
    };

    // await createBlog(dispatch, bodyObj);
    await updateBlog(dispatch, currBlog?._id as string, bodyObj);
    notifySuccess("Blog edited successfully")
    // setContent("");
    // setTitle("");
    // setCategory([]);
    await getAllBlog(dispatch, { page });
  };
  return (
    <div
      className="modal popUpModal fade"
      id="editBlogModal"
      tabIndex={-1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-fullscreen modal-dialog-centered">
        <div className="container">
          <div className="filter-area-tab modal-content">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
            <div className="bg-white card-box border-20">
              <h2 className="main-title">Update Blog</h2>
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
                  {!title && !content ? 
                  <button
                  disabled={loading}
                  type={"submit"}
                  onClick={handleSubmit}
                  className="dash-btn-two tran3s me-3"
                  // data-bs-dismiss="modal"
                  // aria-label="Close"
                  >
                    {loading ? <Loader /> : "Save"}
                  </button>
                  : 
                  <button
                  disabled={loading}
                  type={"submit"}
                  onClick={handleSubmit}
                  className="dash-btn-two tran3s me-3"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  >
                    {loading ? <Loader /> : "Save"}
                  </button>
                  }
                  {/* <a href="#" className="dash-cancel-btn tran3s">
            Cancel
          </a> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminBlogEditModal;
