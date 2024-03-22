import express from 'express';
import { createCoupon, editCoupon, getAllCoupons, getCoupon, isValidCoupon } from '../controller/couponController';
const couponRouter = express.Router();

couponRouter.route("/create").post(createCoupon);
couponRouter.route("/edit/:id").patch(editCoupon);
couponRouter.route("/get/:id").get(getCoupon);
couponRouter.route("/getAll").get(getAllCoupons);
couponRouter.route("/isValid/:code").get(isValidCoupon);

export default couponRouter;






