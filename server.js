require('dotenv').config();
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const PORT = process.env.PORT || 10000 ;
const app = express();
const dotenv = require('dotenv');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const passport = require('./config/passport');
const passportModule = require('passport');
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const bodyParser = require('body-parser');
const io = new Server(server);
const { sendOTPEmail } = require('./utils/mailer');
const Admin = require('./models/admin');

app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.set('view engine','hbs');
app.use('/uploads', express.static('uploads'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'yourSecretKey',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_PATH })
}));

app.engine('hbs', exphbs.engine({
    extname: 'hbs',
    defaultLayout: 'main',                
    layoutsDir: path.join(__dirname, 'views/layouts'),  
}));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(passportModule.initialize());
app.use(passportModule.session());

let users = [];
let admin = [];

const adminRoute = require('./routes/admin');
const userRoute = require('./routes/user');
const authRoutes = require('./routes/auth');

app.use('/auth', authRoutes);
app.use('/admin', adminRoute); 
app.use('/user', userRoute);

app.get('/', (req, res) => {
    res.render('home', { logoutMessage: req.query.logoutMessage });
});

app.get('/start', (req, res) => {
    res.render('start');
});

mongoose.connect(process.env.DB_PATH).then(() => {
    console.log('MongoDB Connected');
    server.listen(PORT, () => {
        console.log(`Server running on port http://localhost:${PORT}`);
    });
});


const Chat = require('./models/chat');

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('chat message', (data) => {
    console.log("Chat message:", data);
    io.emit('chat message', {
      sender: data.sender,
      message: data.message
    });
  });

  socket.on('joinRoom', (userId) => {
    console.log(`User joined room: ${userId}`);
    socket.join(userId);
  });

socket.on('userMessage', async ({ userId, message }) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    console.error("Invalid userId received:", userId);
    return;
  }

  await Chat.findOneAndUpdate(
    { userId },
    { $push: { messages: { sender: 'user', message } } },
    { upsert: true }
  );

  io.to(userId).emit('newMessage', { sender: 'user', message });
});

  socket.on('adminMessage', async ({ userId, message }) => {
    console.log(`Admin to user (${userId}): ${message}`);
    await Chat.findOneAndUpdate(
      { userId },
      { $push: { messages: { sender: 'admin', message } } },
      { upsert: true }
    );
    io.to(userId).emit('newMessage', { sender: 'admin', message });
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

app.post('/admin/login', async (req, res) => {
    const { username, password, loginCode } = req.body;

    try {
        const admin = await Admin.findOne({ username });
        if (!admin || admin.password !== password) {
            return res.render('login', { error: 'Invalid username or password' });
        }

        if (loginCode !== admin.otp) { 
            return res.render('login', { error: 'Invalid OTP' });
        }

        req.session.adminId = admin._id;
        res.redirect('/admin/dashboard');

    } catch (err) {
        console.error("Login error:", err);
        res.render('login', { error: 'Server error' });
    }
});
