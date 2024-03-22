import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setSubscriptionModelEmployer } from "@/redux/features/model/slice";
import { IEmployerSub } from "@/types/template";
import { camelCaseToNormal } from "@/utils/helper";
import { getCandidateSub } from "@/redux/features/subscription/api";
import instance from "@/lib/axios";
declare global {
  interface Window {
    Razorpay: any;
  }
}

const SubscriptionModalForEmployer = () => {
  const dispatch = useAppDispatch();

  const { subscriptionModelEmployer } = useAppSelector((state) => state.model);
  const handleClose = () => {
    dispatch(setSubscriptionModelEmployer(false));
  };

//   useEffect(() => {
//     getCandidateSub(dispatch);
//   }, []);
  const { currEmployer } = useAppSelector(
    (s) => s.employer
  );
  const subscription = currEmployer?.subscription;

  const { employSub } = useAppSelector((s) => s.subscription);
  const checkoutHandler = async (
    event: React.MouseEvent<HTMLButtonElement>,
    sub: IEmployerSub
  ) => {
    const bodyObj = {
      amount: sub.price[0].amount,
      currency: "INR",
      user: currEmployer?._id,
      userModel: "Candidate",
      product: sub._id,
      productModel: "CandidateSub",
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
      name: "Shiva Shah",
      description: "Testing of RazorPay",
      image: "https://avatars.githubusercontent.com/u/86485099?v=4",
      order_id: order.id,
      callback_url: `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/v1/payment/paymentVerification`,
      prefill: {
        name: "Gaurav Kumar",
        email: "gaurav.kumar@example.com",
        contact: "9999999999",
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
  };
  const renderOfferingItems = (offeringData: any) => {
    return Object.entries(offeringData).map(([key, value]) => {
      // Customize the rendering based on your requirements
      let displayKey = key;
      let displayValue = value;

      return <li key={key}>{`${camelCaseToNormal(key)}: ${displayValue}`}</li>;
    });
  };

  return (
    <div
      style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
      className={`modal-backdrop  fade ${
        subscriptionModelEmployer ? "show opacity-100" : ""
      }`}
      onClick={handleClose}
    >
      <div
        className={`modal fade ${subscriptionModelEmployer ? "show d-block" : ""}`}
        id="subscriptionModalEmployer"
        tabIndex={-1}
        aria-hidden={!subscriptionModelEmployer}
        style={{ overflowY: "hidden" }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal-dialog modal-fullscreen modal-dialog-centered">
          <div className="container">
            <div
              className="user-data-form modal-content"
              style={{ maxWidth: "80vw" }}
            >
              <button
                type="button"
                className="btn-close"
                onClick={() => dispatch(setSubscriptionModelEmployer(false))}
              ></button>
              <div
                style={{ maxWidth: "100%" }}
                className="form-wrapper  m-auto px-5 w-100 "
              >
                <div className="text-center">
                  <h2 className=" mb-3">Upgrade your plan</h2>
                </div>
                {/* <div className="d-flex row  mx-auto mb-3  ">
                  <div className="d-flex align-items-start   gap-3  ">
                    <h1>
                      <i className="bi  bi-person-check"></i>
                    </h1>
                    <span>
                      To enhance your experience and gain access to more
                      features, we kindly invite you to upgrade your current
                      plan. This will allow us to provide you with a more
                      comprehensive and tailored service. Thank you for your
                      continued support.
                    </span>
                  </div>
                </div> */}
                <section className="pricing-section max w-100 ">
                  <div className="row justify-content-center">
                    {employSub.map((sub, index) => (
                      <div className="col-lg-4 col-md-6">
                        <div className="pricing-card-one popular-two mt-25 ">
                          {index === 1 && (
                            <div className="popular-badge">popular</div>
                          )}
                          <div className="popular-badge">
                            {subscription?.hasOwnProperty("_id") &&
                            subscription._id === sub._id
                              ? "Current"
                              : null}
                          </div>

                          <div className="pack-name text-capitalize ">
                            {sub.subscriptionType}
                          </div>
                          {/* <div className="price fw-500">
                            <sub title={sub.price.currency.name}>
                              {sub.price.currency.symbol}
                            </sub>{" "}
                            {sub.price.amount}
                          </div> */}
                          {/* <ul className="style-none">
                            {renderOfferingItems(sub.offering as Offering)}
                          </ul> */}
                          <button
                            onClick={(e) => checkoutHandler(e, sub)}
                            className="get-plan-btn tran3s w-100 mt-30 mx-auto "
                          >
                            {subscription?.hasOwnProperty("_id") &&
                            subscription._id === sub._id
                              ? "Current Plan"
                              : "Choose Plan"}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
                <div className="d-flex justify-content-between  justify-content-center mt-3  ">
                  <button className="btn-two" onClick={handleClose}>
                    Cancel
                  </button>
                  {/* <Link
                    href="/dashboard/candidate-dashboard/profile"
                    type="button"
                    className="btn-one"
                  >
                    Complete Profile
                  </Link> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionModalForEmployer;
