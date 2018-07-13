//Dependencies
import express from 'express';

//Local dependencies
import {
	AsanaGet,
} from './../Middleware/Asana';

//Instantiated
const Routes = express.Router();

//Require login for all sub-routes
// Routes.use(RequireLogin);


Routes.get(`/test`,
	AsanaGet,
	(req, res, next) => {
		res.json(req.returnJson);
	});

export { Routes };
export default Routes;
