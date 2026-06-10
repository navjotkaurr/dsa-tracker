import { NextFunction, Request, Response } from "express";
import redisClient from "../config/redis.js";

const cache = (duration: number) => async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    const key = req.originalUrl;

    try {
        const cached = await redisClient.get(key);

        if (cached) {
            console.log('Cache HIT: ', key);
            res.status(200).json(JSON.parse(cached));
            return;
        }

        console.log('Cache MISS: ', key);

        const originalJson = res.json.bind(res);

        res.json = (data: any): Response => {
            redisClient.setEx(
                key,
                duration,
                JSON.stringify(data)
            )

            return originalJson(data);
        };

        next();
    } catch (error) {
        console.log('Cache error: ', error);
        next();
    }


};

export default cache;