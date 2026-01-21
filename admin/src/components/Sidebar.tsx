import React from "react";
import type { SidebarItemsType } from "../types/index.ts";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets.ts";
import { useAppContext } from "../context/AppContext.tsx";

const Sidebar = () => {
  const { aToken } = useAppContext();
  const sidbarItems: SidebarItemsType[] = [
    { path: "/dashboard", lable: "Dashboard", image: assets.home_icon },
    {
      path: "/appointments",
      lable: "Appointments",
      image: assets.appointment_icon,
    },
    { path: "/add-doctor", lable: "Add a Doctor", image: assets.add_icon },
    { path: "/doctors", lable: "Doctors List", image: assets.people_icon },
  ];
  return (
    aToken && (
      <div className="w-full max-w-[100px] md:max-w-[250px] flex flex-col items-start gap-2 py-2 bg-white   min-h-screen border-r border-gray-300">
        {sidbarItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={`w-full flex flex-row items-center gap-4 pl-8 py-1 transition-all duration-100`}
          >
            <img src={item.image} className="w-9" alt={item.lable + " image"} />
            <p className="hidden md:block text-sm text-gray-500">
              {item.lable}
            </p>
          </NavLink>
        ))}
      </div>
    )
  );
};

export default Sidebar;
