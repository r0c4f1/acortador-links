import app from './app';
import { PORT } from "./env"

const port = PORT || 3000;

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
