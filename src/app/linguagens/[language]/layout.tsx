import Sidebar from "@components/sidebar";
import { metadata } from "@scripts/content-metadata";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Sidebar metadata={metadata}></Sidebar>
      <main>{children}</main>
    </>
  );
}
