import Image from "next/image";
import styles from "./navbar.module.css";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Link href="/">
        <Image
          src="/assets/logo.svg"
          alt="codinStruct logo"
          width={128}
          height={32}
        ></Image>
      </Link>
    </nav>
  );
}
