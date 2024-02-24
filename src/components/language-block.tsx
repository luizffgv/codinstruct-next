import { LanguageMetadata } from "@scripts/content-metadata";
import Link from "next/link";
import styles from "./language-block.module.css";

/** A cliclable block that links to the main page of a language. */
export default function LanguageBlock({
  language,
}: {
  language: LanguageMetadata;
}) {
  return (
    <div className={styles.container}>
      <Link
        href={`linguagens/${language.path}/${language.categories[0].path}/${language.categories[0].pages[0].path}`}
        className={styles.link}
      >
        {language.title}
      </Link>
    </div>
  );
}
