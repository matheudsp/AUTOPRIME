import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import { ReactNode } from "react";

export default function VehicleLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <div className="flex-grow">{children}</div>
      <Footer />
    </div>
  );
}
