import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { dbConnect } from './src/config/mongoose.config'
import router from './src/routes/trade.routes'

dbConnect();

const app = express();

app.use(express.json(), cors());

dotenv.config();

app.use('/api', router)

const PORT = process.env.PORT;
app.listen(PORT, () =>
  console.log(`Listening on port: ${PORT}`)
);
