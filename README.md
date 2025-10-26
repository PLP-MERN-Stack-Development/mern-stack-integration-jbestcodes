# JBest Eyes - Personal Blog Application

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) blog application that showcases daily life adventures, business explorations, coding journeys, and parenting experiences.

## 🌟 Features

### Core Functionality
- **Full CRUD Operations**: Create, read, update, and delete blog posts
- **Category Management**: Organize posts by topics (Daily Life, Business, Coding, Parenting, etc.)
- **Search & Filter**: Find posts by title, content, or category
- **Responsive Design**: Works seamlessly on desktop and mobile devices

### Advanced Features
- **Comments System**: Readers can engage with posts through comments
- **Image Upload**: Upload and display nature photos and other images
- **View Tracking**: Monitor post popularity with view counts
- **Pagination**: Efficient browsing through large collections of posts
- **Real-time Updates**: Optimistic UI updates for better user experience

### Technical Highlights
- RESTful API design with proper error handling
- Input validation using express-validator
- Custom React hooks for API calls
- Responsive CSS with modern design patterns
- MongoDB integration with Mongoose ODM
- File upload with Multer middleware

## 🛠️ Technology Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **MongoDB** - Database (using MongoDB Atlas)
- **Mongoose** - ODM for MongoDB
- **Multer** - File upload middleware
- **Express-validator** - Input validation
- **CORS** - Cross-origin resource sharing
- **Dotenv** - Environment variables

### Frontend
- **React.js** - User interface library
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API calls
- **Vite** - Build tool and development server
- **Custom CSS** - Responsive styling

## 📁 Project Structure

```
jbest-eyes-blog/
├── client/                 # React frontend
│   ├── public/             # Static files
│   ├── src/
│   │   ├── components/     # Reusable React components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── services/       # API service layer
│   │   ├── App.jsx         # Main application component
│   │   ├── main.jsx        # Application entry point
│   │   └── index.css       # Global styles
│   ├── package.json        # Client dependencies
│   └── vite.config.js      # Vite configuration
├── server/                 # Express.js backend
│   ├── config/             # Database configuration
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Custom middleware
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── uploads/            # Uploaded images
│   ├── server.js           # Main server file
│   └── package.json        # Server dependencies
## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account (or local MongoDB installation)
- Git
- Text editor (VS Code recommended)

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd mern-stack-integration-jbestcodes
   ```

2. **Set up the server**
   ```bash
   cd server
   npm install
   ```

3. **Configure environment variables**
   - Copy `server/.env.example` to `server/.env`
   - Update the environment variables:
   ```env
   PORT=5000
   MONGODB_URI=mongodb+srv://your_username:your_password@cluster0.xxxxx.mongodb.net/jbest-eyes-blog?retryWrites=true&w=majority
   JWT_SECRET=your_super_secret_jwt_key_here
   NODE_ENV=development
   ```

4. **Set up the client**
   ```bash
   cd ../client
   npm install
   ```

5. **Configure client environment variables**
   - Copy `client/.env.example` to `client/.env`
   ```env
   VITE_API_URL=/api
   ```

6. **Seed the database with sample data**
   ```bash
   cd server
   npm run seed
   ```

### Running the Application

1. **Start the server** (in the server directory)
   ```bash
   npm run dev
   ```
   Server will run on http://localhost:5000

2. **Start the client** (in the client directory)
   ```bash
   npm run dev
   ```
   Client will run on http://localhost:3000 (or next available port)

3. **Access the application**
   - Open your browser and navigate to the client URL (shown in terminal)
   - The API will be available at http://localhost:5000/api

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Posts Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/posts` | Get all posts (with pagination, filtering, search) |
| GET    | `/posts/:id` | Get a specific post by ID |
| POST   | `/posts` | Create a new post |
| PUT    | `/posts/:id` | Update a post |
| DELETE | `/posts/:id` | Delete a post |
| POST   | `/posts/:id/comments` | Add a comment to a post |

### Categories Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/categories` | Get all categories |
| GET    | `/categories/:id` | Get a specific category |
| POST   | `/categories` | Create a new category |
| PUT    | `/categories/:id` | Update a category |
| DELETE | `/categories/:id` | Delete a category |

### Upload Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | `/upload/image` | Upload an image file |

### Query Parameters for Posts

- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `category` - Filter by category ID
- `search` - Search in title and content

### Example API Calls

**Get all posts:**
```javascript
GET /api/posts?page=1&limit=6&category=60f1b2b3c4d5e6f7a8b9c0d1
```

**Create a new post:**
```javascript
POST /api/posts
Content-Type: application/json

{
  "title": "My Daily Adventure",
  "content": "Today I explored...",
  "category": "60f1b2b3c4d5e6f7a8b9c0d1",
  "tags": ["daily-life", "adventure"],
  "featuredImage": "http://localhost:5000/uploads/image-123456789.jpg"
}
```

