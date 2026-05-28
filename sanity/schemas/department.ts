import { defineField, defineType } from "sanity";

export const department = defineType({
  name: "department",
  title: "Department",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "name" },
      validation: (r) => r.required(),
    }),
    defineField({ name: "heroTitle", type: "string" }),
    defineField({ name: "heroSubtitle", type: "text" }),
    defineField({ name: "bannerImage", type: "image" }),
    defineField({ name: "overviewHeading", type: "text" }),
    defineField({ name: "overviewImage", type: "image" }),
    defineField({
      name: "overviewParagraphs",
      type: "array",
      of: [{ type: "text" }],
    }),
    defineField({
      name: "overviewFooterParagraphs",
      type: "array",
      of: [{ type: "text" }],
    }),
    defineField({ name: "treatmentsIntro", type: "text" }),
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
      name: "treatments",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", type: "string" },
            { name: "content", type: "text" },
          ],
        },
      ],
    }),
    defineField({ name: "facilitiesIntro", type: "text" }),
    defineField({
      name: "facilitiesCol1",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "facilitiesCol2",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "doctorGroups",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "heading", type: "string" },
            {
              name: "doctors",
              type: "array",
              of: [{ type: "reference", to: [{ type: "doctor" }] }],
            },
          ],
        },
      ],
    }),
  ],
});
