import { defineField, defineType } from "sanity";

export const heroSlide = defineType({
  name: "heroSlide",
  title: "Hero Slide",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string" }),
    defineField({ name: "description", type: "text" }),
    defineField({ name: "desktopImage", type: "image", validation: (r) => r.required() }),
    defineField({ name: "mobileImage", type: "image" }),
    defineField({ name: "ctaLabel", type: "string" }),
    defineField({ name: "ctaHref", type: "string" }),
    defineField({ name: "order", type: "number" }),
    defineField({ name: "isActive", type: "boolean", initialValue: true }),
  ],
  orderings: [{ title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
});
