"use client";
import React from "react";
import { Metadata } from "next";
import Wrapper from "@/layouts/wrapper";
import Header from "@/layouts/headers/header";
import FooterOne from "@/layouts/footers/footer-one";
import JobPortalIntro from "../components/job-portal-intro/job-portal-intro";
import JobDetailsBreadcrumb from "../components/jobs/breadcrumb/job-details-breadcrumb";
import JobDetailsV1Area from "../components/job-details/job-details-v1-area";
// import job_data from "@/data/job-data";
import RelatedJobs from "../components/jobs/related-jobs";
import { useAppSelector } from "@/redux/hook";
import { usePathname } from "next/navigation";

// export const metadata: Metadata = {
//   title: "Job Details v1",
// };

const JobDetailsV1Page = () => {
  const { allJobPost } = useAppSelector((state) => state.jobPost);
  const job = allJobPost[0];
  const pathname = usePathname();
  return (
    <Wrapper>
      <div className="main-page-wrapper">
        {/* header start */}
        <Header />
        {/* header end */}

        {/* job details breadcrumb start */}
        <JobDetailsBreadcrumb />
        {/* job details breadcrumb end */}

        {/* job details area start */}
        <JobDetailsV1Area job={job} url={pathname} />
        {/* job details area end */}

        {/* related job start */}
        {/* <RelatedJobs category={[job.jobCategory]} /> */}
        {/* related job end */}

        {/* job portal intro start */}
        {/* <JobPortalIntro /> */}
        {/* job portal intro end */}

        {/* footer start */}
        <FooterOne />
        {/* footer end */}
      </div>
    </Wrapper>
  );
};

export default JobDetailsV1Page;
