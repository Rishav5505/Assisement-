# FinDashboard - Premium Finance Management

A modern, responsive finance dashboard built with React.js and Tailwind CSS 4, localized for the Indian market.

## Features

- **Dashboard Overview**: Summary cards for Balance, Income, and Expenses (in ₹ INR).
- **Localized for India**: Uses `₹` currency symbol and Indian numbering system (Lakhs/Crores).
- **Data Visualization**: Interactive Line and Pie charts using Recharts with 30-day trend analysis.
- **Transaction Management**:
  - Full CRUD for transactions (Local storage persistence).
  - Search by category or description.
  - Filter by type (Income/Expense).
  - Sort by date or amount.
- **Role-Based Access Control**:
  - **Admin**: Full access to add, edit, and delete transactions.
  - **Viewer**: Read-only access to the dashboard and transactions.
- **Insights Panel**: Automated calculations for top spending category, expense ratio, and more.
- **Modern UI/UX**:
  - Dark Mode support with system preference memory.
  - Glassmorphism effects and smooth animations with Framer Motion.
  - Fully responsive design (Desktop & Mobile).
  - High-quality icons via Lucide-React.

## Tech Stack

- **Framework**: React.js 19
- **Styling**: Tailwind CSS 4 (Next-gen CSS engine)
- **Charts**: Recharts
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Date Handling**: Date-fns
- **State Management**: React Context API + Hooks

## Getting Started

### Prerequisites

- Node.js (Latest LTS recommended)
- npm or yarn

### Installation & Development

1. Navigate to the project directory:
   ```bash
   cd vite-project
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to the URL shown in the terminal (usually `http://localhost:5173`).

### Project Structure

- `src/components`: UI components (Cards, Table, Charts, Sidebar, Modals).
- `src/context`: FinanceContext for global state management.
- `src/data`: Mock data and category constants.
- `src/App.jsx`: Main application layout and assembly.
- `src/index.css`: Tailwind 4 configuration and global styles.

## License

© 2026 FinDash. MIT License.
