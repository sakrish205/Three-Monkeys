# 🚀 CareerPilot - Student Career Guidance Platform

## Project Overview

**CareerPilot** is an intelligent, student-centric guidance system built for the **Celestial Buildathon**. It addresses three selected problem statements to help students navigate their career preparation journey.


---

## 🎯 Selected Problem Statements

| Level | ID | Problem | Solution Feature |
|-------|-----|---------|------------------|
| 🟢 Easy | S3 | Automated Resume Review | **Resume Analyzer** |
| 🟡 Medium | M2 | Adaptive Learning Path | **Smart Learning Engine** |
| 🔴 Hard | H1 | AI-Driven Job Market Mapping | **Market Pulse AI** |

---

## 🛠️ Tech Stack (Localhost Optimized)

| Layer | Technology | Why? |
|-------|------------|------|
| **Build Tool** | Vite | ⚡ Fast dev server, instant HMR |
| **Framework** | React 18 | 🔧 Simple, no SSR complexity |
| **UI Components** | Shadcn/ui | 🎨 Beautiful, copy-paste components |
| **Theming** | TweakCN | 🌈 Custom theme generator |
| **Styling** | Tailwind CSS | 💅 Utility-first, rapid styling |
| **Language** | TypeScript | ✅ Type safety |
| **AI Mock** | Local JSON + Gemini API | 🤖 Demo data + optional AI |
| **Routing** | React Router | 🔀 Client-side navigation |
| **Charts** | Recharts | � Interactive visualizations |
| **Animations** | Framer Motion | ✨ Smooth micro-animations |
| **Icons** | Lucide React | 🎯 Consistent icon set |

> **No backend required!** All data is mocked locally for presentation.

---

## 📁 Project Structure (GitHub-Ready)

```
Three-Monkeys/
├── public/
│   ├── favicon.ico
│   └── sample-resume.pdf
├── src/
│   ├── components/
│   │   ├── ui/                    # Shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── input.tsx
│   │   │   ├── progress.tsx
│   │   │   ├── tabs.tsx
│   │   │   ├── badge.tsx
│   │   │   └── chart.tsx
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── Layout.tsx
│   │   ├── resume/
│   │   │   ├── UploadZone.tsx
│   │   │   ├── AnalysisReport.tsx
│   │   │   ├── KeywordMatcher.tsx
│   │   │   └── ATSScoreCard.tsx
│   │   ├── learning/
│   │   │   ├── SkillAssessment.tsx
│   │   │   ├── LearningPath.tsx
│   │   │   ├── ProgressTracker.tsx
│   │   │   └── ResourceCards.tsx
│   │   └── market/
│   │       ├── TrendChart.tsx
│   │       ├── SkillDemand.tsx
│   │       ├── JobAlerts.tsx
│   │       └── RecommendationPanel.tsx
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Resume.tsx
│   │   ├── Learning.tsx
│   │   └── Market.tsx
│   ├── data/                      # Mock data for demo
│   │   ├── mockResume.ts
│   │   ├── mockSkills.ts
│   │   ├── mockMarket.ts
│   │   └── mockUser.ts
│   ├── lib/
│   │   ├── resumeAnalyzer.ts
│   │   ├── learningEngine.ts
│   │   └── marketMapper.ts
│   ├── hooks/
│   │   ├── useResume.ts
│   │   ├── useLearning.ts
│   │   └── useMarket.ts
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css
│   └── types.ts
├── .gitignore
├── components.json
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 🎨 Feature Implementation Plan

### 🟢 Feature 1: Resume Analyzer (S3)

**Goal**: Automated resume review with ATS compatibility check

#### UI Components
- [ ] `UploadZone` - Drag & drop resume upload (PDF/DOCX)
- [ ] `AnalysisReport` - Detailed breakdown of resume
- [ ] `KeywordMatcher` - Role-specific keyword analysis
- [ ] `ATSScoreCard` - Visual score with improvement tips

#### Core Functionality
- [ ] PDF/DOCX text extraction
- [ ] AI-powered content analysis
- [ ] Keyword matching against job roles
- [ ] Formatting & structure evaluation
- [ ] Quantifiable achievements detection
- [ ] ATS compatibility scoring (0-100)
- [ ] Actionable improvement suggestions

#### API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/resume/analyze` | Upload & analyze resume |
| GET | `/api/resume/keywords/:role` | Get role-specific keywords |

---

### 🟡 Feature 2: Smart Learning Engine (M2)

**Goal**: Adaptive learning paths based on individual progress

#### UI Components
- [ ] `SkillAssessment` - Initial proficiency quiz
- [ ] `LearningPath` - Visual progress roadmap
- [ ] `ProgressTracker` - Real-time progress dashboard
- [ ] `ResourceCards` - Curated learning resources

