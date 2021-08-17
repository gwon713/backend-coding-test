import { App } from './app';
import logger from './config/logger';

try {
    const app = new App().app;
    const port : Number = 3000;

    app.listen(port, () => {
        logger.info(` NODE ENV = ${process.env.NODE_ENV} `)
        logger.info(`Server is running on port : ${port}`);
    });
} catch(err) {
    logger.error(err);
}