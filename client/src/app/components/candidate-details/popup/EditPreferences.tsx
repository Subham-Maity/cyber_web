"use client";
import "react-phone-number-input/style.css";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { Value } from "sass";
import { notifyError, notifyInfo, notifySuccess } from "@/utils/toast";
import AutocompletePosition from "@/ui/autoCompletePosistion";
import {
  getCurrCandidate,
  updateCurrCandidate,
} from "@/redux/features/candidate/api";
import LocationAutoComplete from "@/ui/locationAutoComplete";
import NiceSelect from "@/ui/nice-select";
import AutocompleteCurrency from "@/ui/autoCompleteCurrency";
import { Currency } from "@/redux/features/currencyProvider/slice";
import { getAllLanguages } from "@/redux/features/languageProvider/api";
import { getAllCurrencies } from "@/redux/features/currencyProvider/api";
import CloseIcon from "@mui/icons-material/Close";
import { isValidSalaryNumber } from "@/utils/helper";

const EditPreferences = () => {
  const dispatch = useAppDispatch();
  const { currCandidate, loading } = useAppSelector(
    (state) => state.candidate.candidateDashboard
  );
  const { currUser } = useAppSelector((s) => s.persistedReducer.user);
  const { currencies } = useAppSelector((state) => state.currency);
  const { languages } = useAppSelector((state) => state.language);
  useEffect(() => {
    getAllLanguages(dispatch);
    getAllCurrencies(dispatch);
    getCurrCandidate(dispatch, currUser as string);
  }, []);
  const options:any = [
    // { value: "select period", label: "select period" },
    { value: "monthly", label: "monthly" },
    { value: "yearly", label: "yearly" },
    { value: "weekly", label: "weekly" },
    { value: "By-weekly", label: "By-weekly" },
    { value: "hourly", label: "hourly" },
  ]

  const [defaultPeriod, setDefaultPeriod] = useState(0)
  
  //   const user = currCandidate;

  //   const [gender, setGender] = useState(user?.location?.city);
  //   const [race, setRace] = useState(user?.location?.country);
  //   const [ethnicity, setEthnicity] = useState(user?.location?.country);
  const [currency, setCurrency] = useState<Currency | undefined>(
    currCandidate?.expectedSalary?.currency || undefined
  );

  const [language, setLanguage] = useState("");
  const [location, setLocation] = useState<string[]>(
    currCandidate?.preferredLocations || []
  );
  const [prefLanguages, setPrefLanguages] = useState<string[]>(
    currCandidate?.preferredLanguages || []
  );
  const [salary, setSalary] = useState({
    min: currCandidate?.expectedSalary?.min || undefined,
    max: currCandidate?.expectedSalary?.max || undefined,

    period: currCandidate?.expectedSalary?.period || undefined,
    currency: currCandidate?.expectedSalary?.currency || undefined,
  });
  const [validSalary, setValidSalary] = useState(true);
  const [allFieldsCheck, setAllFieldsCheck] = useState(false);
  useEffect(() => {
    const findDefaultPeriod = () => {
      const def = options.findIndex((option:any) => option.value === currCandidate?.expectedSalary?.period);
      console.log(def,"period index")
      setDefaultPeriod(def);
    }
    setCurrency(currCandidate?.expectedSalary?.currency || undefined);
    setSalary({
      min: currCandidate?.expectedSalary?.min || undefined,
      max: currCandidate?.expectedSalary?.max || undefined,

      period: currCandidate?.expectedSalary?.period || undefined,
      currency: currCandidate?.expectedSalary?.currency || undefined,
    });
    setLocation(currCandidate?.preferredLocations || []);
    setPrefLanguages(currCandidate?.preferredLanguages || []);
    findDefaultPeriod();
  }, [currCandidate]);

  useEffect(() => {
    if (salary.min && salary.max && salary.currency && salary.period) {
      setAllFieldsCheck(true);
    } else {
      setAllFieldsCheck(false);
    }
  }, [salary, prefLanguages, location]);

  useEffect(() => {
    if (
      !salary.min ||
      !salary.max ||
      isValidSalaryNumber(salary?.min.toString(), salary?.max.toString())
    ) {
      setValidSalary(true);
    } else {
      setValidSalary(false);
    }
  }, [salary.min, salary.max]);
  // console.log(prefLanguages, "Pref Languages");
  useEffect(() => {
    if (language === "") {
      return;
    }
    if (prefLanguages.includes(language)) {
      return;
    }
    setPrefLanguages([...prefLanguages, language]);
  }, [language]);

  const updateSalaryProperty = (
    property: string,
    item: { value: Currency | string; label: string }
  ) => {
    setSalary({
      ...salary,
      [property]: item.value,
    });
  };
  useEffect(() => {
    setSalary({ ...salary, ["currency"]: currency as Currency });
  }, [currency]);

  const removeLocation = (value: string) => {
    setLocation((prevLocations) =>
      prevLocations.filter((location) => location !== value)
    );
  };
  const removeprefLanguages = (value: string) => {
    setPrefLanguages((prevLanguages) =>
      prevLanguages.filter((language) => language !== value)
    );
  };
  const handleSave = async () => {
    if (location.length > 6) {
      notifyInfo("Only 6 locations can be added to preferred locations");
      return;
    }
    if (prefLanguages.length > 4) {
      notifyInfo("Only 4 languages can be added to preferred languages");
      return;
    }
    if (
      salary.period === "Select Period" ||
      !salary.period ||
      !salary.currency ||
      !salary.min ||
      !salary.max
    ) {
      notifyInfo("Fields marked with * cannot be empty");
      return;
    }
    if (!validSalary) {
      notifyInfo("Enter valid minimum and maximum salary");
      return;
    }
    if (!allFieldsCheck) {
      notifyInfo("Complete expected salary fields");
      return;
    }
    const preferences = {
      preferredLocations: location,
      preferredLanguages: prefLanguages,
      expectedSalary: salary,
    };

    if (currCandidate) {
      const isUpdated = await updateCurrCandidate(dispatch, currCandidate._id, {
        ...preferences,
      });

      if (isUpdated) {
        notifySuccess("Preferences updated successfully");
      } else notifyError("something went wrong! try again");

    }
  };

  return (
    <>
      <div
        className="modal fade"
        id="preferencesModal"
        tabIndex={-1}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-fullscreen modal-dialog-centered">
          <div className="container-fluid">
            <div className="user-data-form modal-content">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>

              <div className="form-wrapper dash-input-wrapper m-auto w-100 ">
                <div className="row">
                  <div className="col-12">
                    <div className="dash-input-wrapper mb-25">
                      <label htmlFor="city">Expected Salary*</label>
                      <AutocompleteCurrency
                        selected={currency}
                        setSelected={setCurrency}
                        endPoint=""
                        suggestionsProp={currencies}
                        placeholder="Select Currency"
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="dash-input-wrapper mb-30 ">
                      <NiceSelect
                        options={options}
                        defaultCurrent={defaultPeriod}
                        onChange={(item) =>
                          updateSalaryProperty("period", item)
                        }
                        // defaultCurrent={0}
                        placeholder="Select Period"
                        name="period"
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="dash-input-wrapper mb-30">
                      <input
                        type="number"
                        name="min"
                        value={salary.min}
                        onChange={(e) =>
                          updateSalaryProperty("min", {
                            value: e.target.value,
                            label: e.target.value,
                          })
                        }
                        placeholder="Min"
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="dash-input-wrapper mb-30">
                      <input
                        type="number"
                        name="max"
                        value={salary.max}
                        onChange={(e) =>
                          updateSalaryProperty("max", {
                            value: e.target.value,
                            label: e.target.value,
                          })
                        }
                        placeholder="Max"
                      />
                    </div>
                  </div>
                  {(!salary.min ||
                    !salary.max ||
                    !salary.currency ||
                    !salary.period) && (
                    <p style={{ color: "red" }}>
                      Expected salary cannot be empty
                    </p>
                  )}
                  {!validSalary && (
                    <p style={{ color: "red" }}>
                      Enter valid minimum and maximum salary
                    </p>
                  )}
                  <div className="col-12">
                    <div className="dash-input-wrapper mb-25">
                      <label htmlFor="">Preferred Job Locations</label>
                      <LocationAutoComplete
                        setSelected={setLocation}
                        type="cities"
                        label="location"
                        isMultiple={true}
                      />
                      <div
                        style={{ marginTop: "10px" }}
                        className="skill-input-data d-flex align-items-center flex-wrap "
                      >
                        {location.map((value) => (
                          <button
                            key={value}
                            onClick={() => removeLocation(value)}
                            style={{
                              alignItems: "center",
                              display: "flex",
                              justifyContent: "around",
                            }}
                          >
                            <div>{value}</div>
                            <div>
                              {" "}
                              <CloseIcon
                                style={{
                                  fontSize: 12,
                                  marginLeft: 4,
                                  marginBottom: 2,
                                  cursor: "pointer",
                                  color: "#888",
                                }}
                              />{" "}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="dash-input-wrapper mb-30">
                      <label htmlFor="">Preferred Language</label>
                      <AutocompletePosition
                        selected={language}
                        setSelected={setLanguage}
                        endPoint=""
                        suggestionsProp={languages}
                        placeholder="Select Language"
                      />
                      <div
                        style={{ marginTop: "10px" }}
                        className="skill-input-data d-flex align-items-center flex-wrap "
                      >
                        {prefLanguages.map((value) => (
                          <button
                            key={value}
                            onClick={() => removeprefLanguages(value)}
                            style={{
                              alignItems: "center",
                              display: "flex",
                              justifyContent: "around",
                            }}
                          >
                            <div>{value}</div>
                            <div>
                              {" "}
                              <CloseIcon
                                style={{
                                  fontSize: 12,
                                  marginLeft: 4,
                                  marginBottom: 2,
                                  cursor: "pointer",
                                  color: "#888",
                                }}
                              />{" "}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="button-group d-inline-flex align-items-center mt-30">
                  {validSalary && allFieldsCheck ? (
                    <button
                      onClick={handleSave}
                      className="dash-btn-two tran3s me-3"
                      type="button"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={handleSave}
                      className="dash-btn-two tran3s me-3"
                      type="button"
                      // data-bs-dismiss="modal"
                      // aria-label="Close"
                    >
                      Save
                    </button>
                  )}
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditPreferences;
