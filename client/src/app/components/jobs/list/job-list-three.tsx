"use client";
import { setSalary } from "@/redux/features/filterJobPostSlice";
import { getJObPosts } from "@/redux/features/jobPost/api";
import { setPage } from "@/redux/features/jobPost/slice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import Pagination from "@/ui/pagination";
import { useEffect, useState } from "react";
import FilterArea from "../filter/filter-area";
import JobGridItem from "../grid/job-grid-item";
import ListItemTwo from "./list-item-2";
import Loader from "@/ui/loader";
import { useSearchParams } from "next/navigation";

const JobListThree = ({
  itemsPerPage,
  grid_style = false,
}: {
  itemsPerPage: number;
  grid_style?: boolean;
}) => {
  const filterState = useAppSelector((state) => state.filter);
  const searchParams = useSearchParams();
  const {
    location,
    jobCategory,
    jobType,
    salary,
    preferredExperience,
    workMode,
  } = filterState;
  const { allJobPost, totalJobPost, totalNumOfPage, loading, page } =
    useAppSelector((state) => state.jobPost);
  const { currUser } = useAppSelector((s) => s.persistedReducer.user);
  const dispatch = useAppDispatch();

  const [jobTypeTemp, setJobTypeTemp] = useState(grid_style ? "grid" : "list");
  const [priceValue, setPriceValue] = useState([5]);
  const handleSalary = (values: number[]) => {
    dispatch(setSalary(values[0]));
    console.log(values);
  };

  useEffect(() => {
    getJObPosts(
      dispatch,
      { ...filterState, jobCode: searchParams.get("jobCode") || "" },
      page,
      currUser ? currUser : ""
    );
  }, [
    location,
    jobCategory,
    jobType,
    workMode,
    salary,
    searchParams.get("jobCode"),
    preferredExperience,
    page,
  ]);

  // Usage

  const handlePageClick = (event: { selected: number }) => {
    console.log("from pagination", event.selected);
    dispatch(setPage(event.selected + 1));
  };

  return (
    <>
      <section
        id="find-jobs"
        className="job-listing-three pt-160 lg-pt-140 pb-160 xl-pb-150 lg-pb-80"
      >
        <div className="container">
          <div className="row">
            <div className="col-xl-3 col-lg-4">
              <button
                type="button"
                className="filter-btn w-100 pt-2 pb-2 h-auto fw-500 tran3s d-lg-none mb-40"
                data-bs-toggle="offcanvas"
                data-bs-target="#filteroffcanvas"
              >
                <i className="bi bi-funnel"></i>
                Filter
              </button>
              {/* filter area start */}
              <FilterArea
                priceValue={priceValue}
                setPriceValue={setPriceValue}
                maxPrice={100000}
                setFinalPrice={handleSalary}
              />
              {/* filter area end */}
            </div>

            <div className="col-xl-9 col-lg-8">
              {!loading ? (
                <div className="job-post-item-wrapper ms-xxl-5 ms-xl-3">
                  <div className="upper-filter d-flex justify-content-between align-items-center mb-20">
                    <div className="total-job-found">
                      Total <span className="text-dark">{totalJobPost}</span>{" "}
                      {totalJobPost > 1 ? " jobs " : " job "}
                      found
                    </div>
                    <div className="d-flex align-items-center">
                      {/* <div className="short-filter d-flex align-items-center">
                    <div className="text-dark fw-500 me-2">Short:</div>
                    <NiceSelect
                      options={[
                        { value: "", label: "Price Short" },
                        { value: "price-low-to-high", label: "low to high" },
                        { value: "price-high-to-low", label: "High to low" },
                      ]}
                      defaultCurrent={0}
                      onChange={(item) => handleShort(item)}
                      name="Price Short"
                    />
                  </div> */}
                      <button
                        onClick={() => setJobTypeTemp("list")}
                        className={`style-changer-btn text-center rounded-circle tran3s ms-2 list-btn 
                    ${jobTypeTemp === "grid" ? "active" : ""}`}
                        title="Active List"
                      >
                        <i className="bi bi-list"></i>
                      </button>
                      <button
                        onClick={() => setJobTypeTemp("grid")}
                        className={`style-changer-btn text-center rounded-circle tran3s ms-2 grid-btn 
                    ${jobTypeTemp === "list" ? "active" : ""}`}
                        title="Active Grid"
                      >
                        <i className="bi bi-grid"></i>
                      </button>
                    </div>
                  </div>
                  <div
                    className={`accordion-box list-style ${
                      jobTypeTemp === "list" ? "show" : ""
                    }`}
                  >
                    {allJobPost &&
                      allJobPost.map((job) => (
                        <ListItemTwo key={job._id} item={job} />
                      ))}
                  </div>

                  <div
                    className={`accordion-box grid-style ${
                      jobTypeTemp === "grid" ? "show" : ""
                    }`}
                  >
                    <div className="row">
                      {allJobPost &&
                        allJobPost.map((job) => (
                          <div key={job._id} className="col-sm-6 mb-30">
                            <JobGridItem item={job} />
                          </div>
                        ))}
                    </div>
                  </div>

                  {allJobPost && (
                    <div className="pt-30 lg-pt-20 d-sm-flex align-items-center justify-content-between">
                      <p className="m0 order-sm-last text-center text-sm-start xs-pb-20">
                        Showing{" "}
                        <span className="text-dark fw-500">
                          {totalJobPost > 0 ? (page - 1) * itemsPerPage + 1 : 0}
                        </span>{" "}
                        to{" "}
                        <span className="text-dark fw-500">
                          {Math.min(page * itemsPerPage, totalJobPost)}
                        </span>{" "}
                        of{" "}
                        <span className="text-dark fw-500">{totalJobPost}</span>
                      </p>

                      {totalJobPost > itemsPerPage && (
                        <Pagination
                          pageCount={totalNumOfPage}
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
    </>
  );
};

export default JobListThree;
