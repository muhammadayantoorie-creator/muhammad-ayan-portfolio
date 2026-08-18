# Muhammad Ayan | Portfolio

A responsive personal portfolio for **Muhammad Ayan**, a BS Artificial Intelligence student and Python & Generative AI developer in Islamabad, Pakistan. The site presents work in Python web development, Generative AI, machine learning for cybersecurity, and an emerging focus on AI security engineering.

## What this portfolio includes

- A responsive, single-page portfolio for desktop and mobile
- A profile hero with a 3D orbit for Python, Generative AI, Machine Learning, and AI Security
- Professional summary, technical skillset, experience, education, certificates, and contact details
- Filterable project cards with source-code links and expandable case studies
- Theme and motion controls with reduced-motion support
- A clean, in-page PDF resume viewer and direct resume download links
- Smooth section reveals, interactive cards, and subtle depth effects

## Featured projects

| Project | Focus | Technology |
| --- | --- | --- |
| [Calendar Conflict Resolver Agent](https://github.com/muhammadayantoorie-creator/Calender_Conflict_Resolver_Agent) | AI-assisted calendar scheduling and conflict resolution | Python, AI agents |
| [WhatsApp Notification Router AI Agent](https://github.com/muhammadayantoorie-creator/Whatsapp_Notification_router_AI_Agent) | Intelligent notification prioritisation and routing | TypeScript, AI agents |
| [MCP-Nexus](https://github.com/muhammadayantoorie-creator/MCP-Nexus) | Model Context Protocol exploration and AI-system coordination | Python, MCP |
| [ScarpeHub](https://github.com/muhammadayantoorie-creator/ScarpeHub) | Structured web-data collection and aggregation | Python, Selenium |

## Technology stack

- **Frontend:** React 17, JavaScript, HTML, CSS
- **UI:** React Bootstrap, Bootstrap, React Icons
- **Animation:** Framer Motion, Typewriter Effect, tsParticles, React Parallax Tilt
- **Resume viewer:** React PDF and PDF.js
- **Testing:** Jest, React Testing Library
- **Build tooling:** Create React App and npm

## Run locally

### Prerequisites

- Node.js 16 or later
- npm

### Installation

```bash
git clone https://github.com/muhammadayantoorie-creator/muhammad-ayan-portfolio.git
cd muhammad-ayan-portfolio
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

On Windows PowerShell, use `npm.cmd` if PowerShell blocks `npm.ps1`:

```powershell
npm.cmd start
```

## Available scripts

| Command | Description |
| --- | --- |
| `npm start` | Starts the development server. |
| `npm test -- --watchAll=false` | Runs the automated test suite once. |
| `npm run build` | Creates an optimised production build in `build/`. |

## Resume management

The resume PDF is stored in `src/Assets/muhammad-ayan-resume.pdf` and rendered in the portfolio with React PDF. The PDF.js worker required by the viewer is stored at `public/pdf.worker.min.js`.

To replace the resume, overwrite the PDF at the same path, then run:

```bash
npm run build
```

## Project structure

```text
src/
|- Assets/                # Profile image, resume, and certificate assets
|- components/
|  |- About/              # Summary and skillset
|  |- Certificates/       # Certificate catalogue
|  |- Experiences/        # Experience and education timeline
|  |- Home/               # Hero, focus areas, and contact call-to-action
|  |- Projects/           # Project cards and filtering
|  `- Resume/             # Resume viewer and download controls
|- App.js                 # Application shell and routes
`- style.css              # Shared visual system and responsive styles

public/
|- certificates/          # Certificate images
`- pdf.worker.min.js      # PDF.js worker for the resume viewer
```

## Deployment

Create a production build before deploying to any static host:

```bash
npm run build
```

Deploy the generated `build/` folder using your preferred static hosting provider, such as Vercel, Netlify, GitHub Pages, or Cloudflare Pages.

## Contact

- Email: [muhammadayantoorie@gmail.com](mailto:muhammadayantoorie@gmail.com)
- GitHub: [@muhammadayantoorie-creator](https://github.com/muhammadayantoorie-creator)
- LinkedIn: [Muhammad Ayan](https://www.linkedin.com/in/muhammad-ayan-84b605380/)

---

Built and maintained by Muhammad Ayan.
