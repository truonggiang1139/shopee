import React from "react";

export default function Footer() {
  return (
    <footer className="bg-neutral-100 py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid-cols grid gap-4 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <div>© 2023 Shopee. Tất cả các quyền được bảo lưu.</div>
          </div>
          <div className="lg:col-span-2">
            <div>
              Quốc gia & Khu vực: Singapore Indonesia Đài Loan Thái Lan Malaysia Việt Nam Philippines Brazil México
              Colombia Chile
            </div>
          </div>
        </div>
        <div className="mt-10 text-center text-sm"></div>
      </div>
    </footer>
  );
}
