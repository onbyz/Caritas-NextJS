import { defineField, defineType } from "sanity";

export const post = defineType({
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "category",
      type: "string",
      options: {
        list: [
          { title: "News & Events", value: "news" },
          { title: "Article", value: "article" },
          { title: "CSR", value: "csr" },
        ],
      },
    }),
    defineField({ name: "excerpt", type: "text" }),
    defineField({ name: "mainImage", type: "image" }),
    defineField({ name: "body", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "publishedAt", type: "datetime" }),
    defineField({
      name: "department",
      type: "reference",
      to: [{ type: "department" }],
    }),
    defineField({ name: "seoTitle", type: "string" }),
    defineField({ name: "seoDescription", type: "text" }),
  ],
});
