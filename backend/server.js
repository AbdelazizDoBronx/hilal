import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import authRoutes from './routes/auth.route.js'
import productsRoutes from './routes/product.route.js'
import ordersRoutes from './routes/order.route.js'

// Express server initialisation
const app = express();

// Middlewares
// Json middleware so we can retrive back data from res object in json format
app.use(express.json())
// Cookie parser middleware helps with cookies 
app.use(cookieParser());
// Cors middleware helps with cors errors in browser
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']}));


// Routes
// Auth routes
app.use('/api',authRoutes)
// Products routes
app.use('/api',productsRoutes)
// Orders routes
app.use('/api',ordersRoutes)

app.listen(3001,()=>{
    console.log('server is up and runing!')
})