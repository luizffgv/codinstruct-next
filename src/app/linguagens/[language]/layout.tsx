import Sidebar from "@components/sidebar";
import { contentMetadata } from "@scripts/content-metadata";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Sidebar metadata={contentMetadata}></Sidebar>
      <main>{children}</main>
    </>
  );
}
