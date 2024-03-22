import { JobPostView } from "@/redux/features/jobPost/slice";
import React, { useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const AdminAreaChart = ({
  dataMode,
  lastUnit,
  viewsDataDay,
  viewsDataMonth,
  viewsDataYear,
}: {
  dataMode: string;
  lastUnit: number;
  viewsDataDay?: JobPostView[][];
  viewsDataMonth?: JobPostView[][];
  viewsDataYear?: JobPostView[][];
}) => {
  // useEffect(() => {
  //   console.log(viewsDataDay,"Day")
  // },[viewsDataYear])
  const getLastFiveDays = () => {
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const today = new Date();
    const lastFiveDays = [];
    if (viewsDataDay) {
      for (let i = lastUnit; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        const dayName = dayNames[date.getDay()];
        lastFiveDays.push({
          name: dayName,
          views: viewsDataDay[11 - i].length,
        });
      }
    }

    return lastFiveDays;
  };

  const getLastMonths = () => {
    const today = new Date();
    const lastMonths = [];
    if (viewsDataMonth) {
      for (let i = lastUnit; i >= 0; i--) {
        const date = new Date(today);
        date.setMonth(today.getMonth() - i);
        const monthName = new Intl.DateTimeFormat("en-US", {
          month: "short",
        }).format(date);

        lastMonths.push({
          name: monthName,
          views: viewsDataMonth[11 - i].length,
        });
      }
    }

    return lastMonths;
  };

  const getLastYears = () => {
    const today = new Date();
    const lastYears = [];
    if(viewsDataYear){
        for (let i = lastUnit; i >= 0; i--) {
          const date = new Date(today);
          date.setFullYear(today.getFullYear() - i);
          lastYears.push({name:date.getFullYear().toString(),views: viewsDataYear[11-i].length});
        }

    }

    return lastYears;
  };

  const getYAxisData = () => {
    switch (dataMode) {
      case "day":
        return getLastFiveDays();
      case "month":
        return getLastMonths();
      case "year":
        return getLastYears();
      default:
        return [];
    }
  };

  const data = getYAxisData();

  const gradientOffset = () => {
    const dataMax = Math.max(...data.map((i) => i.views));
    const dataMin = Math.min(...data.map((i) => i.views));

    if (dataMax <= 0) {
      return 0;
    }
    if (dataMin >= 0) {
      return 1;
    }

    return dataMax / (dataMax - dataMin);
  };

  return (
    <ResponsiveContainer width="100%" height={380}>
      <AreaChart
        //   style={{width:"100%"}}
        // width={500}
        // height={400}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset={gradientOffset()}
              stopColor="green"
              stopOpacity={0.7}
            />
            <stop
              offset={gradientOffset()}
              stopColor="yellow"
              stopOpacity={0.7}
            />
          </linearGradient>
        </defs>
        <Tooltip />
        <Area
          type="monotone"
          dataKey="views"
          stroke="url(#colorUv)"
          fill="url(#colorUv)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AdminAreaChart;
