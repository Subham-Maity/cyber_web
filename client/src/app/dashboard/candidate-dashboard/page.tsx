"use client";
import CandidateDashboardMain from "@/app/components/dashboard/candidate";
import Wrapper from "@/layouts/wrapper";
import { useAppSelector } from "@/redux/hook";
// export const metadata: Metadata = {
//   title: "Candidate Dashboard",
// };

const CandidateDashboardPage = () => {
  const { currCandidate } = useAppSelector(
    (state) => state.candidate.candidateDashboard
  );

  return <Wrapper>{currCandidate && <CandidateDashboardMain />}</Wrapper>;
};

export default CandidateDashboardPage;
