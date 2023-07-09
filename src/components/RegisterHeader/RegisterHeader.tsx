import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as ShopeeLogo } from "../../assets/shopeeLogo.svg";
export default function RegisterHeader() {
  return (
    <header className="bg-crimson py-5">
      <div className="mx-auto max-w-7xl px-4">
        <nav className="flex items-end">
          <Link to="/">
            <ShopeeLogo className="h-8 fill-crimson lg:h-11" />
          </Link>
          <div className="ml-5 text-xl text-white lg:text-2xl">Đăng ký</div>
        </nav>
      </div>
    </header>
  );
}
