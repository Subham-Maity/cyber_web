"use client";
import {
  subscriptionTypeOption,
  subscriptionForOption,
  currencyOptions,
} from "@/utils/selectOtions";
import AutocompleteCurrency from "@/ui/autoCompleteCurrency";
import { useState, useEffect } from "react";
import UniversalSelect from "./universel-select";
import { getCandidateSubModel } from "@/redux/features/template/api";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import {
  submitCandidateSub,
  submitEmploySub,
} from "@/redux/features/subscription/api";
import { getAllCurrencies } from "@/redux/features/currencyProvider/api";
import { camelCaseToNormal } from "@/utils/helper";
import { Currency } from "@/redux/features/currencyProvider/slice";

interface OfferingField {
  type: string;
  required?: boolean;
}

interface Offering {
  [key: string]: OfferingField;
}

const SubscriptionModel = () => {
  const dispatch = useAppDispatch();
  const { subscriptionModel } = useAppSelector((s) => s.template);
  const { currencies } = useAppSelector((state) => state.currency);
  const [subscriptionType, setSubscriptionType] = useState("");
  const [subscriptionFor, setSubscriptionFor] = useState("");
  const [subscriptionAmount, setSubscriptionAmount] = useState("");
  const [subscriptionCurrency, setSubscriptionCurrency] = useState<
    Currency | undefined
  >({
    abbreviation: "",
    name: "",
    symbol: "",
  });
  const [subscriptionDuration, setSubscriptionDuration] = useState("");
  const [dynamicFields, setDynamicFields] = useState<{
    [key: string]: string;
  }>({});

  // const renderDynamicFields = () => {
  //   if (
  //     !subscriptionModel ||
  //     !subscriptionModel?.properties ||
  //     !subscriptionModel?.properties.offering
  //   ) {
  //     return null;
  //   }

  //   const offeringProperties: Offering = subscriptionModel?.properties.offering;

  //   return Object.keys(offeringProperties).map((fieldName) => {
  //     const field = offeringProperties[fieldName];
  //     const isRequired = field.required || false;

  //     return (
  //       <div key={fieldName} className="dash-input-wrapper mb-30">
  //         <label htmlFor={fieldName}>
  //           {camelCaseToNormal(fieldName)} {isRequired ? "*" : ""}
  //         </label>

  //         {field.type === "String" ? (
  //           <input
  //             type="text"
  //             value={dynamicFields[fieldName] || ""}
  //             onChange={(e) => {
  //               setDynamicFields((prevFields) => ({
  //                 ...prevFields,
  //                 [fieldName]: e.target.value,
  //               }));
  //             }}
  //           />
  //         ) : (
  //           <input
  //             type="number"
  //             value={dynamicFields[fieldName] || ""}
  //             onChange={(e) => {
  //               setDynamicFields((prevFields) => ({
  //                 ...prevFields,
  //                 [fieldName]: e.target.value,
  //               }));
  //             }}
  //           />
  //         )}

  //         {/* Add more conditions based on other field types (e.g., Number, Date, etc.) as needed */}
  //       </div>
  //     );
  //   });
  // };
  const handleSave = async () => {
    const bodyObj = {
      subscriptionType,
      subscriptionFor,
      price: {
        amount: subscriptionAmount,
        currency: subscriptionCurrency,
      },
      duration: subscriptionDuration,
      offering: {
        ...dynamicFields,
      },
    };

    console.log(bodyObj);

    if (subscriptionFor === "CandidateSubModel") {
      await submitCandidateSub(dispatch, bodyObj);
    } else {
      await submitEmploySub(dispatch, bodyObj);
    }
    // Reset the form field
    setSubscriptionType("");
    setSubscriptionFor("");
    setSubscriptionAmount("");
    setSubscriptionCurrency({
      abbreviation: "",
      name: "",
      symbol: "",
    });
    setSubscriptionDuration("");
    setDynamicFields({});
  };

  useEffect(() => {
    if (subscriptionFor) getCandidateSubModel(dispatch, subscriptionFor);
  }, [subscriptionFor]);

  useEffect(() => {
    getAllCurrencies(dispatch);
  }, []);
  return (
    <div
      className="modal fade"
      id="subscriptionModel"
      tabIndex={-1}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-fullscreen modal-dialog-centered">
        <div className="user-data-form modal-content">
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
          <div className="container subscription-model">
            <h2 className="fs-2 text-center mb-3 ">Create Subscription Plan</h2>
            <div className="form-wrapper dash-input-wrapper m-auto w-100 mt-3  ">
              <div>
                <div className="dash-input-wrapper mb-30">
                  <label htmlFor="bio">Subscription For*</label>
                  <UniversalSelect
                    options={subscriptionForOption}
                    setSelected={setSubscriptionFor}
                  />
                </div>
              </div>
            </div>
            {subscriptionModel && (
              <>
                <div className="form-wrapper dash-input-wrapper m-auto w-100 ">
                  <div>
                    <div className="dash-input-wrapper mb-30">
                      <label htmlFor="firstName">Subscription Type*</label>
                      <input
                        type="text"
                        value={subscriptionType}
                        onChange={(e) => {
                          setSubscriptionType(e.target.value);
                        }}
                      />
                    </div>

                    <div className="dash-input-wrapper row">
                      <label htmlFor="bio">Price*</label>
                      <div className="dash-input-wrapper col-6">
                        <label htmlFor="bio">Amount</label>
                        <input
                          type="text"
                          value={subscriptionAmount}
                          onChange={(e) => {
                            setSubscriptionAmount(e.target.value);
                          }}
                        />
                      </div>
                      <div className="dash-input-wrapper col-6">
                        <label htmlFor="bio">Currency</label>
                        {/* <UniversalSelect
                            options={currencyOptions}
                            setSelected={setSubscriptionCurrency}
                          /> */}
                        <AutocompleteCurrency
                          selected={subscriptionCurrency}
                          setSelected={setSubscriptionCurrency}
                          endPoint=""
                          suggestionsProp={currencies}
                          placeholder="Select Currency"
                        />
                      </div>
                    </div>

                    <div className="dash-input-wrapper mb-30">
                      <label htmlFor="bio">Duration*</label>
                      {/* <input
                          type="text"
                          value={subscriptionDuration}
                          onChange={(e) => {
                            setSubscriptionDuration(e.target.value);
                          }}
                        /> */}
                      <UniversalSelect
                        options={subscriptionTypeOption}
                        setSelected={setSubscriptionDuration}
                      />
                    </div>
                  </div>
                  {/* dynamic form */}
                  {/* {renderDynamicFields()} */}

                  <div className="button-group d-inline-flex align-items-center mt-30">
                    <button
                      onClick={handleSave}
                      className="dash-btn-two tran3s me-3"
                      type="button"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    >
                      Save
                    </button>
                    <button
                      className="dash-cancel-btn tran3s"
                      type="button"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionModel;
