import { metadata } from "@scripts/content-metadata";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.main}>
      <p>
        <strong>Essa página está em construção</strong>
      </p>
      <p>
        codinStruct é um projeto que visa ajudar estudantes a aprender novas
        linguagens de programação.
      </p>
      <p>
        Veja nossa organização no GitHub{" "}
        <Link href="https://github.com/codinStruct">aqui</Link>.
      </p>
      <p>Escolha uma linguagem para ler sobre:</p>
      <ul>
        {metadata.languages.map((language) => (
          <li key={language.path}>
            <Link
              href={`/linguagens/${language.path}/${language.categories[0].path}/${language.categories[0].pages[0].path}`}
            >
              {language.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
