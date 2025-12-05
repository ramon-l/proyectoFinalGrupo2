import { Request, Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma';


//Listar todas los ventas de forma paginada o no paginada
export const getAllventas = async (req: Request, res: Response) => {
    const esPaginado = req.query.esPaginado === "true";

    if (esPaginado) { //Listar todas los ventas de forma paginada
        const pag = Number(req.query.page) || 1; // Página actual, por defecto es 1
        const tam = Number(req.query.pageSize) || 5; // Elementos por página, por defecto 5
        const skip_ = (pag - 1) * tam; // Calcular el desplazamiento

        const data = await prisma.ventas.findMany(
            {
                skip: skip_,
                take: tam,
                orderBy: {
                    ventaId: "asc"
                },
            }
        );

        const totalItem = await prisma.ventas.count();  // Contar el total de ventas
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
    } else { //Listar todas los ventas
        const data = await prisma.ventas.findMany(
            { orderBy: { ventaId: "asc" }, }
        );
        res.json({ data });
    }
};

//Obtener venta
export const getventaById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { ventaId } = req.params;
        const venta = await prisma.ventas.findUnique({ where: { ventaId: Number(ventaId) } });
        if (!venta) {
            return res.status(401).json({ error: "No se encuentra venta" });
        }
        const { clienteId, autoId, tipoVenta, montoCuota, tipoPago } = venta;
        res.json({clienteId, autoId, tipoVenta, montoCuota, tipoPago });
    } catch (error) {
        next(error);
    }
}

//Crear venta
export const createventas = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { clienteId, autoId, tipoVenta, montoCuota, tipoPago } = req.body;
        const venta = await prisma.ventas.create({
            data: {
                clienteId: Number(clienteId),
                autoId: Number(autoId),
                montoCuota: Number(montoCuota), tipoVenta, tipoPago
            }
        });
        res.json(venta);
    } catch (error) {
        next(error);
    }
};

//Actualizar venta
export const updateventas = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { ventaId } = req.params;
        const { clienteId, autoId, tipoVenta, montoCuota, tipoPago } = req.body;
        const venta = await prisma.ventas.update({
            where: { ventaId: Number(ventaId) },
            data: {
                clienteId: Number(clienteId),
                autoId: Number(autoId),
                montoCuota: Number(montoCuota), tipoVenta, tipoPago},
        });
        res.json(venta);
    } catch (error) {
        next(error);
    }
};

//Eliminar venta
export const deleteventas = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { ventaId } = req.params;
        await prisma.ventas.delete({ where: { ventaId: Number(ventaId) } });
        res.json({ message: 'venta eliminada correctamente' });
    } catch (error) {
        next(error);
    }
};