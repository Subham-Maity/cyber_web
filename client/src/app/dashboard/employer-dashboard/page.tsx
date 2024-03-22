"use client";
import EmployDashboardMain from "@/app/components/dashboard/employ";
import Wrapper from "@/layouts/wrapper";
import { useAppSelector } from "@/redux/hook";
const EmployDashboardPage = () => {
  const { currEmployer } = useAppSelector((state) => state.employer);

  return <Wrapper>{currEmployer && <EmployDashboardMain />}</Wrapper>;
};

export default EmployDashboardPage;
