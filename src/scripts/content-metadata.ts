import { XMLParser } from "fast-xml-parser";
import { readFileSync } from "node:fs";
import { z } from "zod";

const PAGE_SCHEMA = z
  .object({
    "@_title": z.string(),
    "@_path": z.string(),
  })
  .transform((page) => ({
    title: page["@_title"],
    path: page["@_path"],
  }));
export type PageMetadata = z.infer<typeof PAGE_SCHEMA>;

const CATEGORY_SCHEMA = z
  .object({
    "@_title": z.string(),
    "@_path": z.string(),
    page: z.array(PAGE_SCHEMA),
  })
  .transform((category) => ({
    title: category["@_title"],
    path: category["@_path"],
    pages: category.page,
  }));

export type CategoryMetadata = z.infer<typeof CATEGORY_SCHEMA>;

const LANGUAGE_SCHEMA = z
  .object({
    "@_title": z.string(),
    "@_path": z.string(),
    description: z.string(),
    category: z.array(CATEGORY_SCHEMA),
  })
  .transform((language) => ({
    title: language["@_title"],
    path: language["@_path"],
    description: language.description,
    categories: language.category,
  }));
export type LanguageMetadata = z.infer<typeof LANGUAGE_SCHEMA>;

const METADATA_SCHEMA = z
  .object({
    main: z.object({
      language: z.array(LANGUAGE_SCHEMA),
    }),
  })
  .transform((object) => ({ languages: object.main.language }));
export type Metadata = z.infer<typeof METADATA_SCHEMA>;

function getMetadata(): Metadata {
  const METADATA_PATH = "codinStruct-content/estrutura.xml";

  const content = readFileSync(METADATA_PATH, { encoding: "utf8" });

  const parser = new XMLParser({
    ignoreAttributes: false,
    isArray: (name) => {
      return ["category", "page"].includes(name);
    },
  });

  return METADATA_SCHEMA.parse(parser.parse(content));
}

/** Path where you can access content using the paths provided in metadata. */
export const contentPath = "codinStruct-content/Content";

/** Metadata about all the content for each available language. */
export const contentMetadata = getMetadata();
