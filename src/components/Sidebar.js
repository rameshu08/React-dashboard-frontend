import React from "react";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Assignment, Group, Settings } from "@mui/icons-material";

const items = [
  {
    id: 1,
    name: "User Management",
    icon: <Group />,
    route: "/users",
    val: "/user",
  },

  {
    id: 2,
    name: "Settings",
    icon: <Settings />,
    route: "/settings",
    val: "/settings",
  },
  {
    id: 3,
    name: "Reports",
    icon: <Assignment />,
    route: "/reports",
    val: "/reports",
  }
];

const Sidebar = ({
  drawerOpen,
  setDrawerOpen,
  setShowMenubar,
  showMenubar,
}) => {
  return (
    <div
      className={`flex flex-col z-[4] h-screen overflow-hidden left-0 bottom-0 top-0 `}
    >
      <div className={`xs:flex xs:justify-between  xs:items-center bg-[#03045E] duration-300 ${drawerOpen ? "w-72" : "w-16  "}`}>
        <h1
          className={`mt-5 md:mt-3 font-bold text-center text-white ${
            drawerOpen ? "text-2xl" : "text-lg"
          } `}
        >
          ZUQO
        </h1>
      </div>
      <div
        className={` h-full duration-300 bg-[#03045E] pt-2
        ${drawerOpen ? "w-72 px-8" : "w-16 px-2"}
        `}
      >
        <div className={`${drawerOpen ? "flex justify-end w-full" : ""}`}>
          <IconButton
            onClick={() => setDrawerOpen(!drawerOpen)}
            className="text-[white] xs:hidden "
          >
            {drawerOpen ? (
              <ChevronLeftIcon className=" ml-auto text-[white] flex justify-end w-full" />
            ) : (
              <MenuIcon className="cursor-pointer  mr-2  text-[white]  block " />
            )}
          </IconButton>
        </div>
        <div
          className={`flex  flex-col   ${
            drawerOpen ? "" : "justify-center items-center  xs:items-start"
          }`}
        >
          {items.map((item) => (
                <div
                  className={`flex items-center py-2 text-lg font-semibold cursor-pointer text-white rounded-md mt-1.5`}
                  key={item.id}
                  title={item?.name}
                  onClick={() => {
                    showMenubar && setShowMenubar(false);
                  }}
                >
                  <div className="cursor-pointer text-xl mr-2 block float-left   xs:text-xl  ">
                    {item.icon}
                  </div>
                  <span
                    className={` flex-1 duration-200 text-lg pt-2 ${
                      !drawerOpen && "hidden "
                    }  `}
                  >
                    {item.name}
                  </span>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
