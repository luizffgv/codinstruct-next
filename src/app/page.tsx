import styles from "./page.module.css";
import Hero from "@components/hero";
import { contentMetadata } from "@scripts/content-metadata";
import LanguageBlock from "@/components/language-block";

export default function Home() {
  return (
    <main>
      <Hero className={styles.hero}>
        <h1 className={styles["welcome-title"]}>Bem-vindo ao codinStruct</h1>
        <p className={styles.subtitle}>Escolha uma linguagem para ler sobre</p>
        <ul className={styles.languages}>
          {contentMetadata.languages.map((language) => (
            <li key={language.path}>
              <LanguageBlock language={language}></LanguageBlock>
            </li>
          ))}
        </ul>
      </Hero>
    </main>
  );
}
