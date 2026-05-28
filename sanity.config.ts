import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./sanity/schemas";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export default defineConfig({
  name: "caritas-hospital",
  title: "Caritas Hospital CMS",
  projectId,
  dataset,
  plugins: [structureTool()],
  schema: { types: schemaTypes },
});
