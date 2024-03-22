"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import Menus from "./component/menus";
import logo from "@/assets/images/logo/CL_Logo.png";
import icon from "@/assets/images/fav-icon/icon.png";
import userLogo from "@/assets/images/logo/user-icon.png";
import CategoryDropdown from "./component/category-dropdown";
import LoginModal from "@/app/components/common/popup/login-modal";
import useSticky from "@/hooks/use-sticky";
import { useAppSelector, useAppDispatch } from "@/redux/hook";
import { logoutAdmin } from "@/redux/features/user/api";

const Header = () => {
  const { sticky } = useSticky();
  const { isAuthenticated, userRole, avatar, name } = useAppSelector(
    (state) => state.persistedReducer.user
  );

  const dispatch = useAppDispatch();
  const handleLogout = async () => {
    await logoutAdmin(dispatch);
  };

  

  return (
    <>
      <header
        style={{ backgroundColor: "#244034" }}
        className={`theme-main-menu menu-overlay menu-style-one sticky-menu ${
          sticky ? "fixed" : ""
        }`}
      >
      {/* <header
        style={{ backgroundColor: "#244034", height: `${sticky ? "80px" : "100px"}` }}
        className={`theme-main-menu menu-overlay menu-style-one sticky-menu ${
          sticky ? "fixed" : "static"
        }`}
      > */}
        <div className="inner-content position-relative">
          <div className="top-header">
            <div className="d-flex align-items-center">
              <div className="logo d-none d-sm-block order-lg-0">
                <Link href="/" className="d-flex align-items-center">
                  <Image src={logo} alt="logo" priority />
                </Link>
              </div>
              <div className="logo d-sm-none order-lg-0">
                <Link href="/" className="d-flex align-items-center">
                  <Image src={icon} alt="logo" priority />
                </Link>
              </div>
              <div className="right-widget ms-auto order-lg-3">
                <ul className="d-flex align-items-center style-none">
                  {isAuthenticated && (
                    <li className="d-flex d-md-block">
                      <Link
                        href={`dashboard/${userRole}-dashboard`}
                        className="job-post-btn tran3s"
                      >
                        Dashboard
                      </Link>
                    </li>
                  )}
                  {isAuthenticated ? (
                    <li className="d-none d-md-block">
                      <button onClick={handleLogout} className="login-btn-one">
                        Logout
                      </button>
                    </li>
                  ) : (
                    <li>
                      <a
                        href="#"
                        className="login-btn-one"
                        data-bs-toggle="modal"
                        data-bs-target="#loginModal"
                      >
                        Login
                      </a>
                    </li>
                  )}
                  {isAuthenticated && (
                    <li
                      style={{ width: "50px", height: "50px" , marginRight:'10px'}}
                      className="rounded user-avatar rounded-circle "
                    >
                      <Image
                        src={avatar && avatar !== "none" ? avatar : userLogo}
                        alt="avatar"
                        width={50}
                        height={50}
                        className="lazy-img rounded-circle "
                        // style={{ height: "auto" }}
                      />
                      {/* <span className="login-btn-one ms-3">{name}</span> */}
                    </li>
                  )}
                  {userRole && userRole !== "candidate" && (
                    <li className="d-none d-md-block ">
                      <Link href="/candidates-v1" className="btn-one">
                        Hire Top Talents
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
              <nav className="navbar navbar-expand-lg p0 ms-sm-2 order-lg-2">
                <button
                  className="navbar-toggler d-block d-lg-none"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarNav"
                  aria-controls="navbarNav"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                  <ul className="navbar-nav align-items-lg-center">
                    <li className="d-block d-lg-none">
                      <div className="logo">
                        <Link href="/" className="d-block">
                          <Image src={logo} alt="logo" width={100} priority />
                        </Link>
                      </div>
                    </li>
                    {userRole && userRole !== "candidate" && (
                    <li className="d-block d-md-none mb-3">
                      <Link href="/candidates-v1" className="btn-one">
                        Hire Top Talents
                      </Link>
                    </li>
                  )}
                   
                    {/* <li className="nav-item dropdown category-btn mega-dropdown-sm">
                      <a
                        className="nav-link dropdown-toggle"
                        href="#"
                        role="button"
                        data-bs-toggle="dropdown"
                        data-bs-auto-close="outside"
                        aria-expanded="false"
                      >
                        <i className="bi bi-grid-fill"></i> Category
                      </a>
                      {/* CategoryDropdown start */}
                      {/* <CategoryDropdown /> */}
                      {/* CategoryDropdown end *
                    </li> */}
                    {/* menus start */}
                    <Menus />
                    {isAuthenticated && (
                    <li className="d-block d-md-none mt-3">
                      <button onClick={handleLogout} className="login-btn-one">
                        Logout
                      </button>
                    </li>
                  )}
                    
                    {/* menus end */}
                    {/* <li className="d-md-none">
                      <Link href="/register" className="job-post-btn tran3s">
                        Post Job
                      </Link>
                    </li>
                    <li className="d-md-none">
                      <Link href="/candidates-v1" className="btn-one w-100">
                        Hire Top Talents
                      </Link>
                    </li> */}
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* login modal start */}
      <LoginModal />
      {/* login modal end */}
    </>
  );
};

export default Header;
