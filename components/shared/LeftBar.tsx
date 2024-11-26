"use client";

import { sidebarLinks } from "@/constants/index";
import { SignedIn, SignOutButton, useAuth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

function LeftBar() {
  const pathname = usePathname();
  const { userId } = useAuth();

  return (
    <section className="custom-scrollbar leftsidebar px-2 lg:px-6">
      <div className="flex flex-1 flex-col gap-2">
        {sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;

          if (link.route === "/profile") return;
          return (
            <Link
              href={link.route}
              key={link.label}
              className={
                "leftsidebar_link " +
                (isActive
                  ? "bg-primary-500"
                  : "hover:bg-primary-500 hover:bg-opacity-30")
              }
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={24}
                height={24}
              />
              <p className="text-light-1 max-lg:hidden">{link.label}</p>
            </Link>
          );
        })}
        {userId ? (
          <Link
            href={`${sidebarLinks[5].route}/${userId}`}
            key={sidebarLinks[5].label}
            className={
              "leftsidebar_link " +
              (pathname === `${sidebarLinks[5].route}/${userId}`
                ? "bg-primary-500"
                : "hover:bg-primary-500 hover:bg-opacity-30")
            }
          >
            <Image
              src={sidebarLinks[5].imgURL}
              alt={sidebarLinks[5].label}
              width={24}
              height={24}
            />
            <p className="text-light-1 max-lg:hidden">
              {sidebarLinks[5].label}
            </p>
          </Link>
        ) : (
          <div className="leftsidebar_link opacity-50">
            <Image
              src={sidebarLinks[5].imgURL}
              alt={sidebarLinks[5].label}
              width={24}
              height={24}
            />
            <p className="text-light-1 max-lg:hidden">
              {sidebarLinks[5].label}
            </p>
          </div>
        )}
      </div>
      <div className="mt-10">
        {userId ? (
          <SignedIn>
            <SignOutButton>
              <div className="flex cursor-pointer gap-4 p-4 rounded-lg hover:bg-primary-500 hover:bg-opacity-30">
                <Image
                  src="/assets/logout.svg"
                  alt="logout"
                  width={24}
                  height={24}
                />

                <p className="text-light-2 max-lg:hidden">Logout</p>
              </div>
            </SignOutButton>
          </SignedIn>
        ) : (
          <div className="flex opacity-50 gap-4 p-4">
            <Image
              src="/assets/logout.svg"
              alt="logout"
              width={24}
              height={24}
            />

            <p className="text-light-2 max-lg:hidden">Logout</p>
          </div>
        )}
      </div>
    </section>
  );
}
export default LeftBar;
