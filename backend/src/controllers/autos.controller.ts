import { Request, Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma';


//Listar todas los autos de forma paginada o no paginada
export const getAllautos = async (req: Request, res: Response) => {
    const esPaginado = req.query.esPaginado === "true";

    if (esPaginado) { //Listar todas los autos de forma paginada
        const pag = Number(req.query.page) || 1; // Página actual, por defecto es 1
        const tam = Number(req.query.pageSize) || 5; // Elementos por página, por defecto 5
        const skip_ = (pag - 1) * tam; // Calcular el desplazamiento

        const data = await prisma.autos.findMany(
            {
                skip: skip_,
                take: tam,
                orderBy: {
                    autoId: "asc"
                },
            }
        );

        const totalItem = await prisma.autos.count();  // Contar el total de autos
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
    } else { //Listar todas los autos
        const data = await prisma.autos.findMany(
            { orderBy: { autoId: "asc" }, }
        );
        res.json({ data });
    }
};

//Obtener auto
export const getautoById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { autoId } = req.params;
        const auto = await prisma.autos.findUnique({ where: { autoId: Number(autoId) } });
        if (!auto) {
            return res.status(401).json({ error: "No se encuentra auto" });
        }
        const { marca, modelo, anho} = auto;
        res.json({ marca, modelo, anho});
    } catch (error) {
        next(error);
    }
}

//Crear auto
export const createautos = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {marca, modelo, anho} = req.body;
        const auto = await prisma.autos.create({
            data: { marca, modelo, anho: anho}
        });
        res.json(auto);
    } catch (error) {
        next(error);
    }
};

//Actualizar auto
export const updateautos = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { autoId } = req.params;
        const { marca, modelo, anho} = req.body;
        const auto = await prisma.autos.update({
            where: { autoId: Number(autoId) },
            data: { marca, modelo, anho},
        });
        res.json(auto);
    } catch (error) {
        next(error);
    }
};

//Eliminar auto
export const deleteautos = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { autoId } = req.params;
        await prisma.autos.delete({ where: { autoId: Number(autoId) } });
        res.json({ message: 'auto eliminado correctamente' });
    } catch (error) {
        next(error);
    }
};