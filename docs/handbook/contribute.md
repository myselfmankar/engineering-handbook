---
id: contribute
title: 🤝 How to Contribute
sidebar_label: Contribution Guide
---

# Contribution Guide

Welcome! This handbook is a collaborative effort to document the world's best **System Design Wiki**. If you're a friend looking to add your own notes, diagrams, or sections, this guide is for you.

---

## 🏗️ The "Folder-First" Workflow

This site is powered by a custom **Documizer Engine**. You don't need to touch any code to add a new category. Just follow these steps:

### 1. Create a Category
Add a new folder in `docs/` (e.g., `docs/interviews`).

### 2. Add an Icon & Title
Create a `_category_.json` file inside your new folder:
```json
{
  "label": "Interviews",
  "position": 5,
  "customProps": {
    "emoji": "🎯",
    "description": "Cracking the technical and HR rounds."
  }
}
```

### 3. Write your Markdown
Add `.md` files inside that folder. They will automatically appear in the sidebar and on the homepage!

---

## 🚀 Technical Workflow (GitHub)

We use the professional **Open Source Workflow** for all contributions:

1. **Fork** the repository to your own account.
2. **Clone** it locally: `git clone https://github.com/myselfmankar/engineering-handbook`
3. **Branch**: `git checkout -b feature/added-new-docs`
4. **Commit**: `git commit -m "Added Redis Caching notes"`
5. **PR**: Open a **Pull Request** back to the `main` branch.

Once I review and merge your PR, the site will automatically update!

---

## 👤 Credits & Authorship
Every page tracks its own engineers. When your PR is merged, your name will automatically appear at the bottom of the pages you contributed to:

> *Last updated by [Your Name] on [Date]*

---

## 🎨 Writing Style
- **Diagrams**: Use **Mermaid.js** for architecture diagrams.
- **Language**: Use **English** for clarity and professional consistency.
- **Tone**: Professional, engineering-focused, but accessible.
- **Layout**: Use **GitHub-style alerts** (Note, Tip, Important) for key takeaways.
