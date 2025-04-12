import express from "express";
import path from 'path';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { createRequestHandler } from "@remix-run/express";
// notice that the result of `remix vite:build` is "just a module"
import * as build from "./build/server/index.js";
import { fileURLToPath } from 'url';
import { log } from "console";
import cors from 'cors';

const app = express();

// Dapatkan direktori saat ini dengan import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Secret key untuk JWT
const SECRET_KEY = 'r4hasi4';
let users = [{username:'ronald' , password:'$2a$12$eybs332fCO1qjEgyR6ThVuuo3aPNoZN0/p8bOioDUO9G9wFclYSxC'}]; // Tempat sementara untuk data pengguna
let orders = [ // Sample orders data
  {
    orderId: '1234',
    productName: 'Product 1',
    quantity: 2,
    totalAmount: 50,
    status: 'Shipped',
    date: '2025-04-06',
  },
  {
    orderId: '5678',
    productName: 'Product 2',
    quantity: 1,
    totalAmount: 30,
    status: 'Pending',
    date: '2025-04-07',
  }
];
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.static("build/client"));

// Login endpoint untuk autentikasi
app.post('/login', async (req, res) => {
  
  const { username, password } = req.body;

  const user = users.find(u => u.username === username);

  if (!user) {
    return res.status(401).json({ message: 'Username tidak ditemukan' });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(401).json({ message: 'Password salah' });
  }

  const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: '1h' });
  return res.json({ token });
});

// Protected route yang membutuhkan JWT untuk mengaksesnya
app.get('/protected', (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: 'Token tidak ditemukan' });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token tidak valid' });
    }
    res.json({ username: decoded.username });
  });
});


// and your app is "just a request handler"
app.all("*", createRequestHandler({ build }));

// app.listen(3000, () => {
//   console.log("App listening on http://localhost:3000");
// });
