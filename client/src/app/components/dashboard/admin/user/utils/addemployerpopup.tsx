import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import * as Yup from "yup"; //validation
import { Resolver, useForm } from "react-hook-form"; // form logic made easy
import ErrorMsg from "@/app/components/common/error-msg";
import icon from "@/assets/images/icon/icon_60.svg";
import { useDispatch } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { createEmployer } from "@/redux/features/admin/api";

type IFormData = {
  fullName: string;
  email: string;
  password: string;
};

// schema
const schema = Yup.object().shape({
  fullName: Yup.string().required("Full Name is required").label("Full Name"),
  email: Yup.string().required("email is required,1234").email().label("Email"),
  password: Yup.string().required().min(8).label("Password"),
});

const CreateEmployerModal = () => {
  const dispatch = useDispatch();
  const [showPass, setShowPass] = useState<boolean>(false);
  const modalRef = useRef(null);

  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormData>({ resolver: yupResolver(schema) });
  // on submit
  const onSubmit = async (data: IFormData) => {
    const bodyObj = {
      name: data.fullName,
      ...data,
    };
    await createEmployer(dispatch, bodyObj);
    console.log(data);
    reset();
  };

  return (
    <div
      className="modal fade"
      id="createEmployerModal"
      tabIndex={-1}
      ref={modalRef}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-fullscreen modal-dialog-centered">
        <div className="container">
          <div className="user-data-form modal-content">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
            <div className="text-center">
              <p>Create an account for and employer</p>
            </div>
            <div className="form-wrapper m-auto">
              <form onSubmit={handleSubmit(onSubmit)} className="mt-10">
                <div className="row">
                  <div className="col-12">
                    <div className="input-group-meta position-relative mb-25">
                      <label>Full Name*</label>
                      <input
                        type="string"
                        placeholder="john doe"
                        {...register("fullName", {
                          required: `Full Name is required!`,
                        })}
                        name="fullName"
                      />
                      <div className="help-block with-errors">
                        <ErrorMsg msg={errors.fullName?.message!} />
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="input-group-meta position-relative mb-25">
                      <label>Email*</label>
                      <input
                        type="email"
                        placeholder="james@example.com"
                        {...register("email", {
                          required: `Email is required!`,
                        })}
                        name="email"
                      />
                      <div className="help-block with-errors">
                        <ErrorMsg msg={errors.email?.message!} />
                      </div>
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="input-group-meta position-relative mb-20">
                      <label>Password*</label>
                      <input
                        type={`${showPass ? "text" : "password"}`}
                        placeholder="Enter Password"
                        className="pass_log_id"
                        {...register("password", {
                          required: `Password is required!`,
                        })}
                        name="password"
                      />
                      <span
                        className="placeholder_icon"
                        onClick={() => setShowPass(!showPass)}
                      >
                        <span
                          className={`passVicon ${showPass ? "eye-slash" : ""}`}
                        >
                          <Image src={icon} alt="icon" />
                        </span>
                      </span>
                      <div className="help-block with-errors">
                        <ErrorMsg msg={errors.password?.message!} />
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <button
                      type="submit"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                      className="btn-eleven fw-500 tran3s d-block mt-20"
                    >
                      Create
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEmployerModal;
