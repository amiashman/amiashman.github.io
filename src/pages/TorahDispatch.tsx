import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getDvarTorahById } from "../assets/divreitorah";
import FourZeroFour from "./FourZeroFour";
import "./Torah.css";

function parseMarkdownToHtml(md: string): string {
  const lines = md.split("\n");
  const htmlLines: string[] = [];
  let inList = false;

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) {
      if (inList) {
        htmlLines.push("</ul>");
        inList = false;
      }
      continue;
    }

    if (/^#{3}\s+/.test(line)) {
      if (inList) {
        htmlLines.push("</ul>");
        inList = false;
      }
      htmlLines.push(`<h3>${line.replace(/^#{3}\s+/, "")}</h3>`);
    } else if (/^#{2}\s+/.test(line)) {
      if (inList) {
        htmlLines.push("</ul>");
        inList = false;
      }
      htmlLines.push(`<h2>${line.replace(/^#{2}\s+/, "")}</h2>`);
    } else if (/^#\s+/.test(line)) {
      if (inList) {
        htmlLines.push("</ul>");
        inList = false;
      }
      htmlLines.push(`<h1>${line.replace(/^#\s+/, "")}</h1>`);
    } else if (/^-\s+/.test(line)) {
      if (!inList) {
        htmlLines.push("<ul>");
        inList = true;
      }
      htmlLines.push(`<li>${line.replace(/^-\s+/, "")}</li>`);
    } else {
      if (inList) {
        htmlLines.push("</ul>");
        inList = false;
      }
      htmlLines.push(`<p>${line}</p>`);
    }
  }

  if (inList) {
    htmlLines.push("</ul>");
  }

  return htmlLines.join("\n");
}

export default function TorahDispatch() {
  const { id } = useParams();
  const article = useMemo(() => {
    const idNum = Number(id);
    return Number.isNaN(idNum) ? undefined : getDvarTorahById(idNum);
  }, [id]);

  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!article) return;

    const source = article.source;
    let isActive = true;

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/torah/${source}`);
        if (!response.ok) throw new Error("Failed to load Torah source");

        const md = await response.text();
        if (!isActive) return;

        setContent(parseMarkdownToHtml(md));
      } catch (e) {
        if (!isActive) return;
        setError(String(e));
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      isActive = false;
    };
  }, [article]);

  if (!article) {
    return <FourZeroFour />;
  }

  return (
    <div className="torah-dispatch-page">
      <div className="torah-dispatch-header">
        <h1>{article.title}</h1>
        <time dateTime={article.date}>{article.date}</time>
        <p>
          <Link to="/torah">← Back to Divrei Torah home</Link>
        </p>
      </div>

      <br />

      {loading && <p>Loading content...</p>}
      {error && <p className="error">Error: {error}</p>}

      {!loading && !error && (
        <article
          className="torah-dispatch-content"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )}
    </div>
  );
}
