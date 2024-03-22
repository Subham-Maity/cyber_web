import CompanyBreadcrumb from "@/app/components/common/common-breadcrumb";
import AdminRegisterArea from "@/app/components/register/register-admin";
import FooterOne from "@/layouts/footers/footer-one";
import Header from "@/layouts/headers/header";
import Wrapper from "@/layouts/wrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Auth",
};

const RegisterPage = () => {
  return (
    <Wrapper>
      <div className="main-page-wrapper">
        {/* header start */}
        <Header />
        {/* header end */}

        {/*breadcrumb start */}
        <CompanyBreadcrumb
          title="Admin Authentication"
          subtitle="Login to the Admin Account to Work as administrator."
        />
        {/*breadcrumb end */}

        {/* register area start */}
        <AdminRegisterArea />
        {/* register area end */}

        {/* footer start */}
        <FooterOne />
        {/* footer end */}
      </div>
    </Wrapper>
  );
};

export default RegisterPage;
