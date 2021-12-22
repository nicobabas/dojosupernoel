import listController from '../controllers/listController.js';

export const setupRoutes = (app) => {
    app.use('/list', listController);
}