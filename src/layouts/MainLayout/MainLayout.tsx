import React from "react";
import Footer from "src/components/Footer";
import Header from "src/components/Header";

type PropsType = {
  children: React.ReactNode;
};
export default function MainLayout({ children }: PropsType) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
