import CandidateDetailsArea from "@/app/components/candidate-details/candidate-details-area";
import CandidateProfileBreadcrumb from "@/app/components/candidate-details/profile-bredcrumb";
import JobPortalIntro from "@/app/components/job-portal-intro/job-portal-intro";
import FooterOne from "@/layouts/footers/footer-one";
import Header from "@/layouts/headers/header";
import Wrapper from "@/layouts/wrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Candidate Details",
};

const CandidateProfileDetailsPage = ({
  params,
}: {
  params: { id: string };
}) => {
  return (
    <Wrapper>
      <div className="main-page-wrapper">
        {/* header start */}
        <Header />

        {/* header end */}

        {/* breadcrumb start */}
        <CandidateProfileBreadcrumb
          title="Candidate Profile"
          subtitle="Candidate Profile"
        />
        {/* breadcrumb end */}

        {/* candidate details area start */}
        {<CandidateDetailsArea id={params.id} />}
        {/* candidate details area end */}

        {/* job portal intro start */}
        {/* <JobPortalIntro top_border={true} /> */}
        {/* job portal intro end */}

        {/* footer start */}
        <FooterOne  />
        {/* footer end */}
      </div>
    </Wrapper>
  );
};

export default CandidateProfileDetailsPage;
