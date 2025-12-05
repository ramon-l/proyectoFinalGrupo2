import { Request, Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma';


//Listar el catalogo de forma paginada o no paginada
export const getAllcatalogo = async (req: Request, res: Response) => {
    const esPaginado = req.query.esPaginado === "true";

    if (esPaginado) { //Listar todas los catalogo de forma paginada
        const pag = Number(req.query.page) || 1; // Página actual, por defecto es 1
        const tam = Number(req.query.pageSize) || 5; // Elementos por página, por defecto 5
        const skip_ = (pag - 1) * tam; // Calcular el desplazamiento

        const data = await prisma.catalogo.findMany(
            {
                skip: skip_,
                take: tam,
                orderBy: {
                    catalogoId: "asc"
                },
            }
        );

        const totalItem = await prisma.catalogo.count();  // Contar el total de catalogo
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
    } else { //Listar todas los catalogo
        const data = await prisma.catalogo.findMany(
            { orderBy: { catalogoId: "asc" }, }
        );
        res.json({ data });
    }
};

//Obtener catalogo
export const getcatalogoById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { catalogoId } = req.params;
        const catalogo = await prisma.catalogo.findUnique({ where: { catalogoId: Number(catalogoId) } });
        if (!catalogo) {
            return res.status(401).json({ error: "No se encuentra catalogo" });
        }
        const { autoId, precio, descuento, estado, fecha, cantidad } = catalogo;
        res.json({ autoId, precio, descuento, estado, fecha, cantidad});
    } catch (error) {
        next(error);
    }
}

//Crear catalogo
export const createcatalogo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { autoId, precio, descuento, estado, fecha, cantidad} = req.body;
        const catalogo = await prisma.catalogo.create({
            data: {
                autoId: Number(autoId), 
                precio: Number(precio),
                descuento: Number(descuento),
                cantidad: Number(cantidad), estado, fecha
            }
        });
        res.json(catalogo);
    } catch (error) {
        next(error);
    }
};

//Actualizar catalogo
export const updatecatalogo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { catalogoId } = req.params;
        const { autoId, precio, descuento, estado, fecha, cantidad} = req.body;
        const catalogo = await prisma.catalogo.update({
            where: { catalogoId: Number(catalogoId) },
            data: { 
                autoId: Number(autoId), 
                precio: Number(precio),
                descuento: Number(descuento),
                cantidad: Number(cantidad), estado, fecha},
        });
        res.json(catalogo);
    } catch (error) {
        next(error);
    }
};

//Eliminar catalogo
export const deletecatalogo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { catalogoId } = req.params;
        await prisma.catalogo.delete({ where: { catalogoId: Number(catalogoId) } });
        res.json({ message: 'catalogo eliminada correctamente' });
    } catch (error) {
        next(error);
    }
};