"use client";
import { getJObPostsByCompanyId } from "@/redux/features/jobPost/api";
import { setPageForCompany } from "@/redux/features/jobPost/slice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import Pagination from "@/ui/pagination";
import { useEffect } from "react";
import ListItemTwo from "../jobs/list/list-item-2";

const OpenPosition = ({ companyId }: { companyId: string }) => {
  const itemsPerPage = 8;
  const dispatch = useAppDispatch();

  const { allJobPost, totalJobPost, totalNumOfPage, loading, pageForCompany } =
    useAppSelector((state) => state.jobPost);
  const { currUser } = useAppSelector((s) => s.persistedReducer.user);

  useEffect(() => {
    if (currUser)
      getJObPostsByCompanyId(
        dispatch,
        { companyId, status: "active" },
        pageForCompany,
        currUser
      );
  }, [pageForCompany]);

  const handlePageClick = (event: { selected: number }) => {
    // console.log("from pagination", event.selected);
    dispatch(setPageForCompany(event.selected + 1));
  };
  return (
    <>
    {totalJobPost>0 && (
    <section
      id="open-job"
      className="company-open-position pt-80 lg-pt-60 pb-100 lg-pb-60"
    >
      <div className="container">
        <div className="row justify-content-between align-items-center">
          <div className="col-lg-6">
            <div className="title-two">
              <h2>{totalJobPost} Open Positions</h2>
            </div>
          </div>
          <div className="col-lg-5">
            {/* <div className="d-flex justify-content-lg-end">
              <a href="#" className="btn-six">
                Explore More
              </a>
            </div> */}
          </div>
        </div>
        <div className="mt-50">
          {allJobPost?.map((item) => (
            <ListItemTwo key={item._id} item={item} />
          ))}
        </div>
        <div>
          {totalJobPost > itemsPerPage && (
            <Pagination
              pageCount={totalNumOfPage}
              handlePageClick={handlePageClick}
              currPage={pageForCompany}
            />
          )}
        </div>
      </div>
    </section>
    )}
    </>
  );
};

export default OpenPosition;
