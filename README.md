# Wishestra [DEMO](https://lvlashnin.github.io/Wishestra/)

Welcome to Wishestra! A simple and elegant application to manage your wishlist. Keep track of all the things you desire, sort them, and find them easily.

## ✨ Features

- **Add & Manage Wishes**: Easily add new wishes with a title, description, price, and a representative icon.
- **Edit & Delete**: Update wish details or remove them from your list.
- **Dynamic Search**: Quickly find any wish by searching for its title.
- **Flexible Sorting**: Organize your list by creation date (newest or oldest) or by price (high-to-low or low-to-high).
- **Dark/Light Mode**: Switch between a light and dark theme for your viewing comfort.
- **Responsive Design**: A clean and modern UI that works beautifully on both desktop and mobile devices.

## 🛠️ Tech Stack

- **Frontend**: [React](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **State Management**: React Context API
- **Mock Backend**: [json-server](https://github.com/typicode/json-server)

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) (version 18 or later) and a package manager like [npm](https://www.npmjs.com/) installed on your system.

### Installation

1.  **Clone the repository** (if you haven't already):

    ```bash
    git clone <your-repository-url>
    cd Wishestra
    ```

2.  **Install project dependencies**:
    ```bash
    npm install
    ```

### Running the Application

This application requires two processes to be running simultaneously: the mock backend server and the frontend development server.

#### 1. Run the Backend

The application uses `json-server` to simulate a REST API.

1.  **Install `json-server`** (if you don't have it):

    ```bash
    npm install -g json-server
    ```

2.  **Start the server**. In the root of your project, run the following command. This will watch the `db.json` file and serve its content on `http://localhost:3000`.
    ```bash
    json-server --watch db.json
    ```
    _You should see a message confirming that the server is running._

#### 2. Run the Frontend

1.  **Open a new terminal window** and navigate to the project directory.

2.  **Start the React development server**:

    ```bash
    npm run dev
    ```

3.  **Open your browser** and navigate to the URL provided in the terminal (usually `http://localhost:5173`). You should now see the Wishestra application running!
