import { ICoupon } from "@/types/coupon-type";
import React from "react";
// import ActionDropdown from "./ActionDropdownForCoupon";

const PaymentGridItem = ({
  key,
  item,
  style_2 = true,
}: {
  key: number;
  item: any;
  style_2?: boolean;
}) => {
  const date1 = new Date(item.createdAt ?? new Date());
  const options2: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  const readableStrings = date1.toLocaleDateString(undefined, options2);

  return (
    <>
      <div
        className={`job-list-two ${
          style_2 ? "style-two" : ""
        } position-relative `}
      >
        <div className="cursor-pointer">
          {/* <div className="d-flex action-dots justify-content-end d-flex float-end ">
            <button
              className="action-btn dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span>
                <ActionDropdown id={item?._id} />
              </span>
            </button>
          </div> */}
          <div className=" text-center mb-3"
          style={{fontSize:'large', color:'#31795A', fontWeight:'900'}}>
            {item.productModel}
          </div>
          <div className="d-flex align-items-center  mt-auto mb-3">
          Customer Name:
            <div
              className="job-location d-flex ms-1 text-decoration-underline "
              style={{  fontWeight: "500" }}
            >
              {/* <div onClick={() => handleViewClick(item._id)}> */}
               {item?.user?.firstName} {item?.user?.lastName}
            </div>
          </div>
          <div className="d-flex">
          Order Id: 
          <div
            // onClick={() => handleViewClick(item._id)}
            className=" fw-500 tran3s mb-3 ms-1"
            >
            {item.razorpayOrderId}
          </div>
            </div>
            <div className="d-flex ">
          Payment Id:
          <div
            // onClick={() => handleViewClick(item._id)}
            className=" fw-500 tran3s mb-3 ms-1"
          >
             {item.razorpayPaymentId}
          </div>
          </div>
          <div className="mb-3 d-flex">
          Purchase Amount:
            <span className=" fw-500 text-dark ms-1">
              {item.amount} {item.currency} {item.duration}
              {/* {`${item?.description?.slice(0, 20)} ${item?.description?.length > 20 ? ".." : ""}`} */}
            </span>
          </div>
                   
          <div  className="d-flex align-items-center  mt-3">
            Purchased On:
            <div  className=" tran3s  fw-500 p-2 ms-1 text-decoration-underline  "
            // style={{ background:'#31795A', color:'#fff', borderRadius:'15px'}}
            >
             {readableStrings}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentGridItem;
