import express from "express";
import cors from "cors";
import { logger } from "./middlewares/logger";
import { errorHandler } from "./middlewares/errorHandler";
import autosRoutes from "./routes/autos.routes";
import clientesRoutes from "./routes/cliente.routes";
import ventasRoutes from "./routes/ventas.routes";
import catalogoRoutes from "./routes/catalogo.routes";

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(logger);
app.use(cors());
app.use(errorHandler);
app.use(express.urlencoded({ extended: true }));

app.use('/api', autosRoutes);
app.use('/api', ventasRoutes);
app.use('/api', clientesRoutes);
app.use('/api', catalogoRoutes);

app.listen(3000, () => {
     console.log(`Servidor en http://localhost:${PORT}`);
}
)

export default app;