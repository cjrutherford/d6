import { NextFunction, Request, Response } from "express";
import { extname, join } from "path";

import { NestExpressApplication } from "@nestjs/platform-express";

export function setupStatic(app: NestExpressApplication) {
    const pubDir = process.env.NODE_ENV === 'production' 
    ? join(__dirname, '..', '..', 'client', 'dist', 'browser')
    : join(__dirname, '..', '..', 'client', 'dist', 'client', 'browser');
    app.useStaticAssets(pubDir);
    app.setBaseViewsDir(pubDir);
    console.log("🚀 ~ setupStatic ~ pubDir:", pubDir)

    app.use((req: Request, res: Response, next: NextFunction) => {
        if (req.url.startsWith('/api')) {
            return next();
        }

        if (req.method === 'GET' && req.accepts('html') && !extname(req.url)) {
            return res.sendFile(join(pubDir, 'index.html'));
        }
        next();
    });
}