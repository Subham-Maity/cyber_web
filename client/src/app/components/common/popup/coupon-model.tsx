import { isValidCoupon } from "@/redux/features/subscription/api";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { useState } from "react";

const CouponModel = () => {
  const dispatch = useAppDispatch();

  const [coupon, setCoupon] = useState<string>("");
  const { loading } = useAppSelector((s) => s.subscription);

  const handleApply = async () => {
    setCoupon("");
    console.log(coupon);
    try {
      await isValidCoupon(dispatch, coupon);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div
      className="modal fade"
      id="couponModal"
      tabIndex={-1}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-fullscreen modal-dialog-centered">
        <div className="container-fluid ">
          <div className="user-data-form modal-content">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
            <div className="text-center">
              <h3 className="mb-30"></h3>
            </div>
            <div className="form-wrapper m-auto container-fluid ">
              <div className="row">
                <label className="mb-2" htmlFor="">
                  Avail Discount
                </label>
                <input
                  type="text"
                  className="form-control col-6 "
                  name="coupon"
                  onChange={(e) => setCoupon(e.target.value)}
                />
              </div>
              <div>
                <button
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  className="btn btn-six mt-3"
                  onClick={handleApply}
                >
                  {loading ? "Validating..." : "Apply"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CouponModel;
