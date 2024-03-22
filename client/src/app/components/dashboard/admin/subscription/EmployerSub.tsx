"use client";
import { IEmployerSub } from "@/types/template";
import React, { useState } from "react";

const EmployerSub = ({
  subscriptionArr,
}: {
  subscriptionArr: IEmployerSub[];
}) => {
  const [isMonthly, setIsMonthly] = useState<boolean>(true);

  const handleToggle = () => {
    setIsMonthly((prev) => !prev);
  };

  return (
    <>
      <div style={{ width: "fit-content" }} className=" mt-3 mx-auto">
        <div className="subscription-tab align-content-center py-2  d-flex gap-3 px-2">
          <p
            onClick={handleToggle}
            className={`p-1 px-2 ${isMonthly && "active"}`}
          >
            monthly
          </p>
          <p
            onClick={handleToggle}
            className={`p-1 px-2 ${!isMonthly && "active"}`}
          >
            yearly
          </p>
        </div>
      </div>
      <section className="pricing-section">
        <div className="row justify-content-center">
          {subscriptionArr.length > 0
            ? subscriptionArr.map((item) => (
                <div className="col-lg-4 col-md-6">
                  <div className="pricing-card-one popular-two mt-25">
                    <div className="pack-name">{item.subscriptionType}</div>
                    {item.price.length && item.price.length > 1 ? (
                      <div className="price fw-500">
                        {isMonthly ? (
                          <>
                            <sub>{item.price[0].currency.symbol}</sub>{" "}
                            {item.price[0].amount}
                          </>
                        ) : (
                          <>
                            {" "}
                            <sub>{item.price[1].currency.symbol}</sub>
                            {item.price[1].amount}
                          </>
                        )}
                      </div>
                    ) : (
                      <div className="price fw-500">
                        <sub>{item.price[0].currency.symbol}</sub>{" "}
                        {item.price[0].amount}
                      </div>
                    )}
                    <ul className="style-none">
                      <li>
                        {item.offering.jobPostLimit} jobs can be posted per
                        month
                      </li>
                      <li>{item.offering.aiTokenLimit} Ai tokens</li>
                      <li>Candidate List newsletter</li>
                      <li>Job Tracking</li>
                      <li>blogs: Updates on News in Cybersecurity Trends</li>
                      {item.subscriptionType === "essential" ? (
                        <>
                          <li>Limited candidate search</li>
                        </>
                      ) : (
                        <>
                          <li>Unlimited candidate search</li>
                          <li>In App chat with candidate</li>
                          <li>Request to potential candidate</li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
              ))
            : null}
        </div>
      </section>
    </>
  );
};

export default EmployerSub;
