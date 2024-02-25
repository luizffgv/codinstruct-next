import path from "node:path";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import styles from "./page.module.css";
import { Prism } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { contentPath, contentMetadata } from "@/scripts/content-metadata";
import { readFile } from "node:fs/promises";
import rehypeRaw from "rehype-raw";
import Link from "next/link";
import { Metadata } from "next";

type Props = {
  params: {
    language: string;
    category: string;
    page: string;
  };
};

export function generateStaticParams() {
  return contentMetadata.languages.flatMap((language) =>
    language.categories.flatMap((category) =>
      category.pages.map((page) => ({
        language: language.path,
        category: category.path,
        page: page.path,
      }))
    )
  );
}

export function generateMetadata({
  params: { language, category, page },
}: Props): Metadata {
  const languageMetadata = contentMetadata.languages.find(
    ({ path }) => language == path
  );
  if (languageMetadata == undefined)
    throw new TypeError("Language metadata is undefined.");

  const categoryMetadata = languageMetadata.categories.find(
    ({ path }) => category == path
  );
  if (categoryMetadata == undefined)
    throw new TypeError("Category metadata is undefined.");

  const pageMetadata = categoryMetadata.pages.find(({ path }) => page == path);
  if (pageMetadata == undefined)
    throw new TypeError("Page metadata is undefined.");

  return {
    title: `${languageMetadata.title} — ${pageMetadata.title}`,
    description: `Aprenda sobre ${languageMetadata.title} aqui.`,
  };
}

export default async function Page({
  params: { language, category, page },
}: Props) {
  const pagePath = path.join(contentPath, language, category, `${page}.md`);

  const markdown = await readFile(pagePath, { encoding: "utf8" });

  return (
    <div className={styles.content}>
      <Markdown
        remarkPlugins={[remarkGfm]}
        remarkRehypeOptions={{ allowDangerousHtml: true }}
        rehypePlugins={[rehypeRaw]}
        components={{
          code({ children, className }) {
            const languageMatch = /language-(\w+)/.exec(className ?? "");
            if (languageMatch)
              return (
                <Prism
                  language={languageMatch[1]}
                  style={vscDarkPlus}
                  useInlineStyles={false}
                  // We don't add a <pre> so there aren't two layers of <pre>
                  PreTag={({ children }) => children}
                  // This overrides the inline styles of the default <code>
                  CodeTag={({ children }) => <code>{children}</code>}
                >
                  {String(children).trim()}
                </Prism>
              );
            else return <code className={className}>{children}</code>;
          },

          table({ children }) {
            return (
              <div className={styles["table-container"]}>
                <table>{children}</table>
              </div>
            );
          },
        }}
      >
        {markdown}
      </Markdown>
      <small>
        Conteúdo escrito pela organização codinStruct, disponível pela licença{" "}
        <Link href="https://creativecommons.org/licenses/by-sa/4.0/deed.en">
          CC BY-SA 4.0
        </Link>
        . Veja o{" "}
        <Link href="https://github.com/codinStruct/codinStruct-content">
          repositório original do conteúdo
        </Link>
        .
      </small>
    </div>
  );
}