#### Core Functionality
- [ ] Initial skill assessment quiz
- [ ] Personalized learning path generation
- [ ] Progress tracking with milestones
- [ ] Adaptive difficulty adjustment
- [ ] Strength/weakness identification
- [ ] Dynamic resource recommendations
- [ ] Spaced repetition for weak areas

#### API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/learning/assess` | Submit skill assessment |
| GET | `/api/learning/path/:userId` | Get personalized path |
| PUT | `/api/learning/progress` | Update progress |
| GET | `/api/learning/recommend` | Get adaptive recommendations |

---

### 🔴 Feature 3: Market Pulse AI (H1)

**Goal**: Real-time job market trends & skill demand mapping

#### UI Components
- [ ] `TrendChart` - Interactive skill demand visualization
- [ ] `SkillDemand` - Top trending skills by domain
- [ ] `JobAlerts` - Personalized market alerts
- [ ] `RecommendationPanel` - AI-driven pivot suggestions

#### Core Functionality
- [ ] Job posting data aggregation (mock/API)
- [ ] Skill demand trend analysis
- [ ] Student skill profile mapping
- [ ] AI-powered learning intervention suggestions
- [ ] Real-time alert system
- [ ] ROI estimation for skill learning
- [ ] Market forecast predictions

#### API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/market/trends` | Get current skill trends |
| GET | `/api/market/skills/:domain` | Domain-specific skills |
| POST | `/api/market/match` | Match profile to market |
| GET | `/api/market/alerts/:userId` | Get personalized alerts |

---

## 🖌️ UI/UX Design Plan

