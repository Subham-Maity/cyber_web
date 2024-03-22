"use client";
import React, { useEffect } from "react";
import DashboardHeader from "../candidate/dashboard-header";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import instance from "@/lib/axios";
import { getEmploySub } from "@/redux/features/subscription/api";
import { IEmployerSub, Price } from "@/types/template";
import { notifyError } from "@/utils/toast";
import { getDate } from "@/utils/helper";
import { valetedCoupon } from "@/redux/features/subscription/slice";
import CouponModel from "../../common/popup/coupon-model";
declare global {
  interface Window {
    Razorpay: any;
  }
}

// props type
type IProps = {
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};
const EmployMembershipArea = ({ setIsOpenSidebar }: IProps) => {
  const { currEmployer } = useAppSelector((s) => s.employer);
  const subscription = currEmployer?.subscription as IEmployerSub;
  const { coupon } = useAppSelector((s) => s.subscription);

  const checkoutHandler = async (
    event: React.MouseEvent<HTMLButtonElement>,
    sub: IEmployerSub,
    price: Price
  ) => {
    if (!currEmployer) {
      notifyError("Please login to proceed");
      return;
    }
    const bodyObj = {
      amount: coupon
        ? price?.amount -
          Math.floor((price?.amount * coupon.discountPercentage) / 100)
        : price?.amount,
      currency: price.currency.abbreviation,
      duration: price.duration,
      user: currEmployer?._id,
      userModel: "Employer",
      product: sub._id,
      productModel: "EmployerSub",
      coupon: coupon?._id || "",
    };

    const {
      data: { keyId },
    } = await instance.get("/payment/getKey");

    const {
      data: { order },
    } = await instance.post("/payment/checkout", bodyObj);

    const options = {
      key: keyId,
      amount: order.amount,
      currency: order.currency,
      name: currEmployer?.firstName + currEmployer?.lastName,
      description: "Payment for subscription plan",
      image: currEmployer.avatar || "",
      order_id: order.id,
      callback_url: `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/v1/payment/paymentVerification`,
      prefill: {
        name: currEmployer?.firstName + currEmployer?.lastName || "user",
        email: currEmployer.email,
        contact: currEmployer?.phoneNumber || "",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#00BF58",
      },
    };

    const razor = new window.Razorpay(options);
    razor.on("payment.failed", function (response: any) {
      alert(`Payment failed: ${response.error.code}`);
    });
    razor.open();
    dispatch(valetedCoupon(null));
  };

  const dispatch = useAppDispatch();
  const { employSub } = useAppSelector((s) => s.subscription);
  const [isYearly, setIsYearly] = React.useState<boolean>(true);

  const handleToggle = () => {
    setIsYearly((prev) => !prev);
  };

  useEffect(() => {
    getEmploySub(dispatch);
  }, []);

  const lastPayDate = new Date(currEmployer?.paymentDate || 0);

  return (
    <>
      {subscription && (
        <div className="dashboard-body">
          <div className="position-relative">
            {/* header start */}
            <DashboardHeader setIsOpenSidebar={setIsOpenSidebar} />
            {/* header end */}

            <h2 className="main-title">Membership</h2>

            <div className="membership-plan-wrapper mb-20">
              <div className="row gx-0">
                <div className="col-xxl-7 col-lg-6 d-flex flex-column">
                  <div className="column w-100 h-100">
                    <h4 className="text-capitalize">
                      Current Plan ({subscription.subscriptionType})
                    </h4>
                    <ul className="style-none">
                      <li>
                        {subscription.offering.jobPostLimit} jobs can be posted
                        this month
                      </li>
                      <li>
                        {subscription.offering.aiTokenLimit} Ai tokens left
                      </li>
                      <li>Candidate List newsletter</li>
                      <li>Job Tracking</li>
                      <li>blogs: Updates on News in Cybersecurity Trends</li>
                      {subscription.subscriptionType === "essential" ? (
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
                <div className="col-xxl-5 col-lg-6 d-flex flex-column">
                  <div className="column border-left w-100 h-100">
                    <div className="">
                      <h3 className="price m0">
                        {subscription.price[0].currency.symbol}{" "}
                        {subscription.price[0].amount}
                      </h3>
                      <div className="ps-4 flex-fill">
                        <h6>
                          subscription duration -{" "}
                          {subscription.price[0].duration}
                        </h6>
                        {currEmployer?.paymentDate ? (
                          <p className="text1 d-block">
                            subscribed at{" "}
                            <span className="fw-500">
                              {getDate(lastPayDate.toLocaleDateString())}
                            </span>
                          </p>
                        ) : null}
                        {subscription.subscriptionType === "essential" ? (
                          <p>You can anytime update the subscription plan.</p>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-center ">
              <div className="subscription-tab align-content-center py-2  d-flex gap-3 px-2">
                <p
                  onClick={handleToggle}
                  className={`p-1 px-2 ${isYearly && "active"}`}
                >
                  Yearly
                </p>
                <p
                  onClick={handleToggle}
                  className={`p-1 px-2 ${!isYearly && "active"}`}
                >
                  Monthly
                </p>
              </div>
            </div>

            <section className="pricing-section">
              <div className="row justify-content-center">
                {employSub.length > 0
                  ? employSub.map((item) => (
                      <div className="col-lg-5 col-md-6">
                        <div className="pricing-card-one mt-25">
                          <div className="pack-name">
                            {item.subscriptionType}
                          </div>
                          {item.price.length && item.price.length > 1 ? (
                            <div className="price fw-500">
                              {!isYearly ? (
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
                              {item.offering.jobPostLimit} jobs can be posted
                              per month
                            </li>
                            <li>{item.offering.aiTokenLimit} Ai tokens</li>
                            <li>Candidate List newsletter</li>
                            <li>Job Tracking</li>
                            <li>
                              blogs: Updates on News in Cybersecurity Trends
                            </li>
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
                          {subscription.hasOwnProperty("_id") &&
                          subscription._id === item._id ? (
                            <button
                              className=" tran3s w-100 mt-30 mx-auto current-plan"
                              style={{
                                lineHeight: "54px",
                                fontWeight: "500",
                                borderRadius: "30px",
                              }}
                            >
                              Current Plan
                            </button>
                          ) : (
                            <button
                              disabled={item.subscriptionType === "essential"}
                              onClick={(e) =>
                                checkoutHandler(
                                  e,
                                  item,
                                  item.price[isYearly ? 1 : 0]
                                )
                              }
                              className={`get-plan-btn tran3s w-100 mt-30 mx-auto ${
                                item.subscriptionType === "essential" &&
                                "disabled"
                              }`}
                            >
                              Choose Plan
                            </button>
                          )}
                          {/* <button
                            onClick={(e) =>
                              checkoutHandler(
                                e,
                                item,
                                item.price[isYearly ? 1 : 0]
                              )
                            }
                            className="get-plan-btn tran3s w-100 mt-30 mx-auto "
                          >
                            {subscription?.hasOwnProperty("_id") &&
                            subscription._id === item._id
                              ? "Current Plan"
                              : "Choose Plan"}
                          </button> */}
                        </div>
                      </div>
                    ))
                  : null}
               <div className="col-lg-5 col-md-6">
                  <div className="pricing-card-one mt-25">
                    <div className="pack-name mb-20">
                    Enterprise Plan
                    </div>
                    <div className="price fw-500" style={{fontSize:'x-large'}}>
                    Tailored Solutions
                    </div>
                    <ul className="style-none">
                      <li>
                      Customized recruitment solutions based on company needs.
                      </li>
                      <li>
                      Unlimited access to premium features.
                      </li>
                      <li>
                      API integration with the company's ATS (Applicant Tracking System).
                      </li>
                      <li>
                      On-site recruitment events and career fairs.
                      </li>
                      <li>
                      Customized training sessions for the recruiting team.
                      </li>
                      <li>
                      Executive recruiting assistance for key positions.
                      </li>
                      <li>
                      Exclusive industry partnerships and networking events.
                      </li>

                    </ul>
                    <button
                            className=" tran3s w-100 mt-30 mx-auto current-plan"
                            style={{
                              lineHeight: "25px",
                              fontWeight: "500",
                              borderRadius: "30px",
                              cursor: "initial",
                            }}
                          >
                           Please reach out to us to discuss this product and pricing at info@cyberlevels.com
                          </button>
                  </div>
                  </div>
                  <div className="col-lg-5 col-md-6">
                  <div className="pricing-card-one mt-25">
                    <div className="pack-name mb-20">
                    Pay-Per-Feature Add-ons
                    </div>
                    <div className="price fw-500" style={{fontSize:'x-large'}}>
                    Additional Enhancements
                    </div>
                    <ul className="style-none">
                      <li>
                      Skill testing and assessment for candidates.
                      </li>
                      <li>
                      Video interviewing & assessment.
                      </li>
                      <li>
                      Access to premium talent pools.
                      </li>
                      <li>
                      Social media promotion for job listings.
                      </li>
                      <li>
                      Enhanced job distribution to partner sites.
                      </li>
                      
                    </ul>
                    <button
                            className=" tran3s w-100 mt-30 mx-auto current-plan"
                            style={{
                              lineHeight: "25px",
                              fontWeight: "500",
                              borderRadius: "30px",
                              cursor: "initial",
                            }}
                          >
                           Please reach out to us to discuss this product and pricing at info@cyberlevels.com
                          </button>
                  </div>
                  </div>
                  
              </div>
            </section>
          </div>
        </div>
      )}

      <CouponModel />
    </>
  );
};

export default EmployMembershipArea;
