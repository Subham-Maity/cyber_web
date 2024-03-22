"use client";
import { updateTemplate } from "@/redux/features/template/api";
import { useAppSelector } from "@/redux/hook";
import Loader from "@/ui/loader";
import React, { useState } from "react";
import "react-phone-number-input/style.css";
import { useDispatch } from "react-redux";
import DashboardHeader from "../candidate/dashboard-header";
import AttachSelect from "./attachSelect";
import TypeSelect from "./typeSelect";
// props type
type IProps = {
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};
const AddNewField = ({ setIsOpenSidebar }: IProps) => {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    logo: "",
    name: "",
    email: "",
    foundedDate: "",
    founderName: "",
    about: "",
    category: "",
  });
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const { currEmployer } = useAppSelector((s) => s.employer);
  const { loading } = useAppSelector((s) => s.template);

  const [isChecked, setIsChecked] = useState(false);
  const [type, setType] = useState("");
  const [attachTo, setAttachTo] = useState("");
  const [label, setLabel] = useState("");

  const handleToggle = () => {
    setIsChecked((prev) => !prev);
  };

  const handleSubmit = async () => {
    const bodyObj = {
      label,
      type,
      modelName: attachTo,
      required: isChecked,
    };

    console.log(bodyObj, "bodyObj");

    await updateTemplate(dispatch, bodyObj);
    setAttachTo("");
    setType("");
    setLabel("");
    setIsChecked(false);
  };

  return (
    <div className="dashboard-body">
      <div className="position-relative candidates-profile-details">
        {/* header start */}

        <DashboardHeader setIsOpenSidebar={setIsOpenSidebar} />
        {/* header end */}

        <h2 className="main-title">Add new Field</h2>
        {/* from for general details */}
        <div className="bg-white card-box border-20">
          <div className="dash-input-wrapper mb-30">
            <label htmlFor="name">Label Name*</label>
            <input
              type="text"
              name="label"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="Category"
            />
          </div>
          <div className="dash-input-wrapper mb-30">
            <label htmlFor="name">Type*</label>

            <TypeSelect setSelected={setType} />
          </div>
          <div className="dash-input-wrapper mb-30">
            <label htmlFor="name mb-0">Required*</label>

            <div className=" h-fit">
              <input
                type="checkbox"
                className="toggle-input mt-0"
                id="toggleSwitch"
                checked={isChecked}
                onChange={handleToggle}
              />
              <label
                className="toggle-label -mt-32"
                htmlFor="toggleSwitch"
              ></label>
            </div>
          </div>
          <div className="dash-input-wrapper mb-30">
            <label htmlFor="name">Attached to*</label>
            <AttachSelect setSelected={setAttachTo} />
          </div>
        </div>

        <div className="button-group d-inline-flex align-items-center mt-30">
          <button
            disabled={loading}
            type="submit"
            onClick={handleSubmit}
            className=" d-flex dash-btn-two tran3s me-3 justify-content-center align-items-center"
          >
            {loading ? <Loader /> : <span>Save</span>}
          </button>
          <a href="#" className="dash-cancel-btn tran3s">
            Cancel
          </a>
        </div>
      </div>
    </div>
  );
};

export default AddNewField;
