"use client";
import JobDetailsV1Area from "@/app/components/job-details/job-details-v1-area";
import JobPortalIntro from "@/app/components/job-portal-intro/job-portal-intro";
import JobDetailsBreadcrumb from "@/app/components/jobs/breadcrumb/job-details-breadcrumb";
import RelatedJobs from "@/app/components/jobs/related-jobs";
import FooterOne from "@/layouts/footers/footer-one";
import Header from "@/layouts/headers/header";
import Wrapper from "@/layouts/wrapper";
import { getAllJobAppByCandidate } from "@/redux/features/jobApp/api";
import {
  getJobPostDetails,
  getJobPostDetailsForEmployer,
  getRelatedJobs,
} from "@/redux/features/jobPost/api";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const JobDetailsDynamicPage = ({ params }: { params: { id: string } }) => {
  const dispatch = useAppDispatch();
  const { jobPost, relatedJobs } = useAppSelector((state) => state.jobPost);
  const { currUser } = useAppSelector((state) => state.persistedReducer.user);
  const {currCandidate} = useAppSelector((state) => state.candidate.candidateDashboard)
  const {currEmployer} = useAppSelector((state) => state.employer)

  const pathName = usePathname();
  useEffect(() => {
    if (!currCandidate) getJobPostDetailsForEmployer(dispatch, params.id)
    else{
      getJobPostDetails(dispatch,params.id)
    }
    getRelatedJobs(dispatch, params.id);

    if (currUser) getAllJobAppByCandidate(dispatch, currUser);
  }, [params.id]);

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

        {jobPost && typeof jobPost.companyId !== "string" && (
          <JobDetailsV1Area
            job={jobPost}
            url={pathName}
            company={jobPost.companyId}
          />
        )}
        {/* job details area end */}

        {/* related job start */}
        {relatedJobs.length > 0 && <RelatedJobs jobs={relatedJobs} />}
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

export default JobDetailsDynamicPage;
