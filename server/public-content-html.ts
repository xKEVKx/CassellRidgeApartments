import { COMMUNITY_SECTIONS, HOME_FAQS, STUDENT_ELIGIBILITY } from "@shared/public-content";

export function escapeContent(text: string): string {
  return text.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[character]!);
}

export const STUDENT_ELIGIBILITY_HTML = `
  <section aria-labelledby="students-heading">
    <h2 id="students-heading">Students</h2>
    <p>${escapeContent(STUDENT_ELIGIBILITY.introduction)}</p>
    <ul>${STUDENT_ELIGIBILITY.exceptions.map((exception) => `<li>${escapeContent(exception)}</li>`).join("")}</ul>
  </section>`;

export const HOME_FAQ_HTML = `
  <section aria-labelledby="faq-heading">
    <h2 id="faq-heading">Frequently Asked Questions</h2>
    ${HOME_FAQS.map(({ question, answer }) => `<h3>${escapeContent(question)}</h3><p>${escapeContent(answer)}</p>`).join("\n    ")}
  </section>`;

export const COMMUNITY_GUIDE_HTML = COMMUNITY_SECTIONS.map((section) => `
  <section aria-labelledby="${section.id}-heading">
    <h2 id="${section.id}-heading">${escapeContent(section.title)}</h2>
    <p>${escapeContent(section.subtitle)}</p>
    ${section.destinations.map(({ title, description }) => `<h3>${escapeContent(title)}</h3><p>${escapeContent(description)}</p>`).join("\n    ")}
  </section>`).join("\n");
