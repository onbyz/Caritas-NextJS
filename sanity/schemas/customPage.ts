import { defineField, defineType } from "sanity";

/** Landing pages like International Patients — editable in Sanity */
export const customPage = defineType({
  name: "customPage",
  title: "Custom Page",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({ name: "subtitle", type: "string" }),
    defineField({ name: "heroImage", type: "image" }),
    defineField({
      name: "navItems",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "id", type: "string" },
            { name: "label", type: "string" },
          ],
        },
      ],
    }),
    defineField({
      name: "sections",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "sectionId", type: "string" },
            { name: "heading", type: "string" },
            { name: "body", type: "text" },
            { name: "html", type: "text", title: "HTML block (advanced)" },
            { name: "background", type: "string" },
          ],
        },
      ],
    }),
  ],
});
