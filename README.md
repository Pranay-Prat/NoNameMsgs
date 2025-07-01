# No Name Msgs

No Name Msgs is an anonymous messaging website designed for collecting honest feedback, suggestions, and messages from others without revealing their identity. It is ideal for personal feedback, team retrospectives, or open communication channels where privacy is valued.

This is a modern web application built with Next.js, TypeScript, and a modular folder structure. The project features authentication, messaging, and user verification functionalities, making it a great starting point for scalable web apps.

## Features
- User authentication (sign up, sign in, email verification)
- Messaging system (send, receive, delete messages)
- Modular and scalable codebase
- API routes for backend logic
- Modern UI components

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or above recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation
1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```
2. **Install dependencies:**
   ```sh
   npm install
   # or
   yarn install
   ```
3. **Set up environment variables:**
   - Copy `.env.example` to `.env` and fill in the required values.

4. **Run the development server:**
   ```sh
   npm run dev
   # or
   yarn dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the app.

## Project Structure
- `src/app/` - Main application pages and routes
- `src/components/` - Reusable UI components
- `src/context/` - React context providers
- `src/helpers/` - Helper functions
- `src/lib/` - Library utilities (e.g., database connection)
- `src/model/` - Data models
- `src/schemas/` - Validation schemas
- `src/types/` - TypeScript types
- `public/` - Static assets

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

Please make sure to update tests as appropriate and follow the code style used in the project.

---
Feel free to open issues or submit pull requests for improvements!
