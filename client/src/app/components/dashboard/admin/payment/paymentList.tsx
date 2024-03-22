"use client"
import PaymentGridItem from "@/app/components/dashboard/admin/payment/paymentGridItem";
import SearchItems from "@/app/components/search-area/search-items";
import { getAllCoupons } from "@/redux/features/Coupons/api";
import {  setPage, setProductModel } from "@/redux/features/payments/Slice";
// import { setPage } from "@/redux/features/Coupons/couponSlice";
import { getAllPayments } from "@/redux/features/payments/api";
// import { getAllBlog } from '@/redux/features/admin/api';
// import { setPage } from '@/redux/features/admin/blogSlice';
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import Loader from "@/ui/loader";
import Pagination from "@/ui/pagination";
import React, { useEffect, useState } from "react";
// import couponGridItem from "./couponGridItem"
// import CouponGridItem from "./couponGridItem";
// import EditCouponArea from "./EditExistingCoupon";
// import AdminBlogListItem from './AdminBlogListItem';

const AdminPaymentList = () => {
  const dispatch = useAppDispatch();
  const { payments, page, loading, totalPages, totalPayments, productModel } = useAppSelector(
    (state) => state.payment
  ); 
  const { currUser } = useAppSelector((state) => state.persistedReducer.user); 
  useEffect(() => {
    getAllPayments(dispatch, page ,productModel);
  }, [page, currUser,productModel]);
  const handlePageClick = (event: { selected: number }) => {
    dispatch(setPage(event.selected + 1));
  };
  const [isCandidate, setIsCandidate] = useState(true);
  const handleToggle = (title:string) => {
    dispatch(setPage(1));
    dispatch(setProductModel(title));
    setIsCandidate((prev) =>!prev);
  };
//   console.log(payments)
  return (
    <>
    <div className="d-flex align-items-center justify-content-between mb-40 lg-mb-30">
          <div className="subscription-tab align-content-center py-2  d-flex gap-3 px-2">
            <p
              onClick={() => handleToggle("CandidateSub")}
              className={`p-1 px-2 ${isCandidate && "active"}`}
            >
              Candidate
            </p>
            <p
              onClick={() => handleToggle("EmployerSub")}
              className={`p-1 px-2 ${!isCandidate && "active"}`}
            >
              Employer
            </p>
          </div>
        </div>
        
    <section className="job-listing-three  pb-160 xl-pb-150 lg-pb-80">
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
                      <span className="text-dark fw-500">{totalPayments}</span>{" "}
                      payments found
                    </div>
                  </div>

                  <div
                    className={`accordion-box list-style ${
                      "list" === "list" ? "show" : ""
                    }`}
                  >
                    {payments?.length === 0 && (
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
                        No Payments yet!
                      </p>
                    )}
                    <div
                      className={`accordion-box grid-style 
                      show 
                    }`}
                    >
                      <div className="row">
                      {payments
                          ?.filter((item: any) => {
                            if (isCandidate) {
                              
                              return item.userModel === "Candidate";
                            } else {
                              return item.userModel === "Employer";
                            }
                          })
                          .map((item: any) => (
                            <div key={item._id} className="col-sm-6 mb-30">
                              <PaymentGridItem key={item._id} item={item} />
                            </div>
                          ))}
                        {/* {payments?.map((item: any) => (
                          // <CompanyListItem key={item._id} item={item} />
                          <div key={item._id} className="col-sm-6 mb-30">
                            {/* <CouponGridItem key={item._id} item={item} /> *
                            <PaymentGridItem key={item._id} item={item}/>
                          </div>
                          // <p>Hello</p>
                        ))} */}
                      </div>
                    </div>
                  </div>

                  {payments && (
                    <div className="pt-30 lg-pt-20 d-sm-flex align-items-center justify-content-between">
                      <p className="m0 order-sm-last text-center text-sm-start xs-pb-20">
                        Showing{" "}
                        <span className="text-dark fw-500">
                          {(page - 1) * 8 + 1}
                        </span>{" "}
                        to{" "}
                        <span className="text-dark fw-500">
                          {Math.min(page * 8, totalPayments)}
                        </span>{" "}
                        of{" "}
                        <span className="text-dark fw-500">{totalPayments}</span>
                      </p>

                      {totalPayments > 8 && (
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
        {/* <EditCouponArea /> */}
      </div>
    </section>
    </>
  );
};

export default AdminPaymentList;
