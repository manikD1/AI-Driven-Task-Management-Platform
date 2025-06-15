# TodoList MERN Stack Application

A full-stack TodoList application built with the MERN stack (MongoDB, Express.js, React, Node.js), featuring a modern dark theme UI, AI-powered task management, and user authentication.

## 🚀 Live Demo

[mern-todolist-ai.vercel.app](https://mern-todolist-ai.vercel.app)

## 🌟 Features

### Frontend
- **Modern UI/UX**
  - Dark theme with glass-morphism effects
  - Responsive design for all devices
  - Smooth animations and transitions
  - Intuitive task management interface

- **Task Management**
  - Create, read, update, and delete tasks
  - Mark tasks as complete/incomplete
  - Filter tasks by status (All/Active/Completed)
  - Clear all tasks functionality

- **AI Integration**
  - AI-powered task refinement
  - Smart task suggestions
  - Natural language processing for better task descriptions

- **User Authentication**
  - Secure login and registration
  - JWT-based authentication
  - Protected routes
  - Persistent sessions

### Backend
- **RESTful API**
  - CRUD operations for todos
  - User authentication and authorization
  - Protected routes
  - Error handling middleware

- **Database**
  - MongoDB Atlas cloud database
  - Mongoose ODM
  - Data validation
  - Timestamps for todos

- **Security**
  - JWT authentication
  - Password hashing with bcrypt
  - CORS configuration
  - Environment variables

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS 4
- **Routing**: React Router DOM 7
- **HTTP Client**: Axios
- **Code Quality**: ESLint

### Backend
- **Runtime**: Node.js
- **Framework**: Express 5
- **Database**: MongoDB Atlas
- **ODM**: Mongoose 8
- **Authentication**: JWT, bcryptjs
- **AI**: OpenAI API

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/manikD1/mern-todolist-ai.git
   cd todolist-app
   ```

2. **Frontend Setup**
   ```bash
   # Install frontend dependencies
   npm install

   # Create frontend environment file
   # Create .env in root directory:
   VITE_API_URL=http://localhost:3000/api
   ```

3. **Backend Setup**
   ```bash
   # Go to server directory
   cd server

   # Install backend dependencies
   npm install

   # Create backend environment file
   # Create .env in server directory:
   PORT=3000
   NODE_ENV=development
   MONGODB_URI=your_mongodb_atlas_connection_string
   FRONTEND_URL=http://localhost:5173
   JWT_SECRET=your_jwt_secret
   AI_API_KEY=your_openai_api_key
   ```

4. **Start Development Servers**
   ```bash
   # Start backend server (from server directory)
   npm run dev

   # Start frontend server (from root directory)
   npm run dev
   ```

## 📦 Project Structure

```
todolist-app/
├── src/                # Frontend source code
│   ├── components/     # Reusable UI components
│   ├── pages/         # Page components
│   └── utils/         # Utility functions
├── server/            # Backend source code
│   ├── models/        # Database models
│   ├── routes/        # API routes
│   └── middleware/    # Custom middleware
├── public/            # Static assets
└── package.json       # Frontend dependencies
```

## 🔧 Available Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Backend
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Todos
- `GET /api/todos` - Get all todos
- `POST /api/todos` - Create new todo
- `PUT /api/todos/:id` - Update todo
- `DELETE /api/todos/:id` - Delete todo

### AI Features
- `POST /api/ai/refine-task` - Refine task description
- `POST /api/ai/suggest-tasks` - Get task suggestions

## 🔐 Environment Variables

### Frontend
- `VITE_API_URL`: Backend API URL
  - Development: `http://localhost:3000/api`
  - Production: `https://your-railway-backend-url/api`

### Backend
- `PORT`: Server port (default: 3000)
- `NODE_ENV`: Environment (development/production)
- `MONGODB_URI`: MongoDB connection string
- `FRONTEND_URL`: Frontend URL for CORS
- `JWT_SECRET`: Secret for JWT tokens
- `OPENAI_API_KEY`: OpenAI API key

## 🌐 Deployment

### Frontend
- Deployed on Vercel
- Production URL: [mern-todolist-ai.vercel.app](https://mern-todolist-ai.vercel.app)
- Environment variables configured in Vercel dashboard

### Backend
- Deployed on Railway
- Production URL: [mern-todolist-ai-production.up.railway.app](https://mern-todolist-ai-production.up.railway.app)
- Environment variables configured in Railway dashboard

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.
