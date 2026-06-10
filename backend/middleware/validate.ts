import { Request, Response, NextFunction } from "express";
import { ZodTypeAny, ZodError } from "zod";              

const validate = (schema: ZodTypeAny) =>                
    (req: Request, res: Response, next: NextFunction): void => {
        try {
            schema.parse(req.body);
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                const errors = error.issues.map(e => ({
                    field:   e.path.join('.'),
                    message: e.message,
                }));

                res.status(400).json({
                    message: 'Validation failed',
                    errors,
                });
            }
        }
    };

export default validate;