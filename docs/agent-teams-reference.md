# Agent Teams Master Reference Guide

> Source: https://code.claude.com/docs/en/agent-teams
> Requires: Claude Code v2.1.32+, `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`

---

## Overview

Agent teams coordinate multiple Claude Code instances working together. One session acts as **team lead** — coordinating work, assigning tasks, synthesizing results. Teammates work independently in their own context windows and can message each other directly.

**Key distinction from subagents**: teammates communicate with each other directly; subagents only report back to the main agent.

---

## When to Use Agent Teams

### Strong use cases
- **Research and review** — multiple teammates investigate different aspects simultaneously, then challenge each other's findings
- **New modules or features** — teammates each own a separate piece without file conflicts
- **Debugging with competing hypotheses** — parallel theories converge faster than sequential investigation
- **Cross-layer changes** — frontend, backend, and tests each owned by a different teammate

### When NOT to use
- Sequential tasks with dependencies
- Same-file edits (causes overwrites)
- Work with many interdependencies
- Routine/simple tasks (single session or subagents are more cost-effective)

---

## Subagents vs Agent Teams

| | Subagents | Agent Teams |
|---|---|---|
| **Context** | Own context window; results return to caller | Own context window; fully independent |
| **Communication** | Report results to main agent only | Teammates message each other directly |
| **Coordination** | Main agent manages all work | Shared task list with self-coordination |
| **Best for** | Focused tasks where only the result matters | Complex work requiring discussion and collaboration |
| **Token cost** | Lower: results summarized back | Higher: each teammate is a separate Claude instance |

**Rule of thumb**: use subagents for quick focused workers; use agent teams when teammates need to share findings and coordinate on their own.

---

## Setup

### Enable agent teams

In `settings.json`:

```json
{
  "env": {
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"
  }
}
```

### Display modes

| Mode | Description | Requirement |
|---|---|---|
| `auto` (default) | Split panes if inside tmux, otherwise in-process | None |
| `in-process` | All teammates in main terminal, cycle with Shift+Down | Any terminal |
| `tmux` | Each teammate in own split pane | tmux or iTerm2 |

Set in `settings.json`:
```json
{
  "teammateMode": "in-process"
}
```

Or per session:
```bash
claude --teammate-mode in-process
```

