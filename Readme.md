# Seenau - Web Frontend

Seenau is a web application designed to help users improve their focus and productivity using the Pomodoro technique. This application allows users to set focus timers, manage tasks, and track their progress through an interactive dashboard. Built with React + Vite and styled with Tailwind CSS.

## ✨ Key Features

* **Custom Pomodoro Timer:** Set focus sessions (Pomodoro) and break times (Short Break) according to your needs. Choose from existing presets or create your own custom timer.
* **Task Management:** Add, edit, and delete tasks to track your work during focus sessions.
* **User Authentication:** Secure registration and login system.
* **OTP Verification:** Verify your account via email for additional security.
* **User Dashboard:**
    * View your profile summary and edit your profile.
    * Track your total focus time.
    * See the total number of tasks you have completed.
    * Visualize your weekly focus time with an interactive bar chart.
* **Landing Page:** An engaging introductory page with a typewriter effect.
* **Routing:** Smooth navigation between pages using `react-router-dom`.
* **Responsive Design:** Optimized display across various devices.

## 🚀 Technology Stack

* **Frontend:**
    * React 19
    * Vite
    * Tailwind CSS
    * React Router DOM
    * Axios (For API calls)
    * Recharts (For charts)
    * Lucide React & React Icons (For icons)
    * Typewriter Effect
    * React Cookie
* **Linting:**
    * ESLint

## 🛠️ Installation and Usage

1.  **Clone this repository:**
    ```bash
    git clone [https://github.com/thesimpanze/seenau-web-fe.git](https://github.com/thesimpanze/seenau-web-fe.git)
    cd Seenau-Web-FE-xxxxxxxxxx # Replace with the correct folder name
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173` (or another available port).

4.  **(Optional) Build for production:**
    ```bash
    npm run build
    ```

5.  **Ensure Backend is Running:** This application requires a backend API to function fully. Ensure the backend is running (likely at `http://localhost:3000`).

## 📜 Available Scripts

In the project directory, you can run:

* `npm run dev`: Runs the app in development mode.
* `npm run build`: Builds the app for production.
* `npm run lint`: Runs ESLint to check the code.
* `npm run preview`: Runs a preview of the production build.

## 🔗 API Integration

This frontend interacts with a backend API via `src/services/API.js`. It handles:

* Login, registration, logout, and token refresh.
* OTP generation and verification.
* CRUD (Create, Read, Update, Delete) operations for Tasks.
* Creation and retrieval of Pomodoro Patterns.

## 🤝 Contribution

We welcome contributions! If you would like to contribute to this project, please fork the repository and create a pull request with your changes.