### Theme (TweakCN)
- **Primary**: Vibrant Blue (#3B82F6)
- **Secondary**: Emerald Green (#10B981)
- **Accent**: Amber (#F59E0B)
- **Background**: Dark mode with glassmorphism
- **Typography**: Inter / Outfit font family

### Design Elements
- [ ] Glassmorphism cards with blur effects
- [ ] Gradient backgrounds (mesh gradients)
- [ ] Smooth micro-animations (Framer Motion)
- [ ] Interactive charts (Recharts/Chart.js)
- [ ] Progress bars with glow effects
- [ ] Floating action buttons
- [ ] Toast notifications for alerts
- [ ] Skeleton loaders for async content

### Pages
| Page | Route | Purpose |
|------|-------|---------|
| Landing | `/` | Hero, features, CTA |
| Login | `/login` | Authentication |
| Dashboard | `/dashboard` | Overview & stats |
| Resume | `/resume` | Resume analyzer |
| Learning | `/learning` | Adaptive learning path |
| Market | `/market` | Job market insights |

---

## 💰 Revenue Generation Model (10 Marks)

### Freemium Model
| Tier | Features | Price |
|------|----------|-------|
| **Free** | 2 resume scans/month, basic learning path | ₹0 |
| **Pro** | Unlimited scans, full adaptive learning | ₹299/month |
| **Premium** | + Market AI, priority alerts, mock interviews | ₹599/month |

### Additional Revenue Streams
1. **B2B College Partnerships** - Bulk licensing for placement cells
2. **Job Board Integration** - Referral fees from company placements
3. **Resume Writing Services** - Premium human-reviewed resumes
4. **Sponsored Resources** - Course platform partnerships (Coursera, Udemy)

---

## 📋 Implementation Phases

### Phase 1: Foundation (Day 1)
- [ ] Initialize Next.js project with boilerplate
- [ ] Set up Shadcn/ui components
- [ ] Configure TweakCN theme
- [ ] Create base layout (Header, Sidebar, Footer)
- [ ] Set up routing structure

### Phase 2: Resume Analyzer (Day 1-2)
- [ ] Build upload zone component
- [ ] Implement text extraction logic
- [ ] Create analysis API endpoint
- [ ] Build analysis report UI
- [ ] Add ATS scoring visualization

### Phase 3: Learning Engine (Day 2-3)
- [ ] Create skill assessment quiz
- [ ] Build learning path generator
- [ ] Implement progress tracking
- [ ] Create adaptive recommendation logic
- [ ] Build resource card components

### Phase 4: Market AI (Day 3-4)
- [ ] Create mock job market data
- [ ] Build trend visualization charts
- [ ] Implement skill-demand mapping
- [ ] Create alert system
- [ ] Build recommendation panel

### Phase 5: Polish & Deploy (Day 4)
- [ ] Add animations and transitions
- [ ] Optimize performance
- [ ] Test all features
- [ ] Deploy to Vercel
- [ ] Prepare presentation

---

## ✅ Verification Plan

### Automated Tests
```bash
# Run unit tests
npm run test

# Run E2E tests (if using Playwright/Cypress)
npm run test:e2e
```

### Manual Testing Checklist
1. **Resume Upload**: Upload PDF/DOCX → Verify text extraction → Check analysis report
2. **ATS Score**: Upload sample resume → Verify scoring logic → Check keyword suggestions
3. **Learning Path**: Complete skill quiz → Verify personalized path → Track progress updates
4. **Market Trends**: Load market page → Verify charts render → Check trend data accuracy
5. **Responsive Design**: Test on mobile, tablet, desktop breakpoints
6. **Dark Mode**: Toggle theme → Verify all components adapt

### Browser Testing
- Chrome, Firefox, Safari, Edge
- Mobile responsiveness via DevTools

---

## 🚀 Getting Started (After Plan Approval)

```bash
# Clone and install
git clone <repo-url>
cd career-pilot
npm install

# Set up environment
cp .env.example .env.local
# Add API keys

# Run development server
npm run dev

# Open browser
# http://localhost:3000
```

---

## 📝 Commands Reference (Localhost)

| Command | Description |
|---------|-------------|
| `npm create vite@latest . -- --template react-ts` | Initialize Vite + React + TS |
| `npx shadcn@latest init` | Setup Shadcn/ui |
| `npx shadcn@latest add button card dialog input tabs progress badge` | Add components |
| `npm install react-router-dom recharts framer-motion lucide-react` | Add dependencies |
| `npm run dev` | Start dev server (http://localhost:5173) |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |

### Quick Start Commands

```bash
# 1. Initialize Vite project
npm create vite@latest . -- --template react-ts

# 2. Install dependencies
npm install

# 3. Setup Shadcn/ui
npx shadcn@latest init

# 4. Add UI components
npx shadcn@latest add button card dialog input tabs progress badge chart

# 5. Install additional packages
npm install react-router-dom recharts framer-motion lucide-react

# 6. Start development server
npm run dev
```

### Localhost Access
- **Dev Server**: `http://localhost:5173`
- **Hot Reload**: Instant updates on save
- **No build step**: Just run and present!

---

## � 5-Step Git Commit Workflow

**Repository**: `https://github.com/sakrish205/Three-Monkeys.git`

### Step 1: Foundation Setup
**Commit Message**: `🎉 feat: initialize Next.js project with Shadcn/ui and TweakCN theme`

**What to commit**:
- Next.js boilerplate initialization
- Shadcn/ui configuration (`components.json`)
- TweakCN theme setup
- Tailwind CSS configuration
- Base layout components (Header, Sidebar, Footer)
- Landing page structure

```bash
git init
git remote add origin https://github.com/sakrish205/Three-Monkeys.git
git add .
git commit -m "🎉 feat: initialize Next.js project with Shadcn/ui and TweakCN theme"
git push -u origin main
```

---

### Step 2: Resume Analyzer Feature (S3)
**Commit Message**: `✨ feat(resume): add automated resume review with ATS scoring`

**What to commit**:
- Resume upload zone component
- PDF/DOCX text extraction logic
- Resume analysis API endpoint
- ATS compatibility scoring
- Keyword matching functionality
- Analysis report UI components

```bash
git add .
git commit -m "✨ feat(resume): add automated resume review with ATS scoring"
git push origin main
```

---

### Step 3: Smart Learning Engine (M2)
**Commit Message**: `✨ feat(learning): add adaptive learning path with progress tracking`

**What to commit**:
- Skill assessment quiz component
- Learning path generator
- Progress tracking dashboard
- Adaptive recommendation engine
- Resource cards component
- Learning API endpoints

```bash
git add .
git commit -m "✨ feat(learning): add adaptive learning path with progress tracking"
git push origin main
```

---

### Step 4: Market Pulse AI (H1)
**Commit Message**: `✨ feat(market): add AI-driven job market mapping and trend analysis`

**What to commit**:
- Trend visualization charts
- Skill demand analyzer
- Job market data aggregation
- Real-time alert system
- AI recommendation panel
- Market API endpoints

```bash
git add .
git commit -m "✨ feat(market): add AI-driven job market mapping and trend analysis"
git push origin main
```

---

### Step 5: Polish & Documentation
**Commit Message**: `💄 chore: add animations, optimize performance, and finalize docs`

**What to commit**:
- Framer Motion animations
- Micro-interactions and hover effects
- Performance optimizations
- Complete README.md
- Environment variables example
- Final UI polish

```bash
git add .
git commit -m "💄 chore: add animations, optimize performance, and finalize docs"
git push origin main
```

---

### Quick Reference Commands

```bash
# Clone existing repo (if needed)
git clone https://github.com/sakrish205/Three-Monkeys.git
cd Three-Monkeys

# Check status before each commit
git status

# View commit history
git log --oneline

# Create feature branch (optional)
git checkout -b feature/resume-analyzer
git push -u origin feature/resume-analyzer
```

---

## �📌 Notes

- This plan covers **all 3 selected problem statements** in one integrated platform
- The architecture supports future expansion for remaining problems (S1, S2, S4, S5, M1, M3, H2)
- AI integrations can use mock data initially, then connect to real APIs
- Focus on **stunning UI** for the 10 marks allocated to design

---

**Ready to implement after your approval! 🎉**
