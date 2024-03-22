import React from "react";
import {Metadata} from "next";
import Header from "@/layouts/headers/header";
import Wrapper from "@/layouts/wrapper";
import FooterOne from "@/layouts/footers/footer-one";
import PrivacyPolicyArea from "../components/privacy-policy/privacy-policyArea";


export const metadata:Metadata={
    title:"Privacy-policy",
};

const PrivacyPolicyPage = () =>{
    return (
        <Wrapper>
        <div className="main-page-wrapper">
          {/* header start */}
          <Header />
          {/* header end */}
  
          {/*MapArea start */}
          {/* <MapArea /> */}
          {/*MapArea end */}
  
          {/* contact area start */}
          {/* <ContactArea /> */}
          {/* contact area end */}
          <PrivacyPolicyArea/>
  
          {/* footer start */}
          <FooterOne />
          {/* footer end */}
        </div>
      </Wrapper>

    );
};

export default PrivacyPolicyPage;