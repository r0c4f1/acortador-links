import express, { Express } from 'express';
import path from 'path';
import linkRoutes from './routes/link.routes';

const app: Express = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use('/', linkRoutes);

export default app;

//postgresql://postgres.linjwfjugoiqwjmknoib:XxgAzqxxcLKb0AJQ@aws-1-us-east-2.pooler.supabase.com:5432/postgres
