import path from "node:path";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import styles from "./page.module.css";
import { Prism } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { contentPath, metadata } from "@/scripts/content-metadata";
import { readFile } from "node:fs/promises";
import rehypeRaw from "rehype-raw";

export function generateStaticParams() {
  return metadata.languages.flatMap((language) =>
    language.categories.flatMap((category) =>
      category.pages.map((page) => ({
        language: language.path,
        category: category.path,
        page: page.path,
      }))
    )
  );
}

export default async function Page({
  params: { language, category, page },
}: {
  params: { language: string; category: string; page: string };
}) {
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
    </div>
  );
}
