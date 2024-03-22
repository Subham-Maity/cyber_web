"use client";
import FooterOne from "@/layouts/footers/footer-one";
import Header from "@/layouts/headers/header";
import Wrapper from "@/layouts/wrapper";
import BlogOne from "./components/blogs/blog-one";
import CategorySection from "./components/category/category-section";
import ExpertsOne from "./components/experts/experts-one";
import FancyBanner from "./components/fancy-banner/fancy-banner";
import FeatureFour from "./components/features/feature-four";
import FeatureOne from "./components/features/feature-one";
import FeedbackTwo from "./components/feedBacks/feedback-one";
import HeroBanner from "./components/hero-banners/hero-banner";
import HowItWorks from "./components/how-it-works/how-it-works";
import JobPortalIntro from "./components/job-portal-intro/job-portal-intro";
import DownloadButton from "../ui/downloadBtn";
export default function Home() {
  console.log("from the dashboard");

  return (
    <Wrapper>
      {/* header start */}
      <Header />

      {/* header end */}
      {/* hero banner start */}
      <HeroBanner />
      {/* hero banner end */}

      {/* category section start */}
      <CategorySection />
      {/* category section end */}

      {/* <a
        target="_blank"
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${url}`}
      >
        share on Ln
      </a>
      <a
        target="_blank"
        href={`https://twitter.com/intent/tweet?text=${text}&url=${url}`}
      >
        share on twitter
      </a> */}

      {/* feature one start */}
      <FeatureFour />
      {/* feature one end */}
      {/* how works start */}
      <HowItWorks />
      {/* how works end */}
      {/* expert one section start */}
      <ExpertsOne />
      {/* expert one section end */}
      {/* feedback one start */}

      <FeedbackTwo />
      {/* feedback one end */}
      {/* text feature two start */}
      <FeatureOne />
      {/* text feature two end */}
      {/* blog section one start */}
      <BlogOne />
      {/* blog section one end */}
      {/* fancy banner start */}
      <FancyBanner />
      {/* fancy banner end */}
      {/* job portal intro start */}
      {/* <JobPortalIntro /> */}
      {/* job portal intro end */}
      {/* footer start */}
      <FooterOne />
      {/* footer end */}
    </Wrapper>
  );
}
