import type { SidebarItemsType } from "../types/index.ts";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets.ts";
import { useDoctorContext } from "../context/DoctorContext.tsx";
import { useAdminContext } from "../context/AdminContext.tsx";

const Sidebar = () => {
  const { dToken } = useDoctorContext();
  const { aToken } = useAdminContext();
  const sidbarItems: SidebarItemsType[] = aToken
    ? [
        { path: "/dashboard", label: "Dashboard", image: assets.home_icon },
        {
          path: "/appointments",
          label: "Appointments",
          image: assets.appointment_icon,
        },
        { path: "/add-doctor", label: "Add a Doctor", image: assets.add_icon },
        { path: "/doctors", label: "Doctors List", image: assets.people_icon },
      ]
    : dToken
      ? [
          { path: "/dashboard", label: "Dashboard", image: assets.home_icon },
          {
            path: "/appointments",
            label: "Appointments",
            image: assets.appointment_icon,
          },
          { path: "/profile", label: "Profile", image: assets.people_icon },
        ]
      : [];
  return (
    (aToken || dToken) && (
      <div className="w-full max-w-[100px] md:max-w-[250px] flex flex-col items-start gap-2 flex-shrink-0 py-2 bg-white   min-h-screen border-r border-gray-300">
        {sidbarItems.length > 0 &&
          sidbarItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={`w-full flex flex-row items-center gap-4 pl-8 py-1 transition-all duration-100`}
            >
              <img
                src={item.image}
                className="w-9"
                alt={item.label + " image"}
              />
              <p className="hidden md:block text-sm text-gray-500">
                {item.label}
              </p>
            </NavLink>
          ))}
      </div>
    )
  );
};

export default Sidebar;
