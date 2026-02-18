---
description: Upload the project to GitHub repository
---

# Uploading Your Quiz App to GitHub

This workflow guides you through uploading your quiz application to a GitHub repository.

## Prerequisites Check

Before starting, you need:
- **Git installed** on your computer
- **GitHub account** (free at https://github.com)

---

## Step 1: Install Git (If Not Already Installed)

### Check if Git is installed:

```bash
git --version
```

If you see a version number (e.g., `git version 2.40.0`), Git is installed. **Skip to Step 2**.

### If Git is NOT installed:

#### Option A: Download Git for Windows (Recommended)

1. Go to: https://git-scm.com/download/win
2. Download the installer (64-bit recommended)
3. Run the installer with these settings:
   - ✅ Use Git from the Windows Command Prompt
   - ✅ Use the OpenSSL library
   - ✅ Checkout Windows-style, commit Unix-style line endings
   - ✅ Use MinTTY (default terminal)
   - ✅ Default (fast-forward or merge)
4. Click "Install"
5. **Restart your terminal** after installation
6. Verify: `git --version`

#### Option B: Install via Winget (Windows Package Manager)

```bash
winget install --id Git.Git -e --source winget
```

Then restart your terminal.

---

## Step 2: Configure Git (First Time Only)

Set your name and email (this will appear in your commits):

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

**Example:**
```bash
git config --global user.name "John Doe"
git config --global user.email "john@example.com"
```

---

## Step 3: Create a GitHub Repository

### Via GitHub Website:

1. Go to https://github.com
2. Click the **"+"** icon in the top right
3. Select **"New repository"**
4. Fill in the details:
   - **Repository name**: `quiz-app` (or any name you prefer)
   - **Description**: "Full-stack quiz application with FastAPI and PostgreSQL"
   - **Visibility**: Choose Public or Private
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
5. Click **"Create repository"**
6. **Copy the repository URL** shown on the next page (looks like: `https://github.com/YOUR_USERNAME/quiz-app.git`)

---

## Step 4: Initialize Git in Your Project

Navigate to your project directory and initialize Git:

```bash
cd c:\Users\lenovo\.gemini\antigravity\scratch
git init
```

**Expected output:**
```
Initialized empty Git repository in c:/Users/lenovo/.gemini/antigravity/scratch/.git/
```

---

## Step 5: Verify .gitignore is Working

Check that sensitive files won't be committed:

```bash
git status
```

You should see files listed, but **NOT** these:
- ❌ `backend/.env` (contains database credentials)
- ❌ `backend/__pycache__/`
- ❌ `*.pyc` files

If you see `.env` in the list, **STOP** and make sure `.gitignore` is properly configured.

---

## Step 6: Stage All Files

Add all files to Git staging:

```bash
git add .
```

This adds all files except those in `.gitignore`.

---

## Step 7: Create Your First Commit

Commit the files with a message:

```bash
git commit -m "Initial commit: Quiz app with FastAPI backend and frontend"
```

**Expected output:**
```
[main (root-commit) abc1234] Initial commit: Quiz app with FastAPI backend and frontend
 XX files changed, XXX insertions(+)
 create mode 100644 README.md
 ...
```

---

## Step 8: Rename Branch to 'main' (if needed)

GitHub uses 'main' as the default branch name:

```bash
git branch -M main
```

---

## Step 9: Connect to GitHub Repository

Add your GitHub repository as the remote origin:

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
```

**Replace** `YOUR_USERNAME` and `YOUR_REPO_NAME` with your actual GitHub username and repository name.

**Example:**
```bash
git remote add origin https://github.com/johndoe/quiz-app.git
```

---

## Step 10: Push to GitHub

Push your code to GitHub:

```bash
git push -u origin main
```

### Authentication Options:

#### Option A: Personal Access Token (Recommended)

If prompted for credentials:
1. **Username**: Your GitHub username
2. **Password**: Use a **Personal Access Token** (NOT your GitHub password)

**To create a token:**
1. Go to: https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Give it a name: "Quiz App Deployment"
4. Select scopes: ✅ `repo` (full control of private repositories)
5. Click "Generate token"
6. **Copy the token** (you won't see it again!)
7. Use this token as your password when pushing

#### Option B: GitHub CLI (Alternative)

Install GitHub CLI and authenticate:
```bash
winget install --id GitHub.cli
gh auth login
```

Follow the prompts to authenticate via browser.

---

## Step 11: Verify Upload

1. Go to your GitHub repository in your browser
2. You should see all your files uploaded
3. Check that `.env` is **NOT** visible (it should be ignored)

---

## Step 12: Update Repository Settings (Optional)

### Add a Description:
1. Go to your repository on GitHub
2. Click the ⚙️ icon next to "About"
3. Add description and topics (e.g., `python`, `fastapi`, `quiz-app`)

### Add a Repository Image:
1. Upload a screenshot of your quiz app
2. Set it as the social preview image

---

## Making Future Updates

Whenever you make changes to your code:

### 1. Check what changed:
```bash
git status
```

### 2. Stage the changes:
```bash
git add .
```

Or stage specific files:
```bash
git add backend/main.py
git add frontend/script.js
```

### 3. Commit with a descriptive message:
```bash
git commit -m "Fixed CORS issue and updated frontend styling"
```

### 4. Push to GitHub:
```bash
git push
```

---

## Common Git Commands Reference

| Command | Description |
|---------|-------------|
| `git status` | Check current status and changes |
| `git add .` | Stage all changes |
| `git add <file>` | Stage specific file |
| `git commit -m "message"` | Commit staged changes |
| `git push` | Push commits to GitHub |
| `git pull` | Pull latest changes from GitHub |
| `git log` | View commit history |
| `git diff` | See what changed |
| `git branch` | List branches |
| `git checkout -b <name>` | Create new branch |

---

## Troubleshooting

### "git: command not found"

**Solution**: Git is not installed or not in PATH
- Install Git from https://git-scm.com/download/win
- Restart your terminal
- Try again

### "Permission denied (publickey)"

**Solution**: Use HTTPS instead of SSH, or set up SSH keys
- Make sure you're using the HTTPS URL: `https://github.com/...`
- Use a Personal Access Token for authentication

### "Updates were rejected because the remote contains work"

**Solution**: Pull first, then push
```bash
git pull origin main --rebase
git push
```

### ".env file is showing in git status"

**Solution**: Make sure `.gitignore` includes `.env`
```bash
echo .env >> .gitignore
git rm --cached backend/.env
git commit -m "Remove .env from tracking"
```

### "fatal: remote origin already exists"

**Solution**: Remove and re-add the remote
```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
```

---

## Security Checklist

Before pushing to GitHub, verify:

- [ ] `.env` file is in `.gitignore`
- [ ] `.env` is **NOT** showing in `git status`
- [ ] No database passwords in code
- [ ] No API keys hardcoded
- [ ] `__pycache__/` is ignored
- [ ] `node_modules/` is ignored (if applicable)

---

## Next Steps After Upload

Once your code is on GitHub:

1. ✅ **Deploy backend to Render**
   - See: `.agent/workflows/deploy-backend-render.md`
   - Render will pull code directly from your GitHub repo

2. ✅ **Deploy frontend**
   - Options: Vercel, Netlify, GitHub Pages
   - Connect your GitHub repository

3. ✅ **Set up automatic deployments**
   - Render/Vercel will auto-deploy when you push to GitHub

4. ✅ **Add a README badge**
   - Show deployment status
   - Add "Deploy to Render" button

---

## Useful GitHub Features

### GitHub Actions (CI/CD)
- Automatically run tests on push
- Auto-deploy to production
- Lint code automatically

### Issues and Projects
- Track bugs and features
- Organize development work
- Collaborate with others

### GitHub Pages
- Host your frontend for free
- Custom domain support
- Automatic HTTPS

---

## Quick Reference

### Initial Setup:
```bash
cd c:\Users\lenovo\.gemini\antigravity\scratch
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

### Regular Updates:
```bash
git add .
git commit -m "Description of changes"
git push
```

### Check Status:
```bash
git status
git log --oneline
```

---

## Resources

- **Git Documentation**: https://git-scm.com/doc
- **GitHub Guides**: https://guides.github.com
- **Git Cheat Sheet**: https://education.github.com/git-cheat-sheet-education.pdf
- **GitHub Desktop** (GUI alternative): https://desktop.github.com

---

Good luck with your upload! 🚀
