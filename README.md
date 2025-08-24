# Resadresaka 👋

**Resadresaka** is a fullstack application designed to explore and practice how WebSocket technology works in a real-world context. Whether you're a developer looking to understand real-time communication or just curious about WebSocket implementation, this project provides a hands-on experience.

> [!IMPORTANT]
> This application is under active development and not ready for production use. Coming soon😌

## 🚀 **Purpose**

The primary goal of **Resadresaka** is to:

- Demonstrate the fundamentals of WebSocket communication.
- Showcase how real-time data exchange works between clients and servers.
- Serve as a practical learning tool for developers interested in building interactive, event-driven applications.

## 🛠 **Tech Stack**

Here’s what powers **Resadresaka**:

- **Frontend**: React
- **Backend**: Nodejs, express
- **WebSocket Library**: Socket.IO
- **Database**: PostgreSQL, NeonDB
- **Other Tools**: Cloudinary

## 🔧 **Features**

- Real-time messaging between clients and servers.
- Example use cases: chat application, live notifications
- Simple and clean UI to visualize WebSocket events.
- Easy-to-follow code structure for learning and experimentation.

## 📦 **Installation**

To run **Resadresaka** locally:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/HarenaFiantso/resadresaka.git
   cd resadresaka
   ```

2. **Install dependencies**:

   ```bash
   npm install #This will install both client & server packages
   ```

3. **Set up environment variables**:
   - Create a `.env` file in the `server` directory and add necessary configurations (e.g., database URL, WebSocket port).
   - Do the same for the client

4. **Run the application**:

   ```bash
   npm run dev #This will run the dev server of both client & server if you are in the root of the project
   ```

5. Open your browser and navigate to `http://localhost:5173`

## 💡 **How It Works**

- The frontend establishes a WebSocket connection to the backend.
- The backend handles WebSocket events (e.g., `connection`, `message`, `disconnect`).
- Real-time updates are pushed to all connected clients instantly.

## 📜 **License**

This project is licensed under the [MIT License](LICENSE).