**tmux install**: `which tmux` — see [tmux wiki](https://github.com/tmux/tmux/wiki/Installing)
**iTerm2**: install `it2` CLI + enable Python API in iTerm2 → Settings → General → Magic

---

## Starting a Team

Describe the task and team structure in natural language:

```
I'm designing a CLI tool that helps developers track TODO comments across
their codebase. Create an agent team to explore this from different angles:
one teammate on UX, one on technical architecture, one playing devil's advocate.
```

Claude creates the team, spawns teammates, assigns tasks, and attempts cleanup when done.

### Specify teammates and models explicitly:
```
Create a team with 4 teammates to refactor these modules in parallel.
Use Sonnet for each teammate.
```

---

## Controlling the Team

### Navigation (in-process mode)
- `Shift+Down` — cycle through teammates
- `Enter` — view a teammate's session
- `Escape` — interrupt current turn
- `Ctrl+T` — toggle task list

### Direct messaging
Type directly after cycling to a teammate (in-process), or click into their pane (split mode).

### Require plan approval before implementation:
```
Spawn an architect teammate to refactor the authentication module.
Require plan approval before they make any changes.
```
Lead reviews plan → approves or rejects with feedback → teammate stays in plan mode until approved.

### Assign tasks:
- **Lead assigns**: tell the lead which task to give which teammate
- **Self-claim**: teammates auto-claim next unassigned, unblocked task after finishing

### Graceful shutdown:
```
Ask the researcher teammate to shut down
```

### Full team cleanup (always run from lead):
```
Clean up the team
```
> WARNING: Always clean up from the lead, not a teammate. Cleanup fails if active teammates exist — shut them down first.

### Keep lead from doing work instead of delegating:
```
Wait for your teammates to complete their tasks before proceeding
```

---

## Architecture

| Component | Role |
|---|---|
| **Team lead** | Main Claude Code session; creates team, spawns teammates, coordinates work |
| **Teammates** | Separate Claude Code instances; each works on assigned tasks |
| **Task list** | Shared work items with states: pending → in progress → completed |
| **Mailbox** | Inter-agent messaging system |

**Storage locations:**
- Team config: `~/.claude/teams/{team-name}/config.json`
- Task list: `~/.claude/tasks/{team-name}/`

The config `members` array contains each teammate's name, agent ID, and agent type — teammates can read this to discover each other.

### Task dependencies
Tasks can depend on other tasks. Blocked tasks auto-unblock when dependencies complete. Task claiming uses file locking to prevent race conditions.

### Permissions
Teammates inherit the lead's permission mode at spawn. `--dangerously-skip-permissions` on lead applies to all teammates. Modes can be changed per-teammate after spawn, but not at spawn time.

### Context
Each teammate loads: CLAUDE.md, MCP servers, skills + spawn prompt from lead. Lead's conversation history does NOT carry over.

### Communication types
- `message` — send to one specific teammate
- `broadcast` — send to all teammates (use sparingly; costs scale with team size)
- **Idle notifications** — teammates automatically notify lead when they stop
- **Automatic delivery** — lead doesn't need to poll for messages

---

## Hooks for Quality Gates

| Hook | Trigger | Use |
|---|---|---|
| `TeammateIdle` | Teammate about to go idle | Exit code 2 to send feedback and keep teammate working |
| `TaskCompleted` | Task being marked complete | Exit code 2 to prevent completion and send feedback |

---

## Token Usage

- Each teammate = own context window = independent token consumption
- Costs scale linearly with team size
- Best ROI on: research, review, new feature work
- Poorest ROI on: routine tasks, sequential work

---

## Best Practices

### 1. Give teammates specific context in the spawn prompt
Teammates don't inherit conversation history. Include task-specific details:

```
Spawn a security reviewer teammate with the prompt: "Review the authentication
module at src/auth/ for security vulnerabilities. Focus on token handling,
session management, and input validation. The app uses JWT tokens stored in
httpOnly cookies. Report any issues with severity ratings."
```

### 2. Team size: 3–5 teammates
- Token costs are linear
- Coordination overhead grows with size
- 5–6 tasks per teammate is optimal
- 3 focused teammates often outperform 5 scattered ones

### 3. Task sizing
- **Too small** → coordination overhead > benefit
- **Too large** → long stretches without check-ins, wasted effort risk
- **Just right** → self-contained, clear deliverable (a function, test file, review)

### 4. Start with research/review tasks
Low coordination risk. Clear boundaries. No file conflicts. Shows parallel value immediately.

### 5. Avoid file conflicts
Explicitly partition ownership: each teammate works on different files/modules.

### 6. Monitor and steer
Don't let teams run unattended for too long. Check in, redirect failing approaches, synthesize findings as they arrive.

---

## Use Case Examples

### Parallel code review (3 reviewers, different lenses)
```
Create an agent team to review PR #142. Spawn three reviewers:
- One focused on security implications
- One checking performance impact
- One validating test coverage
Have them each review and report findings.
```

### Competing hypotheses debugging (adversarial structure)
```
Users report the app exits after one message instead of staying connected.
Spawn 5 agent teammates to investigate different hypotheses. Have them talk to
each other to try to disprove each other's theories, like a scientific debate.
Update the findings doc with whatever consensus emerges.
```
**Why adversarial**: sequential investigation anchors on first plausible theory. Parallel investigators actively disproving each other's theories means the surviving theory is far more likely to be the actual root cause.

---

## Troubleshooting

| Problem | Fix |
|---|---|
| Teammates not appearing | Press Shift+Down — they may be running but not visible. Check tmux is in PATH: `which tmux` |
| Too many permission prompts | Pre-approve common operations in permission settings before spawning |
| Teammate stopped on error | Message them directly or spawn a replacement |
| Lead shuts down early | Tell lead to keep going; instruct it to wait for teammates before proceeding |
| Orphaned tmux sessions | `tmux ls` then `tmux kill-session -t <session-name>` |
| Task stuck/blocked | Check if work is actually done; manually update status or tell lead to nudge the teammate |

---

## Limitations (Experimental)

| Limitation | Detail |
|---|---|
| No session resumption for in-process teammates | `/resume` and `/rewind` don't restore teammates; lead may try to message non-existent teammates — spawn new ones |
| Task status lag | Teammates sometimes fail to mark tasks complete; blocked tasks may stall |
| Slow shutdown | Teammates finish current request/tool call before shutting down |
| One team per session | Clean up current team before starting a new one |
| No nested teams | Teammates cannot spawn sub-teams; only the lead can manage the team |
| Fixed lead | The session that creates the team is lead for its lifetime; no leadership transfer |
| Permissions set at spawn | Can't set per-teammate modes at spawn time; change individually after |
| Split panes: terminal restrictions | Not supported in VS Code integrated terminal, Windows Terminal, or Ghostty |

---

## Quick Reference: Key Commands

```bash
# Enable agent teams (settings.json)
"CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"

# Force in-process mode for session
claude --teammate-mode in-process

# List orphaned tmux sessions
tmux ls

# Kill orphaned session
tmux kill-session -t <session-name>

# Check Claude Code version
claude --version
```

**Natural language commands to the lead:**
```
Create an agent team to [task description]
Spawn a [role] teammate to [specific task]
Ask the [name] teammate to shut down
Wait for teammates to finish before proceeding
Clean up the team
```

---

## Related Approaches

| Approach | When to use |
|---|---|
| **Subagents** | Lightweight delegation within a session; tasks that don't need inter-agent coordination |
| **Git worktrees** | Manual parallel sessions without automated coordination |
| **Agent teams** | Complex work requiring discussion, shared task list, and direct teammate communication |
