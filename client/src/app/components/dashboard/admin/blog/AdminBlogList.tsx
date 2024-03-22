import SearchItems from '@/app/components/search-area/search-items';
import { getAllBlog } from '@/redux/features/admin/api';
import { setPage } from '@/redux/features/admin/blogSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook'
import Loader from '@/ui/loader';
import Pagination from '@/ui/pagination';
import React, { useEffect } from 'react'
import AdminBlogListItem from './AdminBlogListItem';

const AdminBlogList = () => {
    const dispatch = useAppDispatch();
    const {blogs,page,totalBlogs,totalPages,loading} = useAppSelector((state) => state.blog);
    const {currUser} = useAppSelector((state)=> state.persistedReducer.user);
    useEffect(() => {
        getAllBlog(dispatch,{page})
    }, [page, currUser]);
    const handlePageClick = (event: { selected: number }) => {
        dispatch(setPage(event.selected + 1));
      };
  return (
    <section className="candidates-profile pb-160 xl-pb-150 lg-pb-80">
      <div className="container">
        <div className="row">
          {/* <div className="col-xl-3 col-lg-4">
            <button
              type="button"
              className="filter-btn w-100 pt-2 pb-2 h-auto fw-500 tran3s d-lg-none mb-40"
              data-bs-toggle="offcanvas"
              data-bs-target="#filteroffcanvas"
            >
              <i className="bi bi-funnel"></i>
              Filter
            </button>
            
            <CandidateV1FilterArea />
            
          </div> */}

          <div className=" w-100 ">
            {!loading ? (
              <div className="">
                <div className="upper-filter d-flex justify-content-between align-items-center mb-20">
                  <div className="total-job-found">
                    All <span className="text-dark fw-500">{totalBlogs}</span>{" "}
                    blogs found
                  </div>
                </div>

                <div
                  className={`accordion-box list-style ${
                    "list" === "list" ? "show" : ""
                  }`}
                >
                  {blogs?.length === 0 && (
                    <p
                      style={{
                        fontWeight: "bold",
                        textAlign: "center",
                        fontSize: "1.5em",
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "#888",
                      }}
                    >
                      No blogs yet!
                    </p>
                  )}
                  {blogs?.map((item:any) => (
                    // <CompanyListItem key={item._id} item={item} />
                    <AdminBlogListItem key={item._id} item={item}/>
                    // <p>Hello</p>
                  ))}
                </div>

                {blogs && (
                  <div className="pt-30 lg-pt-20 d-sm-flex align-items-center justify-content-between">
                    <p className="m0 order-sm-last text-center text-sm-start xs-pb-20">
                      Showing{" "}
                      <span className="text-dark fw-500">
                        {(page - 1) * 8 + 1}
                      </span>{" "}
                      to{" "}
                      <span className="text-dark fw-500">
                        {Math.min(page * 8, totalBlogs)}
                      </span>{" "}
                      of{" "}
                      <span className="text-dark fw-500">{totalBlogs}</span>
                    </p>

                    {totalBlogs > 8 && (
                      <Pagination
                        pageCount={totalPages}
                        handlePageClick={handlePageClick}
                        currPage={page}
                      />
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="total-job-found ">
                <div style={{ marginTop: "100px" }}>
                  <Loader />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AdminBlogList