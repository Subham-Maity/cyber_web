"use client";
import React, { useRef } from "react";
import job_data from "@/data/job-data";
import Slider from "react-slick";
import JobGridItem from "./grid/job-grid-item";
import RelatedGridItem from "./grid/related-grid";
import { IJobPost } from "@/types/jobPost-type";

const RelatedJobs = ({ jobs }: { jobs: IJobPost[] }) => {
  const numRelatedJobs = jobs.length;
  const isSingleJob = numRelatedJobs < 2;
  // slider setting
  const slider_setting = {
    dots: false,
    arrows: false,
    centerPadding: "0px",
    slidesToShow: numRelatedJobs > 2 ? 3 : numRelatedJobs,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: numRelatedJobs > 1 ? 2 : 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const sliderRef = useRef<Slider | null>(null);
  // console.log(jobs)
  const sliderPrev = () => {
    sliderRef.current?.slickPrev();
  };

  const sliderNext = () => {
    sliderRef.current?.slickNext();
  };

  // console.log(jobs);
  return (
    <section className="related-job-section pt-90 lg-pt-70 pb-120 lg-pb-70">
      <div className="container">
        <div className="position-relative">
          <div className="title-three text-center text-md-start mb-55 lg-mb-40">
            <h2 className="main-font">Related Jobs</h2>
          </div>

          <Slider
            {...slider_setting}
            ref={sliderRef}
            className="related-job-slider"
          >
            {jobs.map((j, index) => {
              console.log(index);
              return (
                <div key={j._id} className="item d-flex justify-content-center">
                  {isSingleJob ? (
                    <div
                      className="d-flex justify-content-center "
                      style={{ width: "35%" }}
                    >
                      <RelatedGridItem item={j} />
                    </div>
                  ) : (
                    <RelatedGridItem item={j} />
                  )}
                </div>
              );
            })}
          </Slider>

          <ul className="slider-arrows slick-arrow-one color-two d-flex justify-content-center style-none sm-mt-20">
            <li onClick={sliderPrev} className="prev_e slick-arrow">
              <i className="bi bi-arrow-left"></i>
            </li>
            <li onClick={sliderNext} className="next_e slick-arrow">
              <i className="bi bi-arrow-right"></i>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default RelatedJobs;
