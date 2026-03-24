/**
 * RECIPE: How to Add a New Dvar Torah
 *
 * Step 1: Create the Markdown Content File
 *   - Create a new .md file in the `public/torah/` directory
 *   - Name it descriptively, e.g., `parshat-bereishis-101025.md`
 *   - Write your Dvar Torah content in Markdown format
 *   - Start with a # heading for the title
 *   - Use standard Markdown: ## for subheadings, - for lists, **bold**, *italic*, etc.
 *
 * Step 2: Add Entry to DivreiTorah Array
 *   - Add a new object to the DivreiTorah array below
 *   - Required fields:
 *     - id: unique number (increment from highest existing)
 *     - title: string (should match the # heading in your markdown)
 *     - date: string in format "Month DD, YYYY" (e.g., "October 10, 2025")
 *     - source: string ending in ".md" (must match filename in public/torah/)
 *
 * Step 3: Test the New Dvar Torah
 *   - Run `npm run build` to ensure no errors
 *   - Visit /torah to see the new card in the grid
 *   - Click the card to view the full content at /torah/{id}
 *
 * Example Entry:
 * {
 *   id: 2,
 *   title: "Parshat Bereishis: The Power of Words",
 *   date: "October 10, 2025",
 *   source: "parshat-bereishis-101025.md"
 * }
 */
import type { DvarTorahProps } from "./types";

export const DivreiTorah: DvarTorahProps[] = [
  {
    id: 100425,
    title: "Parshat Ha'azinu - Surviving Snakes and Scorpions",
    date: "October 5, 2025",
    source: "parshat-haazinu-100425.md"
  }
];

export function getDvarTorahById(id: number): DvarTorahProps | undefined {
  return DivreiTorah.find((dvar) => dvar.id === id);
}

export function getAllDivreiTorah(): DvarTorahProps[] {
  return DivreiTorah;
}
