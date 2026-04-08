export type LinkItem = {
  label: string;
  href: string;
  external?: boolean;
};

export type Block =
  | { type: "p"; text: string }
  | { type: "note"; title: string; text: string; tone?: "info" | "warning" }
  | { type: "list"; items: string[] }
  | { type: "steps"; items: string[] }
  | { type: "code"; label?: string; code: string }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "links"; items: LinkItem[] };

export type SectionGroup =
  | "overview"
  | "tutorials"
  | "workflows"
  | "advanced"
  | "reference";

export type Section = {
  id: string;
  group: SectionGroup;
  title: string;
  summary: string;
  summarySuffixLink?: {
    prefix: string;
    item: LinkItem;
    suffix?: string;
  };
  blocks: Block[];
};

export const groups: { id: SectionGroup; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "tutorials", label: "Tutorials" },
  { id: "workflows", label: "Workflows" },
  { id: "advanced", label: "Advanced" },
  { id: "reference", label: "Reference" },
];

export const sections: Section[] = [
  {
    id: "home",
    group: "overview",
    title: "Codex Guidance",
    summary:
      "A native Codex translation of the Claude guidance model. Same single-page docs rhythm, but only sections that map cleanly to AGENTS.md, hooks, rules, config, skills, subagents, approvals, sandboxing, and built-in commands",
    summarySuffixLink: {
      prefix: " by ",
      item: {
        label: "Cloud9 Payment Gateway",
        href: "https://c9pg.com",
        external: true,
      },
      suffix: " - your agentic payment partner",
    },
    blocks: [
      {
        type: "p",
        text: "This version keeps the shape of the original guide, then trims away anything Codex cannot enforce natively. The result is leaner: AGENTS.md holds the durable project contract, hooks add event-driven checks, rules control shell escalation, skills hold reusable workflows, subagents handle narrow delegation, and built-in commands stay built-in.",
      },
      {
        type: "table",
        headers: ["Claude pattern", "Native Codex equivalent", "Keep or skip"],
        rows: [
          ["Global constitution", "~/.codex/AGENTS.md", "Keep"],
          [
            "Project constitution",
            "repo AGENTS.md and AGENTS.override.md",
            "Keep",
          ],
          ["Prompt-time reminders", "UserPromptSubmit hook", "Keep"],
          ["Shell permission guardrails", ".rules and approval policy", "Keep"],
          ["Reusable workflows", ".agents/skills", "Keep"],
          [
            "Custom slash commands like /quick",
            "No direct native equivalent",
            "Skip",
          ],
          [
            "Automatic post-edit file hooks",
            "No direct native equivalent beyond Bash post-tool hooks",
            "Skip",
          ],
          ["Ratchet/evolve loop", "No first-class native feature", "Skip"],
        ],
      },
      {
        type: "list",
        items: [
          "Use AGENTS.md for stable instructions, not for volatile task state.",
          "Use Build Sequence text when you want a staged implementation contract.",
          "Use a UserPromptSubmit hook when you want that contract checked on every prompt.",
          "Use rules and approval policy for execution boundaries, not prose alone.",
          "Use skills for named workflows that should be invoked explicitly or discovered automatically.",
          "Use subagents only for narrow, well-bounded jobs.",
        ],
      },
      {
        type: "links",
        items: [
          {
            label: "AGENTS.md guide",
            href: "https://developers.openai.com/codex/guides/agents-md",
            external: true,
          },
          {
            label: "Hooks guide",
            href: "https://developers.openai.com/codex/hooks",
            external: true,
          },
          {
            label: "Rules guide",
            href: "https://developers.openai.com/codex/rules",
            external: true,
          },
          {
            label: "Skills guide",
            href: "https://developers.openai.com/codex/skills",
            external: true,
          },
          {
            label: "Subagents guide",
            href: "https://developers.openai.com/codex/subagents",
            external: true,
          },
          {
            label: "Commands",
            href: "https://developers.openai.com/codex/app/commands",
            external: true,
          },
        ],
      },
    ],
  },
  {
    id: "tutorials/global-setup",
    group: "tutorials",
    title: "Global setup",
    summary:
      "Set your durable defaults in ~/.codex, then let repositories add closer instructions. This is the cleanest native equivalent to a global bootstrap.",
    blocks: [
      {
        type: "steps",
        items: [
          "Create ~/.codex/AGENTS.md for reusable working agreements that should apply everywhere.",
          "Create ~/.codex/config.toml for default model, approval, sandbox, and fallback instruction filenames.",
          "Add ~/.codex/hooks.json only when you need event-driven behavior such as startup summaries or prompt-time checks.",
          "Keep global instructions short and stable. Put project-specific behavior in the repository instead.",
        ],
      },
      {
        type: "code",
        label: "Minimal global AGENTS.md",
        code: `# ~/.codex/AGENTS.md\n\n## Working agreements\n\n- Prefer pnpm when a repository already uses pnpm.\n- Run the project test command after code changes when practical.\n- Ask before adding production dependencies.`,
      },
      {
        type: "code",
        label: "Minimal global config.toml",
        code: `model = "gpt-5.4"\napproval_policy = "on-request"\nsandbox_mode = "workspace-write"\nproject_doc_fallback_filenames = ["TEAM_GUIDE.md", ".agents.md"]\nproject_doc_max_bytes = 65536`,
      },
      {
        type: "note",
        title: "Keep the global layer boring",
        tone: "info",
        text: "The global layer should describe broad habits, not per-repo rituals. If it changes every week, it belongs in the repo. The global file is climate, not weather.",
      },
    ],
  },
  {
    id: "tutorials/project-setup",
    group: "tutorials",
    title: "Project setup",
    summary:
      "Put the real contract in the repository: what this project is, how it is tested, and how staged implementation should proceed.",
    blocks: [
      {
        type: "p",
        text: "Codex builds project instructions by layering the active instruction files from your Codex home and the repository tree. Put a focused AGENTS.md in the repo root, then add AGENTS.override.md deeper in the tree only where a narrower area needs to override the broader contract.",
      },
      {
        type: "steps",
        items: [
          "Create AGENTS.md at the repository root.",
          "Add repository expectations, test commands, package manager, deployment constraints, and protected paths.",
          "If you use staged work, define a Build Sequence with checkboxes and clear gates.",
          "Keep current task state in a tracked task file or issue, not as ever-growing AGENTS prose.",
          "Add nested AGENTS.override.md only when a subdirectory truly needs different instructions.",
        ],
      },
      {
        type: "code",
        label: "Repository AGENTS.md skeleton",
        code: `# AGENTS.md\n\n## Repository expectations\n\n- Use Node.js 22.\n- Use pnpm.\n- Run \`pnpm test\` before claiming completion.\n- Keep changes scoped to the active step.\n\n## Build Sequence\n\n- [ ] Reproduce or define the requirement.\n- [ ] Add or locate the smallest failing test or exact reproduction.\n- [ ] Make the smallest passing change.\n- [ ] Run the test command and confirm the step is green.\n- [ ] Stop at the stage boundary and summarize.\n\n## Test Command\n\npnpm test`,
      },
      {
        type: "note",
        title: "Native translation rule",
        tone: "warning",
        text: "Build Sequence is not a built-in Codex feature. The native way to express it is AGENTS.md plus, if needed, a UserPromptSubmit hook that reminds the agent to read and follow the sequence before implementation starts.",
      },
    ],
  },
  {
    id: "tutorials/six-step-loop",
    group: "tutorials",
    title: "Six-step loop",
    summary:
      "A compact staged loop that Codex can follow when you encode it in AGENTS.md and reinforce it with prompt-time hooks.",
    blocks: [
      {
        type: "steps",
        items: [
          "Read the active AGENTS instructions and identify the current unchecked step.",
          "Reproduce the issue or pin down the requirement.",
          "Add or find the smallest failing test or exact reproduction.",
          "Make the minimum change that should satisfy the step.",
          "Run the test command and verify the step is green.",
          "Stop at the step boundary, summarize, and only then move forward.",
        ],
      },
      {
        type: "code",
        label: "UserPromptSubmit hook idea",
        code: `{
  "hooks": {
    "UserPromptSubmit": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "python3 .codex/hooks/project_setup_guard.py"
          }
        ]
      }
    ]
  }
}`,
      },
      {
        type: "p",
        text: "That hook should not invent its own process. Its job is simple: read the active AGENTS.md, detect whether a Build Sequence exists, and remind Codex to follow the first unchecked step before implementation begins.",
      },
    ],
  },
  {
    id: "workflows/feature",
    group: "workflows",
    title: "Feature workflow",
    summary:
      "The native Codex version of a feature workflow is a skill plus a repository Build Sequence. The skill gives the reusable checklist; AGENTS.md tells the agent where to stop.",
    blocks: [
      {
        type: "steps",
        items: [
          "Capture the user-facing requirement and acceptance signals.",
          "Map the owning files and interfaces before editing.",
          "Implement only the active step from the Build Sequence.",
          "Run the test command or the narrowest valid verification command.",
          "Summarize what changed and what remains outside the current step.",
        ],
      },
      {
        type: "code",
        label: "Feature skill entrypoint",
        code: `---
name: feature-workflow
description: reusable repository feature workflow. use when implementing a scoped feature in the current codebase and the repo has a known test command.
---

1. Read AGENTS.md and identify the active Build Sequence step.
2. Map the smallest set of files that own the behavior.
3. Make only the change required for the active step.
4. Run the test command.
5. Stop at the step boundary and summarize remaining work.`,
      },
      {
        type: "note",
        title: "Why this stays native",
        tone: "info",
        text: "Skills are a first-class Codex authoring format for reusable workflows. They are the native place to store a repeatable feature procedure without turning AGENTS.md into a phone book.",
      },
    ],
  },
  {
    id: "advanced/agents-md",
    group: "advanced",
    title: "AGENTS.md",
    summary:
      "AGENTS.md is the instruction spine. Use it for durable expectations, stage gates, and local overrides close to the code they govern.",
    blocks: [
      {
        type: "table",
        headers: ["Location", "Typical role"],
        rows: [
          ["~/.codex/AGENTS.md", "Global working agreements"],
          ["repo/AGENTS.md", "Repository contract and build sequence"],
          [
            "repo/path/AGENTS.override.md",
            "Narrow override that replaces broader rules in that subtree",
          ],
        ],
      },
      {
        type: "list",
        items: [
          "Keep instructions short enough to survive truncation limits.",
          "Place overrides as close to specialized work as possible.",
          "Use fallback filenames only when a repository already relies on them.",
          "Do not store volatile session notes here.",
        ],
      },
      {
        type: "code",
        label: "Fallback filename config",
        code: `project_doc_fallback_filenames = ["TEAM_GUIDE.md", ".agents.md"]\nproject_doc_max_bytes = 65536`,
      },
    ],
  },
  {
    id: "advanced/hooks",
    group: "advanced",
    title: "Hooks",
    summary:
      "Hooks add native event-driven behavior. They are useful, but their sharp edge is narrower than many people assume.",
    blocks: [
      {
        type: "p",
        text: "Codex discovers hooks.json next to active config layers and loads all matching files. The two most practical locations are ~/.codex/hooks.json and <repo>/.codex/hooks.json. UserPromptSubmit is the most useful event for process reminders. SessionStart and Stop are good for loading or saving context. PreToolUse and PostToolUse currently intercept Bash tool activity only.",
      },
      {
        type: "table",
        headers: ["Event", "Best use"],
        rows: [
          ["SessionStart", "Load notes or summarize active repo context"],
          [
            "UserPromptSubmit",
            "Check prompt-time requirements such as a Build Sequence reminder",
          ],
          ["PreToolUse", "Gate Bash commands before they run"],
          ["PostToolUse", "Inspect Bash command results"],
          ["Stop", "Write journal or handoff notes"],
        ],
      },
      {
        type: "code",
        label: "Native project hook shell",
        code: `{
  "hooks": {
    "UserPromptSubmit": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "python3 .codex/hooks/project_setup_guard.py"
          }
        ]
      }
    ]
  }
}`,
      },
      {
        type: "note",
        title: "Important limitation",
        tone: "warning",
        text: "PreToolUse and PostToolUse currently only support Bash tool interception. They are guardrails, not a universal enforcement wall around every write or edit action.",
      },
    ],
  },
  {
    id: "advanced/rules",
    group: "advanced",
    title: "Rules",
    summary:
      "Rules govern which commands Codex may run outside the sandbox. They are native, shell-focused, and precise.",
    blocks: [
      {
        type: "p",
        text: "Rules live under .codex/rules or ~/.codex/rules and use Starlark. Use them to allow, prompt, or forbid command prefixes during escalations. Inline match examples act like tiny unit tests for your rule file.",
      },
      {
        type: "code",
        label: "Prompt before gh pr view",
        code: `prefix_rule(
  pattern = ["gh", "pr", "view"],
  decision = "prompt",
  justification = "Review external PR data before leaving the sandbox.",
  match = [
    "gh pr view 7888",
    "gh pr view --repo openai/codex"
  ],
  not_match = [
    "gh pr --repo openai/codex view 7888"
  ],
)`,
      },
      {
        type: "list",
        items: [
          "allow runs outside the sandbox without a prompt.",
          "prompt asks each time.",
          "forbidden blocks the request.",
          "The most restrictive matching rule wins.",
        ],
      },
      {
        type: "code",
        label: "Test a rule file",
        code: `codex execpolicy check --pretty --rules ~/.codex/rules/default.rules -- gh pr view 7888 --json title,body,comments`,
      },
    ],
  },
  {
    id: "advanced/skills",
    group: "advanced",
    title: "Skills",
    summary:
      "Skills are the native authoring format for reusable workflows. Use them for named procedures, not for universal policy.",
    blocks: [
      {
        type: "table",
        headers: ["Scope", "Path"],
        rows: [
          ["Repo root skills", "$REPO_ROOT/.agents/skills"],
          ["Current folder skills", "$CWD/.agents/skills"],
          ["User skills", "$HOME/.agents/skills"],
        ],
      },
      {
        type: "p",
        text: "Invoke skills explicitly with $ in the composer, and remember that enabled skills can also appear in the slash command list. Put the workflow in the skill, then keep the durable project contract in AGENTS.md.",
      },
      {
        type: "code",
        label: "Small repository skill",
        code: `---
name: verify-change
description: reusable change verification workflow. use when validating a scoped implementation in this repository.
---

1. Read AGENTS.md for the test command.
2. Run the narrowest verification that proves the changed behavior.
3. Report exactly what passed, failed, or was not run.`,
      },
    ],
  },
  {
    id: "advanced/subagents",
    group: "advanced",
    title: "Subagents",
    summary:
      "Subagents are native, but they work best when they are narrow and opinionated. Think scalpel, not octopus.",
    blocks: [
      {
        type: "p",
        text: "Codex ships with built-in agents including default, worker, and explorer. You can add custom agents as standalone TOML files under ~/.codex/agents or .codex/agents. Each custom agent must define name, description, and developer_instructions, and may also override normal config keys such as model, sandbox_mode, MCP servers, or skill config.",
      },
      {
        type: "code",
        label: "Example reviewer agent",
        code: `name = "reviewer"
description = "PR reviewer focused on correctness, security, and missing tests."
model = "gpt-5.4"
model_reasoning_effort = "high"
sandbox_mode = "read-only"
developer_instructions = """
Review code like an owner.
Prioritize correctness, security, behavior regressions, and missing test coverage.
"""
nickname_candidates = ["Atlas", "Delta", "Echo"]`,
      },
      {
        type: "list",
        items: [
          "Keep max_depth at 1 unless you truly need recursive delegation.",
          "Use read-only explorers and reviewers by default.",
          "Give each custom agent a single sharp job and matching tool surface.",
        ],
      },
    ],
  },
  {
    id: "reference/commands",
    group: "reference",
    title: "Commands",
    summary:
      "Use built-in slash commands as they exist. Do not pretend custom Claude-style commands are native when they are not.",
    blocks: [
      {
        type: "p",
        text: "In the Codex app, slash commands are built in and vary by environment and access. The documented built-ins include /feedback, /mcp, /plan-mode, /review, and /status. Skills can be invoked explicitly with $. Enabled skills may also appear in the slash command list.",
      },
      {
        type: "table",
        headers: ["Command", "What it does"],
        rows: [
          ["/status", "Show thread ID, context usage, and rate limits"],
          ["/review", "Enter code review mode"],
          ["/plan-mode", "Toggle plan mode for multi-step planning"],
          ["/mcp", "Open MCP status"],
          ["/feedback", "Open feedback dialog"],
          ["$skill-name", "Explicitly invoke a skill"],
        ],
      },
      {
        type: "note",
        title: "Skipped on purpose",
        tone: "warning",
        text: "Custom slash commands such as /quick, /build, or /evolve are not presented here as native Codex commands. If you want those behaviors, model them with AGENTS.md, hooks, skills, or external tooling and label them honestly.",
      },
    ],
  },
  {
    id: "reference/config",
    group: "reference",
    title: "Config",
    summary:
      "A small number of config keys carry most of the weight for local safety and behavior.",
    blocks: [
      {
        type: "table",
        headers: ["Key", "Typical use"],
        rows: [
          ["model", "Choose the default model"],
          [
            "approval_policy",
            "Control when Codex pauses before generated commands",
          ],
          [
            "sandbox_mode",
            "Control filesystem and network access during command execution",
          ],
          [
            "project_doc_fallback_filenames",
            "Treat existing filenames as instruction files",
          ],
          [
            "project_doc_max_bytes",
            "Raise instruction discovery limit if needed",
          ],
          ["[agents]", "Set subagent thread and depth limits"],
        ],
      },
      {
        type: "code",
        label: "Good starting point",
        code: `model = "gpt-5.4"\napproval_policy = "on-request"\nsandbox_mode = "workspace-write"\nproject_doc_fallback_filenames = ["TEAM_GUIDE.md", ".agents.md"]\nproject_doc_max_bytes = 65536\n\n[agents]\nmax_threads = 6\nmax_depth = 1`,
      },
    ],
  },
  {
    id: "reference/approvals-sandbox",
    group: "reference",
    title: "Approvals and sandboxing",
    summary:
      "Safety lives in approvals, sandboxing, and rules working together. Keep the defaults sharp enough to matter.",
    blocks: [
      {
        type: "table",
        headers: ["Mode", "Effect"],
        rows: [
          [
            "read-only + never",
            "Read only, no approvals, useful for CI or analysis",
          ],
          [
            "workspace-write + on-request",
            "Edit in workspace, ask when needed, good general default",
          ],
          [
            "workspace-write + untrusted",
            "Edit freely but ask before untrusted commands",
          ],
          [
            "dangerously-bypass-approvals-and-sandbox",
            "No sandbox and no approvals, not recommended",
          ],
        ],
      },
      {
        type: "code",
        label: "Sandbox test commands",
        code: `# macOS\ncodex sandbox macos [--full-auto] [--log-denials] [COMMAND]...\n\n# Linux\ncodex sandbox linux [--full-auto] [COMMAND]...`,
      },
      {
        type: "note",
        title: "Recommended baseline",
        tone: "info",
        text: "For a normal repository, workspace-write with on-request approvals is a practical default. Tighten further with read-only agents, command rules, and subdirectory instruction overrides where necessary.",
      },
    ],
  },
];
