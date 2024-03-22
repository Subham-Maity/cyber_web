"use client";
import React, { useState } from "react";
import "react-phone-number-input/style.css";

import AutocompleteCategory from "@/ui/autoCompleteBlogCategory";
import { createBlog } from "@/redux/features/admin/api";
import Loader from "@/ui/loader";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createCoupon } from "@/redux/features/Coupons/api";
import { ICoupon } from "@/types/coupon-type";
// import TextEditor from "./editor";

const AdminCouponArea = () => {
  const dispatch = useAppDispatch();
  const { currAdmin } = useAppSelector((state) => state.admin);
  const [description, setDescription] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [discountPercentage, setDiscountPercentage] = useState<number>(0);
  const [maxUseLimit, setMaxUseLimit] = useState<number>(1);
  //   const [content, setContent] = useState<string>("");
  const { loading } = useAppSelector((state) => state.blog);
  const [expirationDate, setExpirationDate] = useState<Date | null>(null);
  const handleSubmit = async () => {
    // console.log(title, content, category);
    const bodyObj = {
      code,
      discountPercentage,
      expirationDate,
      description,
      maxUseLimit,
    };

    await createCoupon(dispatch, bodyObj);
    // setContent("");
    setCode("");
    setDiscountPercentage(0);
    setDescription("");
    setExpirationDate(null);
    setMaxUseLimit(1);
  };
  return (
    <div>
      <h2 className="main-title">Create Coupon</h2>
      <div className="bg-white card-box border-20">
        {/* <h4 className="dash-title-three">Job Details</h4> */}
        <div className="dash-input-wrapper mb-30">
          <label htmlFor="">Coupon Code*</label>
          <input
            type="text"
            placeholder="Enter new Code"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
          />
        </div>
        <div className="dash-input-wrapper mb-30">
          <label htmlFor="">Discount Percentage*</label>
          <input
            type="number"
            placeholder="Discount Percentage"
            value={discountPercentage}
            onChange={(e) =>
              setDiscountPercentage(
                parseInt(e.target.value) > 100 ? 100 : parseInt(e.target.value)
              )
            }
            min={0}
            max={100}
          />
        </div>
        <div className="dash-input-wrapper mb-30">
          <label htmlFor="">Max Use Limit*</label>
          <input
            type="number"
            placeholder="Max Use Limit"
            value={maxUseLimit}
            onChange={(e) => setMaxUseLimit(parseInt(e.target.value))}
            min={0}
            max={100}
          />
        </div>
        <div className="dash-input-wrapper mb-30">
          <label htmlFor="">Coupon Expiry Date</label>
          <DatePicker
            className="w-full block"
            placeholderText="DD/MM/YYYY"
            name="deadlineDate"
            selected={expirationDate}
            onChange={(date: Date | null) => setExpirationDate(date)}
            dateFormat="dd/MM/yyyy"
            minDate={new Date()}
          />
          {/* {!validForm.deadlineDate && (
                    <p style={{ color: "red" }}>select a Valid deadline date</p>
                )} */}
        </div>
        <div className="dash-input-wrapper mb-30">
          <label htmlFor="">Description*</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="size-lg"
            placeholder="Write description about the coupon"
          ></textarea>
          {/* <AutocompleteCategory
              categories={category}
              setCategories={setCategory}
            /> */}
          {/* <div className="skill-input-data d-flex align-items-center flex-wrap">
              {category.map((value) => (
                <button key={value}>{value}</button>
              ))}
            </div> */}
        </div>
        {/* <div className="dash-input-wrapper mb-30">
          
        </div> */}
        {/* <div className="dash-input-wrapper mb-30">
          <label htmlFor="">Blog Content*</label>
          {/* <TextEditor content={content} setContent={setContent} /> */}
        {/* </div> */}
        <div className="button-group d-inline-flex align-items-center mt-30">
          <button
            disabled={loading}
            type={"submit"}
            onClick={handleSubmit}
            className="dash-btn-two tran3s me-3"
          >
            {loading ? <Loader /> : "Save"}
          </button>
          {/* <a href="#" className="dash-cancel-btn tran3s">
            Cancel
          </a> */}
        </div>
      </div>
    </div>
  );
};

export default AdminCouponArea;
