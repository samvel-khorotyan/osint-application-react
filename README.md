# OSINT Web Application Frontend

This README outlines the frontend component of the OSINT Web Application, built with React and Material-UI (MUI).  It provides a user interface for interacting with the backend API to initiate and view domain scans.

## Features

*   **Domain Scan Initiation:** Allows users to input a domain name and start a new scan. Includes options for timeout duration and passive scanning.
*   **Scan Display:**  Displays a list of past and current scans with details such as domain, tool used, start/end times, and status.
*   **Scan Details Page:** Shows comprehensive information about a specific scan, including subdomains, IP addresses, and raw output (if available).  Accessible via a direct URL (e.g., `/scans/123`).
*   **Drag-and-Drop Reordering:**  Allows users to reorder scan cards by dragging and dropping. The new order is persisted via the backend API.
*   **Responsive Design:** Adapts to different screen sizes.
*   **Loading Indicators:**  Displays loading spinners while fetching data or waiting for scan results.
*   **Error Handling:**  Displays error messages for failed API calls or validation errors.
*   **Navigation:**  Uses React Router for client-side routing between the home page (scan list) and individual scan detail pages.
* **Theming**: Includes basic theming using MUI.
*   **Nginx Configuration:** Includes an Nginx configuration file for serving the built React application and proxying API requests to the backend.

## Technologies Used

*   **React:**  JavaScript library for building user interfaces.
*   **Material-UI (MUI):**  React component library for UI elements.
*   **React Router:**  For client-side routing.
*   **Axios:**  For making HTTP requests to the backend API.
*   **date-fns:**  For formatting dates and times.
*   **Custom Hooks:** `useScans` and `useDragAndDrop` for managing state and drag-and-drop functionality.
*   **Nginx:** Web server for serving the static files and proxying API requests.
*   **Docker:** Containerization for easy deployment.
*   **Environment Variables:**  Uses environment variables to configure the API base URL.

## Project Structure

The project follows a typical React application structure:

*   `src/`: Contains the source code.
    *   `components/`: Reusable UI components.
        *   `Header.tsx`:  Application header.
        *   `LoadingSpinner.tsx`:  Loading indicator component.
        *   `ScanCard.tsx`:  Displays a single scan.
        *   `ScanForm.tsx`:  Modal form for initiating a new scan.
        *   `ScanGrid.tsx`:  Displays a grid of scan cards.
    *   `hooks/`: Custom React hooks.
        *   `useDragAndDrop.tsx`:  Handles drag-and-drop reordering.
        *   `useScans.tsx`:  Manages scan data fetching, creation, and updates.
    *   `pages/`:  Page components.
        *   `HomePage.tsx`:  Displays the scan list and new scan button.
        *   `NotFoundPage.tsx`:  404 error page.
        *   `ScanDetailsPage.tsx`:  Displays details for a single scan.
    *   `services/`:  API interaction logic.
        *   `api.ts`:  Functions for making API requests.
    *   `types/`: TypeScript type definitions.
        *   `index.ts`:  Defines types like `Scan`, `ScanRequest`, `ScanStatus`, etc.
    *   `App.tsx`:  Main application component, including routing and theme setup.
    *   `index.css`:  Global styles.
    *   `index.tsx`:  Entry point for the React application.
    *   `reportWebVitals.ts`: Performance reporting setup (optional).
    *  `App.test.tsx`: basic App test file.
    *   `nginx/`: Nginx configuration.
        *   `nginx.conf`:  Nginx configuration file.
*   `public/`: Static assets.
* `Dockerfile`: Instructions for building a container.

## Prerequisites

*   **Node.js (v16+ recommended):**  Required for running the application and managing dependencies.
*   **npm (or yarn):**  Package manager (npm comes with Node.js).
*   **Docker (optional):**  For containerized deployment.

## Setup and Running

1.  **Clone the Repository:**

    ```bash
    git clone <repository_url>
    cd <repository_directory>
    ```

2.  **Install Dependencies:**

    ```bash
    npm install
    ```

3.  **Environment Variables:**

    Create a `.env` file in the root of the `frontend` directory:

    ```
    REACT_APP_API_URL=http://localhost:8080/api
    ```

    This sets the base URL for the backend API.  Adjust this if your backend is running on a different host or port.

4.  **Run the Development Server:**

    ```bash
    npm start
    ```

    This will start the React development server, typically on `http://localhost:3000`. The page will reload if you make edits.

5.  **Build for Production:**

    ```bash
    npm run build
    ```
    This creates an optimized production build in the `build` directory.

6.  **Running with Nginx (locally):**

    *   Make sure you have Nginx installed.
    *   Copy the contents of the `build` folder to your Nginx web root (e.g., `/usr/share/nginx/html`).
    *   Copy the provided `nginx/nginx.conf` file to your Nginx configuration directory (e.g., `/etc/nginx/conf.d/default.conf`).
    *   Reload Nginx: `nginx -s reload`

7.  **Running with Docker:**
    * Create a .env file and fill it as shown in point 3.

    ```bash
    docker build -t osint-frontend .
    docker run -d -p 3000:80 --name osint-frontend-container --env-file ./.env osint-frontend
    ```
    This builds a Docker image and runs a container, exposing port 3000.

8.  **Running using docker compose (Recommended):**

    If you have the backend and the front end in the same directory, you can use the docker-compose file provided to run both the backend and front end with a single command.
    ```bash
    docker-compose up -d
    ```
    This command will start the front-end service, the backend service, and the database, as defined in the `docker-compose.yml` file.

## Nginx Configuration

The `nginx/nginx.conf` file provides a basic Nginx configuration:

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://127.0.0.1:8080/api;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}