import React, { ChangeEventHandler, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import blog_data from "@/data/blog-data";
import { setSearchTerm } from "@/redux/features/admin/blogSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { searchBlog } from "@/redux/features/admin/api";
import { getDate } from "@/utils/helper";

const BlogSidebar = ({ keywords }: { keywords: string[] }) => {
  const recent_blogs = blog_data.slice(-3);
  const { searchTerm, searchedBlogs, recentBlogs } = useAppSelector(
    (state) => state.blog
  );
  const dispatch = useAppDispatch();
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimeout(() => {
      // console.log(e.target.value);
      dispatch(setSearchTerm(e.target.value));
    }, 600);
  };
  useEffect(() => {
    // if(searchTerm !== "")
    searchBlog(dispatch, { searchTerm });
    console.log(searchTerm);
  }, [searchTerm]);

  return (
    <div className="blog-sidebar ps-xl-4 md-mt-60">
      <form action="#" className="search-form position-relative mb-50 lg-mb-40">
        <input type="text" placeholder="Search..." onChange={handleSearch} />
        <button>
          <i className="bi bi-search"></i>
        </button>
      </form>

      <div className="category-list mb-60 lg-mb-40">
        {/* <h3 className="sidebar-title">Category</h3> */}
        <ul className="style-none">
          {searchedBlogs.map((b) => (
            <li>
              <Link href={`/blog-details/${b._id}`}>{b.title}</Link>
            </li>
            // <p>{b.title}</p>
          ))}
        </ul>
      </div>
      {/* <div className="category-list mb-60 lg-mb-40">
        <h3 className="sidebar-title">Category</h3>
        <ul className="style-none">
          <li>
            <a href="#">Education (3)</a>
          </li>
          <li>
            <a href="#">Information (4)</a>
          </li>
          <li>
            <a href="#">Interview (2)</a>
          </li>
          <li>
            <a href="#">Speaking (8)</a>
          </li>
          <li>
            <a href="#">Skill (5)</a>
          </li>
          <li>
            <a href="#">Developer (3)</a>
          </li>
          <li>
            <a href="#">Account (7)</a>
          </li>
        </ul>
      </div> */}
      <div className="sidebar-recent-news mb-60 lg-mb-40">
        <h4 className="sidebar-title">Recent News</h4>
        {recentBlogs.map((b, i) => (
          <div
            key={i}
            className={`news-block d-flex align-items-center pt-20 pb-20 border-top ${
              i === recent_blogs.length - 1 ? "border-bottom" : ""
            }`}
          >
            {/* <div>
              <Image src="" alt="image" className="lazy-img" />
            </div> */}
            <div className="post ps-4">
              <h4 className="mb-5">
                <Link href={`/blog-details/${b._id}`} className="title tran3s">
                  {b.title}
                </Link>
              </h4>
              <div className="date">{getDate(b.createdAt.toString())}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="sidebar-keyword">
        {keywords.length > 0 && (
          <>
            <h4 className="sidebar-title">Keywords</h4>
            <ul className="style-none d-flex flex-wrap">
              {keywords?.map((k, i) => (
                <li>
                  <a href="#">{k}</a>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default BlogSidebar;
