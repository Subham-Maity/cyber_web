import React, { useState } from "react";
import { employ_deep_data } from "@/data/menu-data";
import Link from "next/link";
import { IMenuData } from "@/types/menu-data-type";

const DeepMenus = () => {
  let menuData: IMenuData[] = employ_deep_data;

  return (
    <>
      <ul className="deep-nav list-unstyled mb-0 d-flex text-secondary ">
        {menuData.map((obj, index) => {
          return (
            <li className="nav-item ">
              <h2 className="main-title m0">
              <Link style={{ color: "#31795A" }} className="" href={obj.link}>
                {obj.title}
              </Link>
              </h2>
            </li>
          );
        })}
      </ul>
      <button
        type="button"
        className="filter-btn fw-500 tran3s me-3"
        data-bs-toggle="modal"
        data-bs-target="#myJobPostForEmployerFilter"
      >
        <i className="bi bi-funnel"></i>
        Filter
      </button>
      
    </>
  );
};

export default DeepMenus;
