# Nova Admin Panel

A comprehensive admin panel for managing news articles, hackathon images, and user registrations.

## Features

- **Authentication & Authorization**
  - User signup with role selection (Admin/Editor)
  - Secure login and password reset
  - Role-based access control

- **Dashboard**
  - Quick stats overview
  - Easy navigation to all management sections

- **News Management**
  - Create, edit, and delete news articles
  - Rich text editor for content
  - Image upload support

- **Hackathon Images**
  - Multiple image upload with previews
  - Image gallery with caption support
  - Easy deletion

- **User Management**
  - View and manage user accounts
  - Role assignment
  - Profile settings

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Firebase account

## Setup

1. Clone the repository
```bash
git clone <repository-url>
cd nova_admin
```

2. Install dependencies
```bash
npm install
```

3. Configure Firebase
- Create a Firebase project at [Firebase Console](https://console.firebase.google.com)
- Enable Authentication, Firestore, and Storage
- Copy your Firebase configuration
- Create a `.env` file in the project root and add your Firebase configuration:
```env
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

4. Start the development server
```bash
npm start
```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App

## Technologies Used

- React.js
- Firebase (Authentication, Firestore, Storage)
- React Router
- React Quill
- Tailwind CSS
- Hero Icons

## Project Structure

```
nova_admin/
├── src/
│   ├── components/
│   │   ├── auth/           # Authentication components
│   │   ├── dashboard/      # Dashboard components
│   │   ├── news/          # News management
│   │   ├── hackathon/     # Hackathon image management
│   │   ├── users/         # User management
│   │   └── profile/       # Profile settings
│   ├── contexts/          # React contexts
│   ├── services/          # Firebase services
│   ├── utils/             # Utility functions
│   ├── App.js
│   └── index.js
└── public/
```

## Security

- All routes are protected with authentication
- Role-based access control implemented
- Secure password requirements
- Environment variables for sensitive data

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