## 🎨 Key Components

### React Components

- **Header** - Blog title and description
- **Navigation** - Menu with links to different pages
- **PostCard** - Individual post preview cards
- **PostDetail** - Full post view with comments
- **CreatePost/EditPost** - Forms for creating and editing posts
- **CommentForm/CommentList** - Comment functionality
- **ImageUpload** - File upload for featured images
- **LoadingSpinner** - Loading states
- **Categories** - Category management

### Custom Hooks

- **useApi** - Generic API call hook with loading/error states
- **usePosts** - Hook for fetching and managing posts
- **usePost** - Hook for fetching single post
- **useCategories** - Hook for fetching categories

### Backend Controllers

- **postController** - Handles all post-related operations
- **categoryController** - Manages blog categories
- **uploadController** - Handles file uploads

## 📝 Database Schema

### Post Model
```javascript
{
  title: String (required, max 100 chars),
  content: String (required),
  excerpt: String (max 200 chars),
  featuredImage: String,
  category: ObjectId (ref: 'Category'),
  tags: [String],
  viewCount: Number (default: 0),
  comments: [{
    author: String (required),
    content: String (required),
    createdAt: Date
  }],
  createdAt: Date,
  updatedAt: Date
}
```

### Category Model
```javascript
{
  name: String (required, unique, max 50 chars),
  description: String (max 200 chars),
  color: String (hex color, default: '#3B82F6'),
  postCount: Number (default: 0),
  createdAt: Date,
  updatedAt: Date
}
```

## 🔧 Development Features

### Input Validation
- Server-side validation using express-validator
- Client-side form validation
- File type and size validation for uploads

### Error Handling
- Centralized error handling middleware
- User-friendly error messages
- Proper HTTP status codes

### Performance Optimizations
- Pagination for large datasets
- Image optimization and size limits
- Efficient database queries with population

## 🌐 Deployment

### Environment Setup
1. Set up MongoDB Atlas cluster
2. Configure environment variables for production
3. Build the client for production:
   ```bash
   cd client
   npm run build
   ```

### Production Considerations
- Set NODE_ENV to 'production'
- Use proper MongoDB connection string
- Configure CORS for your domain
- Set up proper file storage (AWS S3, Cloudinary, etc.)

## ✅ Submission Checklist

Before submitting your assignment, ensure you have:

### 📁 **Code & Configuration**
- ✅ Complete client and server code
- ✅ `.env.example` files for both client and server (without real credentials)
- ✅ `.gitignore` files to protect sensitive information
- ✅ `package.json` with all dependencies listed
- ✅ All API endpoints implemented and working

### 📚 **Documentation**  
- ✅ Updated README.md with project overview
- ✅ Setup instructions (this file)
- ✅ API documentation with endpoint descriptions
- ✅ Features list and technology stack

### 📸 **Screenshots** (Required!)
- ✅ Home page with posts and navigation
- ✅ Post detail view with comments
- ✅ Create/edit post forms working
- ✅ Categories management page
- ✅ Mobile responsive views (bonus)

### 🧪 **Functional Requirements**
- ✅ All CRUD operations for posts
- ✅ Category management
- ✅ Comments system working
- ✅ Search and filtering functional
- ✅ Image upload capability
- ✅ Error handling and validation
- ✅ Responsive design

### 🚀 **Testing**
- ✅ Server starts without errors
- ✅ Client connects to server successfully  
- ✅ Database connection working
- ✅ All routes accessible
- ✅ Forms submit correctly
- ✅ Comments can be added

## 📸 Screenshots

### Required for Assignment Submission:
The following screenshots are required as part of your assignment submission:

1. **Home Page** (`screenshots/home.png`)
   - Blog posts list with categories and search
   - Responsive design demonstration

2. **Post Detail** (`screenshots/post-detail.png`) 
   - Individual post view with comments
   - Edit/Delete functionality visible

3. **Create Post** (`screenshots/create-post.png`)
   - Post creation form with image upload
   - Category selection and form validation

4. **Categories Management** (`screenshots/categories.png`)
   - Category management interface
   - Color-coded categories

5. **Working Features** (`screenshots/features.png`)
   - Comments system in action
   - Search and filtering working

### How to Capture Screenshots:
1. Start both server (`npm run dev` in server directory)
2. Start client (`npm run dev` in client directory)  
3. Navigate to http://localhost:3000
4. Use the seed script (`npm run seed`) to populate sample data
5. Take screenshots of each major feature
6. Save in the `screenshots/` directory

## 🤝 Contributing

This is an assignment project, but suggestions for improvements are welcome:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is created for educational purposes as part of a MERN stack development course.

## 👨‍💻 Author

**JBest** - Personal blog showcasing daily life, business adventures, coding journey, and parenting experiences.

---

*Built using the MERN stack* 