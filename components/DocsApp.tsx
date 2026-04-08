"use client";

import { useEffect, useMemo, useState } from "react";
import {
  groups,
  sections,
  type Block,
  type LinkItem,
  type Section,
} from "@/lib/content";

function useHash(defaultId: string) {
  const [hash, setHash] = useState(defaultId);

  useEffect(() => {
    const sync = () => {
      const next = window.location.hash.replace(/^#/, "");
      setHash(next || defaultId);
    };

    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, [defaultId]);

  return hash;
}

function LinkList({ items }: { items: LinkItem[] }) {
  return (
    <div className="link-list">
      {items.map((item) => (
        <a
          key={item.href}
          href={item.href}
          target={item.external ? "_blank" : undefined}
          rel={item.external ? "noreferrer" : undefined}
        >
          {item.label}
        </a>
      ))}
    </div>
  );
}

function SummaryText({
  section,
  includeLink = true,
}: {
  section: Section;
  includeLink?: boolean;
}) {
  return (
    <>
      {section.summary}
      {includeLink && section.summarySuffixLink ? (
        <>
          {section.summarySuffixLink.prefix}
          <a
            href={section.summarySuffixLink.item.href}
            target={
              section.summarySuffixLink.item.external ? "_blank" : undefined
            }
            rel={
              section.summarySuffixLink.item.external ? "noreferrer" : undefined
            }
            style={{ textDecoration: "underline" }}
          >
            {section.summarySuffixLink.item.label}
          </a>
          {section.summarySuffixLink.suffix ?? null}
        </>
      ) : null}
    </>
  );
}

function BlockRenderer({ block }: { block: Block }) {
  if (block.type === "p") return <p className="copy">{block.text}</p>;

  if (block.type === "note") {
    return (
      <div className={`callout ${block.tone ?? "info"}`}>
        <strong>{block.title}</strong>
        <p>{block.text}</p>
      </div>
    );
  }

  if (block.type === "list") {
    return (
      <ul className="list">
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }

  if (block.type === "steps") {
    return (
      <ol className="steps">
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ol>
    );
  }

  if (block.type === "code") {
    return (
      <figure className="code-block">
        {block.label ? <figcaption>{block.label}</figcaption> : null}
        <pre>
          <code>{block.code}</code>
        </pre>
      </figure>
    );
  }

  if (block.type === "table") {
    return (
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              {block.headers.map((header) => (
                <th key={header}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.rows.map((row) => (
              <tr key={row.join("|")}>
                {row.map((cell) => (
                  <td key={cell}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return <LinkList items={block.items} />;
}

function Sidebar({ activeSection }: { activeSection: Section }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <a href="#home" className="brand">
          Codex Guidance
        </a>
        <p>Native Codex only. Same doc rhythm, less fog.</p>
      </div>

      {groups.map((group) => {
        const groupSections = sections.filter(
          (section) => section.group === group.id,
        );
        if (!groupSections.length) return null;

        return (
          <nav key={group.id} className="nav-group" aria-label={group.label}>
            <div className="nav-label">{group.label}</div>
            {groupSections.map((section) => {
              const isActive = section.id === activeSection.id;
              return (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className={isActive ? "nav-link active" : "nav-link"}
                >
                  <span>{section.title}</span>
                  <small>
                    <SummaryText section={section} includeLink={false} />
                  </small>
                </a>
              );
            })}
          </nav>
        );
      })}
    </aside>
  );
}

export function DocsApp() {
  const hash = useHash("home");

  const activeSection = useMemo(() => {
    return sections.find((section) => section.id === hash) ?? sections[0];
  }, [hash]);

  const activeGroupSections = useMemo(() => {
    return sections.filter((section) => section.group === activeSection.group);
  }, [activeSection.group]);

  return (
    <div className="layout">
      <Sidebar activeSection={activeSection} />

      <main className="main">
        <header className="hero">
          <div className="eyebrow">{activeSection.group}</div>
          <h1>{activeSection.title}</h1>
          <p>
            <SummaryText section={activeSection} />
          </p>
        </header>

        <div className="local-nav" aria-label="Section navigation">
          {activeGroupSections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={
                section.id === activeSection.id ? "chip active" : "chip"
              }
            >
              {section.title}
            </a>
          ))}
        </div>

        <article className="doc-card">
          {activeSection.blocks.map((block, index) => (
            <BlockRenderer key={`${activeSection.id}-${index}`} block={block} />
          ))}
        </article>
      </main>
    </div>
  );
}
