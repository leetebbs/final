import React from "react";
import Logo from "../assets/rafflit-1.png";
import eth from "../assets/ethlogo.png";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import "flowbite";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex items-center lg:justify-between w-[97%] ">
      <Link to="/">
        <img
          className="w-[60px] h-[60px] lg:w-[200px] lg:h-[100px]  w-[50px] h-[50px]"
          src="https://images.cooltext.com/5656299.png"
          alt=""
        />
      </Link>

      <div className="flex mx-7 lg:flex-row lg:gap-4 lg:ml-[60px]">
        <button className="btn rounded-lg">
          <Link to="/create">Create</Link>
        </button>

        <button
          id="dropdownDefaultButton"
          data-dropdown-toggle="dropdown"
          class=" hover:text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center"
          type="button"
        >
          Explore{" "}
          <svg
            class="w-4 h-4 ml-2"
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </button>

        <div
          id="dropdown"
          class="z-10 hidden bg-[#6e329c]  divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
        >
          <ul
            class="py-2 text-sm text-white dark:text-gray-200"
            aria-labelledby="dropdownDefaultButton"
          >
            <li>
              <Link to="/">
                <p class="block px-4 py-2 hover:bg-[#3ec7e0]">Home</p>
              </Link>
            </li>
            <li>
              <Link to="/active">
                <p class="block px-4 py-2 hover:bg-[#3ec7e0] ">
                  Active Raffles
                </p>
              </Link>
            </li>
            <li>
              <Link to="/dashboard">
                <p class="block px-4 py-2 hover:bg-[#3ec7e0] ">Dashboard</p>
              </Link>
            </li>
            <li>
              <Link to="/winners">
                <p class="block px-4 py-2 hover:bg-[#3ec7e0] ">Winners</p>
              </Link>
            </li>
            <li>
              <Link to="/works">
                <p class="block px-4 py-2 hover:bg-[#3ec7e0] ">How it works</p>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <ConnectButton.Custom>
          {({
            account,
            chain,
            openAccountModal,
            openChainModal,
            openConnectModal,
            authenticationStatus,
            mounted,
          }) => {
            // Note: If your app doesn't use authentication, you
            // can remove all 'authenticationStatus' checks
            const ready = mounted && authenticationStatus !== "loading";
            const connected =
              ready &&
              account &&
              chain &&
              (!authenticationStatus ||
                authenticationStatus === "authenticated");

            return (
              <div
                {...(!ready && {
                  "aria-hidden": true,
                  style: {
                    opacity: 0,
                    pointerEvents: "none",
                    userSelect: "none",
                  },
                })}
              >
                {(() => {
                  if (!connected) {
                    return (
                      <button
                        onClick={openConnectModal}
                        type="button"
                        className="bg-gradient-to-r from-[#6e329c] to-[#4C0959] text-white w-[80px] rounded-lg px-1 "
                      >
                        Connect
                      </button>
                    );
                  }

                  if (chain.unsupported) {
                    return (
                      <button onClick={openChainModal} type="button">
                        Wrong network
                      </button>
                    );
                  }

                  return (
                    <div style={{ display: "flex", gap: 12 }}>
                      <button
                        onClick={openChainModal}
                        style={{ display: "flex", alignItems: "center" }}
                        type="button"
                      >
                        {chain.hasIcon && (
                          <div
                            style={{
                              background: chain.iconBackground,
                              width: 30,
                              height: 30,
                              borderRadius: 999,
                              overflow: "hidden",
                              marginRight: 4,
                            }}
                          >
                            {chain.iconUrl && (
                              <img
                                alt={chain.name ?? "Chain icon"}
                                src={chain.iconUrl}
                                style={{ width: 30, height: 30 }}
                              />
                            )}
                          </div>
                        )}
                        {/* {chain.name} */}
                      </button>

                      <button
                        className="text-[10px] lg:text-[15px]"
                        onClick={openAccountModal}
                        type="button"
                      >
                        {account.displayName}
                        {account.displayBalance
                          ? ` (${account.displayBalance})`
                          : ""}
                      </button>
                    </div>
                  );
                })()}
              </div>
            );
          }}
        </ConnectButton.Custom>
      </div>
    </div>
  );
};

export default Navbar;
