import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", title: "Site Title" }),
    defineField({ name: "description", type: "text", title: "Default Meta Description" }),
    defineField({ name: "ogImage", type: "image", title: "Default OG Image" }),
    defineField({
      name: "phoneNumbers",
      type: "object",
      fields: [
        { name: "ambulance", type: "string" },
        { name: "appointments", type: "string" },
        { name: "information", type: "string" },
        { name: "healthCheckup", type: "string" },
      ],
    }),
    defineField({
      name: "footerContent",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
});
