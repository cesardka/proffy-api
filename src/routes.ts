import express               from 'express';
import ClassesController     from './controllers/ClassesController';
import ConnectionsController from './controllers/ConnectionsController';

const routes = express.Router();
const classesController = new ClassesController();
const connectionsController = new ConnectionsController();

/* USERS ------------------------------------------------- */
routes.get('/users', (request, response) => {
    const users = {};
    return response.json(users).send();
});
routes.get('/user/:id', (request, response) => {} );
routes.post('/user/', (request, response) => {} );
routes.put('/user/:id', (request, response) => {} );

/* CLASSES ----------------------------------------------- */
routes.get('/classes', classesController.index);
routes.post('/classes', classesController.create);
routes.delete('/', (request, response) => {} );

/* CONNECTIONS ------------------------------------------- */
routes.get('/connections', connectionsController.index);
routes.post('/connections', connectionsController.create);

export default routes;