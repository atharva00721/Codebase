# Codebase AI

> **⚠️ Work in Progress**  
> This project is currently under development. Some features may be incomplete or in testing.

**Codebase AI** is an AI-powered web application that connects to GitHub repositories, summarizes commit histories, and provides insights into code usage. The app leverages cutting-edge technologies like Gemini, Assembly AI, and Octokit to enable efficient navigation, understanding, and exploration of complex codebases. Users can also interact with an AI chatbot to ask questions about repositories, files, and project contexts.

## Features

- **AI-Powered Commit Summaries**: Automatically summarizes commit messages and provides detailed insights into code changes.
- **GitHub Integration**: Seamlessly connects to GitHub repositories using the Octokit API.
- **AI Chatbot**: Interact with an AI chatbot to ask questions about the repository and understand where files are used.
- **Modern User Interface**: Designed with ShadCN for a responsive and user-friendly UI experience.
- **Database Management**: Built using NeonDB and Prisma for high-performance data management.
- **Natural Language Processing**: Powered by Assembly AI and Gemini for intelligent commit summaries and user interactions.

## Tech Stack

- **Next.js 15**: For building the server-side rendered web app.
- **Gemini**: Used for generating intelligent commit summaries.
- **Assembly AI**: Integrated for natural language processing and chatbot interactions.
- **Octokit**: GitHub API client for seamless repository integration.
- **NeonDB**: Managed database for fast and scalable data storage.
- **Prisma**: ORM for database management and query building.
- **ShadCN**: UI framework for building modern, responsive interfaces.

## Setup and Installation

To get started with **Codebase AI**, follow these steps:

### Prerequisites

- Node.js (version 18 or higher)
- A GitHub account and a personal access token to connect to repositories
- A NeonDB account (for database management)

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/codebase-ai.git
cd codebase-ai
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root of the project and add the following variables:

```env
NEXT_PUBLIC_GITHUB_TOKEN=your_github_token
DATABASE_URL=your_neondb_connection_string
ASSEMBLY_AI_API_KEY=your_assembly_ai_api_key
```

### 4. Run the application locally

```bash
npm run dev
```

This will start the application locally at `http://localhost:3000`.

## Usage

- **Browse Repositories**: Connect to your GitHub account and select repositories to explore.
- **View Commit Summaries**: Navigate through commits and see AI-generated summaries of the changes.
- **Ask the AI Chatbot**: Interact with the chatbot to ask about repository files, usage, and project context.

## Contributing

We welcome contributions to improve **Codebase AI**! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to the branch (`git push origin feature-name`).
6. Open a pull request.



