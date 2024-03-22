"use client";
import React, { useEffect } from "react";
import BlogSidebar from "./sidebar";
import blog_data from "@/data/blog-data";
import BlogItem from "./blog-item";
import BlogPagination from "./blog-pagination";
import { getAllBlog } from "@/redux/features/admin/api";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import Pagination from "@/ui/pagination";
import { setPage } from "@/redux/features/admin/blogSlice";

const BlogPostboxArea = () => {
  const dispatch = useAppDispatch();
  const { blogs, page, totalBlogs, totalPages, blogsPerPage } = useAppSelector(
    (state) => state.blog
  );
  const handlePageClick = (event: { selected: number }) => {
    dispatch(setPage(event.selected + 1));
  };
  // const blog_items = blog_data
  //   .filter((b) => b.blog === "blog-postbox")
  //   .slice(0, 4);
  useEffect(() => {
    getAllBlog(dispatch, { page });
  }, [page]);
  return (
    <section className="blog-section pt-160 lg-pt-80 pb-120 lg-pb-80">
      <div className="container">
        <div className="row">
          <div className="col-xxl-11 m-auto">
            <div className="row">
              <div className="col-lg-8">
                {blogs.map((b) => (
                  <BlogItem key={b._id} blog={b} />
                ))}

                {/* <BlogPagination /> */}
              </div>

              <div className="col-lg-4">
                {/* sidebar start */}
                <BlogSidebar keywords={[]} />
                {/* sidebar  end */}
              </div>
            </div>
          </div>
        </div>
        {totalBlogs > blogsPerPage && (
          <Pagination
            pageCount={totalPages}
            handlePageClick={handlePageClick}
            currPage={page}
          />
        )}
      </div>
    </section>
  );
};

export default BlogPostboxArea;
