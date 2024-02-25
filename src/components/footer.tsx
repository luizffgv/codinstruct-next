import Link from "next/link";
import styles from "./footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.paragraph}>
        codinStruct é um projeto que visa ajudar estudantes a aprender novas
        linguagens de programação.
      </p>
      <p className={styles.paragraph}>
        Veja nossa{" "}
        <Link href="https://github.com/codinStruct">organização no GitHub</Link>
        .
      </p>
      <p className={styles.paragraph}>
        Veja o{" "}
        <Link href="https://github.com/luizffgv/codinstruct-next">
          código-fonte do site
        </Link>
        .
      </p>
    </footer>
  );
}
