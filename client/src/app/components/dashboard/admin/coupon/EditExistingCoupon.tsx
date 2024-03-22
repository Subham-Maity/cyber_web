"use client";
import React, { useEffect, useState } from "react";
import "react-phone-number-input/style.css";

import AutocompleteCategory from "@/ui/autoCompleteBlogCategory";
import { createBlog } from "@/redux/features/admin/api";
import Loader from "@/ui/loader";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createCoupon, getAllCoupons, updateCoupon } from "@/redux/features/Coupons/api";
import { ICoupon } from "@/types/coupon-type";
// import TextEditor from "./editor";

const EditCouponArea = () => {
  const { coupons, currCouponEdit, page } = useAppSelector((state) => state.coupon);
  const [currCoupon, setCurrCoupon] = useState<ICoupon | null>(null);
  useEffect(() => {
    const coupon = coupons?.find((co) => co._id === currCouponEdit); 
    setCurrCoupon(coupon!);
  }, [currCouponEdit]);
  const dispatch = useAppDispatch();
  const { currAdmin } = useAppSelector((state) => state.admin);
  const [description, setDescription] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [discountPercentage, setDiscountPercentage] = useState<number>(0);
  //   const [content, setContent] = useState<string>("");
  const { loading } = useAppSelector((state) => state.blog);
  const [expirationDate, setExpirationDate] = useState<Date | null>(null);
  useEffect(() => {
    setDescription(currCoupon?.description || "");
    setCode(currCoupon?.code || "");
    setDiscountPercentage(currCoupon?.discountPercentage || 0);
    // setExpirationDate(currCoupon?.expirationDate || null);
    setExpirationDate(currCoupon?.expirationDate ? new Date(currCoupon?.expirationDate) : null);
  }, [currCoupon]);
  const handleSubmit = async () => {
    // console.log(title, content, category);
    const bodyObj = {
      _id: currCoupon?._id,
      code,
      discountPercentage,
      expirationDate,
      description,
    };

    await updateCoupon(dispatch, bodyObj);
    // setContent("");
    // setCode("");
    // setDiscountPercentage(0);
    // setDescription("");
    // setExpirationDate(null);
    await getAllCoupons(dispatch,page);
  };
  return (
    <div
      className="modal popUpModal fade"
      id="editCouponModal"
      tabIndex={-1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-fullscreen modal-dialog-centered">
        <div className="container">
          <div className="filter-area-tab modal-content">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
            <div>
              <div className="bg-white card-box border-20">
              <h2 className="main-title text-center">Edit Coupon</h2>
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
                        parseInt(e.target.value) > 100
                          ? 100
                          : parseInt(e.target.value)
                      )
                    }
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
                    data-bs-dismiss="modal"
                    aria-label="Close"
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCouponArea;
