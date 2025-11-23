# HTTP-Server Starter (Static HTML/CSS/JS)

This repo is a minimal Codespaces-ready template for **static sites** that run via the **npm http-server** package.

## Quick Start (in Codespaces)
1. Click **Code → Codespaces → Create codespace on main**.
2. Terminal:
   ```bash
   npm start
   ```
3. Click **Open in Browser** when port 3000 appears (serves files from `public/`).

## Folder structure
| Path | Purpose |
|------|----------|
| `public/` | All static site files go here |
| `index.html` | Home page |
| `style.css` | Styles |
| `script.js` | JavaScript logic |

## Local run (without Codespaces)
```bash
npm install
npm start
# then open http://localhost:3000
```

## Notes
- Not configured for server-side JS `http-server` just serves static files a la Python’s `python3 -m http.server`.
- Don’t enable GitHub Pages for submitted work (Pages sites are public even if the repo is private).

## Creating Your Private Repository for CS248 Assignments

You will start each project from a **template repository** provided in our class organization.

Follow these steps carefully to create your own private copy:

1. Go to the assignment’s suggested starter code template   
   (this one for fifteeen puzzle)

2. Click the **green “Use this template”** button near the top right.

3. In the **“Create a new repository”** dialog:
   - **Owner:** choose **`edmonds-college-cs248-f25`** (our class organization)  
      *Don't select your personal account — all submissions must be created under the organization so your instructor can view and grade them.*
   - **Repository name:** use the required naming format  
     ```
     p4-fifteenpuzzle-<yourgithubusername>
     ```
     Example:  
     ```
     p4-fifteenpuzzle-jdoe
     ```
   - **Visibility:** select **Private**  
     *(so only you and the instructor can see it).*

4. Click **Create repository from template**.

5. Once created:
   - You’ll be taken to your new repo page within the class organization.  
   - Click **“Create codespace on main”** to start working, or clone it locally if you prefer.

6. When you’re done:
   - Commit and push your changes.  
   - In Canvas, submit **only the repository name**, *not the full link*.  
     Example:  
     ```
     p4-fifteenpuzzle-jdoe
     ```

---

*Tip:* If you accidentally created the repo under your personal account, delete it and repeat the steps above — making sure the owner is set to `edmonds-college-cs248-f25`.

