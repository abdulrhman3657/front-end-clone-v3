import React, { useEffect, useState } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router";
import UserProfile from "../../Component/UserProfile";
import { IoClose } from "react-icons/io5";
import { fullLogo } from "../../public/ExporImage";
import { getCurrentUser } from "../../services/auth.service";

const navigation = [
  { name: "Explore", to: "/AllIdeas" },
  { name: "Venture Board", to: "/venture-board" },
  { name: "Watch Meeting", to: "/watchMeeting" },
  { name: "My Ideas", to: "/MyIdeas" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Nav() {
  const location = useLocation();
  const [showProfile, setShowProfile] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const fetchUser = async () => {
    try {
      const user = await getCurrentUser();
      setCurrentUser(user);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleProfileUpdate = async () => {
    await fetchUser();
  };

  return (
    <>
      {/* NAVBAR */}
      <Disclosure as="nav" className="bg-white border-b border-gray-300  max-w-screen">
        <div className=" py-1 max-w-7xl px-4 sm:px-6 lg:px-4 ">
          <div className="flex h-16 items-center justify-between">
            <div className="flex w-full justify-between items-center">
              <div className="flex items-center">
                {/* <p className="text-2xl font-bold text-[#1E40AF]">
                  Startup Arena
                </p> */}
                <Link to="/">
                  <img src={fullLogo} alt="" className="h-15" />
                </Link>
              </div>

              <div className="hidden sm:flex space-x-6">
                {navigation.map((item) => {
                  const isActive = location.pathname === item.to;
                  return (
                    <Link
                      key={item.name}
                      to={item.to}
                      aria-current={isActive ? "page" : undefined}
                      className={classNames(
                        isActive
                          ? "underline text-[#1E40AF]"
                          : "text-gray-800 hover:underline hover:text-[#1E40AF]",
                        "rounded-md px-3 py-2 text-sm font-medium transition transform duration-300 ease-in-out hover:scale-103 "
                      )}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </div>

              {/* USER BUTTON */}
              <div className="flex items-center">
                <Menu as="div" className="relative ml-3">
                  {currentUser ? (
                    <MenuButton
                      onClick={() => setShowProfile(true)}
                      className="flex items-center rounded-full focus:outline-none focus:ring-2 focus:ring-[#1E40AF]"
                    >
                      <span className="sr-only">Open user menu</span>
                      <div className="flex items-center gap-5">
                        {currentUser?.role === "founder" && (
                          <div>
                            <Link
                              to={"/submitIdea"}
                              className="bg-[#1E40AF] text-white px-4 py-2 text-sm rounded-md font-medium hover:bg-blue-900"
                            >
                              Add Idea +
                            </Link>
                          </div>
                        )}
                        <div className="w-10">
                          <img
                            src={ currentUser?.profilePic || "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png" }
                            alt="Profile"
                            className="w-10 h-10 rounded-full object-cover ring-4 ring-blue-300 shadow-md"
                          />
                        </div>
                      </div>
                    </MenuButton>
                  ) : (
                    <Link to="/signin">Sign in</Link>
                  )}
                </Menu>
              </div>
            </div>

            <div className="sm:hidden flex items-center">
              <DisclosureButton className="group inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1E40AF]">
                <span className="sr-only">Open main menu</span>
                <Bars3Icon
                  className="block size-6 group-data-open:hidden"
                  aria-hidden="true"
                />
                <XMarkIcon
                  className="hidden size-6 group-data-open:block"
                  aria-hidden="true"
                />
              </DisclosureButton>
            </div>
          </div>
        </div>

        <DisclosurePanel className="sm:hidden">
          <div className="space-y-1 px-2 pt-2 pb-3">
            {navigation.map((item) => {
              const isActive = location.pathname === item.to;
              return (
                <Link
                  key={item.name}
                  to={item.to}
                  aria-current={isActive ? "page" : undefined}
                  className={classNames(
                    isActive
                      ? "bg-[#1E40AF] text-white"
                      : "text-gray-800 hover:bg-gray-200 font-extrabold hover:text-[#1E40AF]",
                    "block rounded-md px-3 py-2 text-base font-medium transition "
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
            <Link
              to={"/submitIdea"}
              className="bg-yellow-400 text-white px-1 py-2  text-sm rounded-md hover:bg-yellow-500"
            >
              Add Idea +
            </Link>
          </div>
        </DisclosurePanel>
      </Disclosure>

      {showProfile && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
          <div className="relative">
            <button
              className="absolute -top-4 -right-4 bg-white text-[#1E40AF] rounded-full p-1 shadow"
              onClick={() => setShowProfile(false)}
            >
              <IoClose />
            </button>
            <UserProfile onUpdate={handleProfileUpdate} />
          </div>
        </div>
      )}
    </>
  );
}

export default Nav;