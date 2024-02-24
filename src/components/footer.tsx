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
        Veja nossa organização no GitHub{" "}
        <Link href="https://github.com/codinStruct">aqui</Link>.
      </p>
      <p className={styles.paragraph}>
        Veja o código-fonte do site{" "}
        <Link href="https://github.com/luizffgv/codinstruct-next">aqui</Link>.
      </p>
    </footer>
  );
}
