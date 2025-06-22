---
title: 'How I Use Claude Code and Puppeteer to Run Accessibility Audits on My Website'
description: 'Discover how to automate accessibility testing using Claude Code with Puppeteer MCP. Learn my complete workflow for finding and fixing accessibility issues quickly.'
date: '2025-01-22'
---

Making websites accessible isn't just good practice—it's essential. When I built this blog, I wanted to make sure everyone could use it easily, including people who rely on screen readers or keyboard navigation. But manually checking every accessibility rule takes forever and it's easy to miss things.

That's when I discovered Claude Code with Puppeteer MCP. This combo changed how I approach accessibility testing. Instead of clicking through endless checklists, I can now run complete accessibility audits in minutes and get actionable fixes immediately.

## What is Claude Code and MCP?

Claude Code is Anthropic's command-line tool that brings AI assistance directly to your development workflow. Think of it as having an expert developer sitting next to you, ready to help with any coding task.

MCP stands for Model Context Protocol. It's a way for Claude Code to connect with external tools and services. In simple terms, MCP lets Claude Code use specialized tools like Puppeteer to perform tasks that go beyond just reading and writing code.

Puppeteer MCP gives Claude Code the power to:

- Control a real web browser
- Take screenshots of your site
- Click buttons and fill forms
- Run JavaScript to analyze page structure
- Test user interactions automatically

## My Accessibility Audit Workflow

When I want to check my website's accessibility, I follow this simple process:

### 1. Start the Audit

I tell Claude Code to run an accessibility audit on my site. It immediately creates a task list to track everything:

```
- Navigate to homepage and take screenshot
- Check heading hierarchy (h1, h2, h3, etc.)
- Verify all images have alt text
- Test keyboard navigation and focus indicators
- Check color contrast ratios
- Verify form labels and ARIA attributes
- Test dark mode accessibility
- Check semantic HTML structure
- Verify skip links and navigation aids
- Generate final report
```

### 2. Automated Browser Testing

Claude Code uses Puppeteer to open my website in a real browser. It takes screenshots, clicks elements, and runs JavaScript to analyze the page structure. This isn't just static analysis—it's testing how real users would interact with my site.

### 3. Comprehensive Analysis

The audit checks everything that matters for accessibility:

**Heading Structure**: Makes sure I have proper h1 → h2 → h3 hierarchy
**Keyboard Navigation**: Tests that every interactive element can be reached with Tab key
**Focus Indicators**: Verifies that focused elements are clearly visible
**Color Contrast**: Analyzes text against backgrounds for readability
**Semantic HTML**: Confirms I'm using proper HTML elements like `<nav>`, `<main>`, `<article>`
**ARIA Labels**: Checks that screen readers can understand page structure
**Skip Links**: Verifies users can jump to main content quickly

### 4. Instant Fixes

Here's where it gets really powerful. Claude Code doesn't just find problems—it fixes them immediately. When it discovered my site was missing:

- Document language attribute
- Skip links for screen readers
- Proper navigation labels
- Main content ID for skip links

It automatically updated my code with the exact fixes needed.

## Why This Workflow Works So Well

**Speed**: What used to take hours now takes minutes. Claude Code runs comprehensive checks faster than any manual process.

**Accuracy**: It never misses obvious issues like missing alt text or broken heading hierarchy. The browser automation catches real-world problems.

**Actionable Results**: Instead of vague suggestions, I get specific code changes that solve actual problems.

**Learning**: Each audit teaches me something new about accessibility. I understand not just what to fix, but why it matters.

**Consistency**: Every audit follows the same thorough checklist. Nothing gets skipped or forgotten.

## Real Results

After running this audit on my blog, I went from a good accessibility score to perfect WCAG AA compliance. The fixes were simple but crucial:

- Added `lang="en"` to my HTML element
- Implemented a "Skip to main content" link
- Added proper ARIA labels to navigation
- Ensured all interactive elements have focus indicators

These small changes made my site usable for everyone, including people using assistive technologies.

## Getting Started

If you want to try this workflow:

1. Install Claude Code from Anthropic
2. Set up Puppeteer MCP (it's included with Claude Code)
3. Start your development server
4. Ask Claude Code to run an accessibility audit
5. Review the results and implement the fixes

The beauty of this approach is that it makes accessibility testing feel effortless. Instead of dreading compliance checks, I actually look forward to them. Each audit makes my site better for everyone.

## Making the Web More Accessible

Accessibility isn't optional—it's a fundamental part of good web development. Tools like Claude Code with Puppeteer MCP make it easier than ever to build inclusive websites.

When we remove barriers from our sites, we create better experiences for everyone. A site that works well with a screen reader also works better for people using voice commands, mobile devices, or slow internet connections.

The next time you build or update a website, try running an automated accessibility audit. You might be surprised by what you learn and how much better your site becomes.

---

_Want to see this workflow in action? Try Claude Code with your own website and share your results. Making the web more accessible starts with one site at a time._
