import { Request, Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma';


//Listar todas los clientes de forma paginada o no paginada
export const getAllclientes = async (req: Request, res: Response) => {
    const esPaginado = req.query.esPaginado === "true";

    if (esPaginado) { //Listar todas los clientes de forma paginada
        const pag = Number(req.query.page) || 1; // Página actual, por defecto es 1
        const tam = Number(req.query.pageSize) || 5; // Elementos por página, por defecto 5
        const skip_ = (pag - 1) * tam; // Calcular el desplazamiento

        const data = await prisma.clientes.findMany(
            {
                skip: skip_,
                take: tam,
                orderBy: {
                    nombre: "asc"
                },
            }
        );

        const totalItem = await prisma.clientes.count();  // Contar el total de clientes
        const totalPag = Math.ceil(totalItem / tam); // Calcular el número total de páginas
        const currentPage = pag;

        res.json({
            data,
            paginacion: {
                currentPage,
                totalItem,
                totalPag
            },
        });
    } else { //Listar todas los clientes
        const data = await prisma.clientes.findMany(
            { orderBy: { nombre: "asc" }, }
        );
        res.json({ data });
    }
};

//Obtener cliente
export const getclienteById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { clienteId } = req.params;
        const cliente = await prisma.clientes.findUnique({ where: { clienteId: Number(clienteId) } });
        if (!cliente) {
            return res.status(401).json({ error: "No se encuentra cliente" });
        }
        const { nombre, apellido, edad, telefono, mail } = cliente;
        res.json({ nombre, apellido, edad, telefono, mail});
    } catch (error) {
        next(error);
    }
}

//Crear cliente
export const createClientes = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { nombre, apellido, edad, telefono, mail} = req.body;
        const cliente = await prisma.clientes.create({
            data: {
                nombre, apellido, telefono, mail,
                edad: Number(edad)
            }
        });
        res.json(cliente);
    } catch (error) {
        next(error);
    }
};

//Actualizar cliente
export const updateClientes = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { clienteId } = req.params;
        const { nombre, apellido, edad, telefono, mail} = req.body;
        const cliente = await prisma.clientes.update({
            where: { clienteId: Number(clienteId) },
            data: { nombre, apellido,edad: Number(edad), telefono, mail},
        });
        res.json(cliente);
    } catch (error) {
        next(error);
    }
};

//Eliminar cliente
export const deleteClientes = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { clienteId } = req.params;
        await prisma.clientes.delete({ where: { clienteId: Number(clienteId) } });
        res.json({ message: 'cliente eliminada correctamente' });
    } catch (error) {
        next(error);
    }
};