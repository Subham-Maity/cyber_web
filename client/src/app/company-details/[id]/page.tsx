"use client";
import CompanyBreadcrumb from "@/app/components/common/common-breadcrumb";
import CompanyDetailsArea from "@/app/components/company-details/company-details-area";
import OpenPosition from "@/app/components/company-details/open-position";
import JobPortalIntro from "@/app/components/job-portal-intro/job-portal-intro";
import FooterOne from "@/layouts/footers/footer-one";
import Header from "@/layouts/headers/header";
import Wrapper from "@/layouts/wrapper";
// import { Metadata } from "next";
import { usePathname } from "next/navigation";

// export const metadata: Metadata = {
//   title: "Company Details",
// };

const CompanyDetailsPage = ({ params }: { params: { id: string } }) => {
  const pathName = usePathname();
  return (
    <Wrapper>
      <div className="main-page-wrapper">
        {/* header start */}
        <Header />
        {/* header end */}

        {/*breadcrumb start */}
        <CompanyBreadcrumb
          title="Company Details"
          subtitle="Find company details here"
        />
        {/*breadcrumb end */}

        {/* company details area start */}
        {<CompanyDetailsArea id={params.id} url={pathName} />}
        {/* company details area end */}

        {/*job Open Position */}
        <OpenPosition companyId={params.id} />
        {/*job Open Position */}

        {/* job portal intro start */}
        {/* <JobPortalIntro top_border={true} /> */}
        {/* job portal intro end */}

        {/* footer start */}
        <FooterOne />
        {/* footer end */}
      </div>
    </Wrapper>
  );
};

export default CompanyDetailsPage;
