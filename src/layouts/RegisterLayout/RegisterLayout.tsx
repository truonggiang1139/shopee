import React from "react";
import Footer from "src/components/Footer";
import RegisterHeader from "src/components/RegisterHeader";

type PropsType = {
  children: React.ReactNode;
};
export default function RegisterLayout({ children }: PropsType) {
  return (
    <div>
      <RegisterHeader />
      {children}
      <Footer />
    </div>
  );
}
