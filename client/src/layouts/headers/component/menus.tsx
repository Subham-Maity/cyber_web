"use client";
import React, { useState } from "react";
import menu_data from "@/data/menu-data";
import { employ_menu_data } from "@/data/menu-data";
import Link from "next/link";
import { useAppSelector } from "@/redux/hook";
import { IMenuData } from "@/types/menu-data-type";
import { usePathname } from "next/navigation";

const Menus = () => {
  const pathname = usePathname();
  const handleOnClick = () => {};
  const { userRole } = useAppSelector((state) => state.persistedReducer.user);
  let menuData: IMenuData[] | null = null;
  if (userRole === "employer") menuData = employ_menu_data;
  else menuData = menu_data;

  return (
    <>
      {menuData?.map((menu) =>
        menu.sub_menus ? (
          <div
            key={menu.id}
            className={`nav-item  ${
              menu.title === "Dashboard" ? "dashboard-menu" : ""
            }`}
          >
            <Link
              className={`${
                pathname.includes(menu.link) ? "curr-nav-link" : ""
              } nav-link  dropdown-toggle`}
              href={menu.link}
              role="button"
            >
              {menu.title}
            </Link>
            {/* <ul className="dropdown-menu">
              {menu.sub_menus.map((s, i) => (
                <li key={i}>
                  <Link href={s.link} className="dropdown-item">
                    <span>{s.title}</span>
                  </Link>
                </li>
              ))}
            </ul> */}
          </div>
        ) : menu.mega_menus ? (
          <li key={menu.id} className="nav-item dropdown mega-dropdown-sm">
            <a
              className="nav-link curr-nav-link  dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              data-bs-auto-close="outside"
              aria-expanded="false"
            >
              {menu.title}
            </a>
            <ul className="dropdown-menu">
              <li className="row gx-1">
                {menu.mega_menus.map((m) => (
                  <div key={m.id} className="col-md-4">
                    <div className="menu-column">
                      <h6 className="mega-menu-title">{m.title}</h6>
                      <ul className="style-none mega-dropdown-list">
                        {m.sub_menus.map((ms, i) => (
                          <li key={i}>
                            <Link href={ms.link} className="dropdown-item">
                              <span>{ms.title}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </li>
            </ul>
          </li>
        ) : (
          <li key={menu.id} className="nav-item">
            <Link className="nav-link" href="/contact" role="button">
              {menu.title}
            </Link>
          </li>
        )
      )}
    </>
  );
};

export default Menus;
