import app from './app';
import { PORT } from "./enviroment"

const port = PORT || 3000;

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
