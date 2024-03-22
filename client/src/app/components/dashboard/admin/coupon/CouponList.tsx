import SearchItems from "@/app/components/search-area/search-items";
import { getAllCoupons } from "@/redux/features/Coupons/api";
import { setPage } from "@/redux/features/Coupons/couponSlice";
// import { getAllBlog } from '@/redux/features/admin/api';
// import { setPage } from '@/redux/features/admin/blogSlice';
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import Loader from "@/ui/loader";
import Pagination from "@/ui/pagination";
import React, { useEffect } from "react";
// import couponGridItem from "./couponGridItem"
import CouponGridItem from "./couponGridItem";
import EditCouponArea from "./EditExistingCoupon";
// import AdminBlogListItem from './AdminBlogListItem';

const AdminCouponList = () => {
  const dispatch = useAppDispatch();
  const { coupons, page, totalCoupons, totalPages, loading } = useAppSelector(
    (state) => state.coupon
  );
  const { currUser } = useAppSelector((state) => state.persistedReducer.user);
  useEffect(() => {
    getAllCoupons(dispatch, page);
  }, [page, currUser]);
  const handlePageClick = (event: { selected: number }) => {
    dispatch(setPage(event.selected + 1));
  };
  return (
    <section className="job-listing-three pb-160 xl-pb-150 lg-pb-80">
      <div className="container">
        <div className="">
          <div className="job-post-item-wrapper ms-xxl-5 ms-xl-3">
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
                      All{" "}
                      <span className="text-dark fw-500">{totalCoupons}</span>{" "}
                      coupons found
                    </div>
                  </div>

                  <div
                    className={`accordion-box list-style ${
                      "list" === "list" ? "show" : ""
                    }`}
                  >
                    {coupons?.length === 0 && (
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
                        No coupons yet!
                      </p>
                    )}
                    <div
                      className={`accordion-box grid-style 
                      show 
                    }`}
                    >
                      <div className="row">
                        {coupons?.map((item: any) => (
                          // <CompanyListItem key={item._id} item={item} />
                          <div key={item._id} className="col-sm-4 mb-30">
                            <CouponGridItem key={item._id} item={item} />
                          </div>
                          // <p>Hello</p>
                        ))}
                      </div>
                    </div>
                  </div>

                  {coupons && (
                    <div className="pt-30 lg-pt-20 d-sm-flex align-items-center justify-content-between">
                      <p className="m0 order-sm-last text-center text-sm-start xs-pb-20">
                        Showing{" "}
                        <span className="text-dark fw-500">
                          {(page - 1) * 8 + 1}
                        </span>{" "}
                        to{" "}
                        <span className="text-dark fw-500">
                          {Math.min(page * 8, totalCoupons)}
                        </span>{" "}
                        of{" "}
                        <span className="text-dark fw-500">{totalCoupons}</span>
                      </p>

                      {totalCoupons > 8 && (
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
        <EditCouponArea />
      </div>
    </section>
  );
};

export default AdminCouponList;
