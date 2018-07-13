//Dependencies
import express from 'express';

//Local dependencies
import {

	ExamplePost,
	ExampleGet
} from './../Middleware/Content';

import { RequireLogin } from '../Middleware/Authentication';

//Instantiated
const Routes = express.Router();

//Require login for all sub-routes
Routes.use(RequireLogin);

//Process media for all post requests to content/post
Routes.post(`/post`,
	ExamplePost,
	(req, res, next) => {
		res.json(req.returnJson);
	});

Routes.get(`/post`,
	ExampleGet,
	(req, res, next) => {
		res.json(req.returnJson);
	});

export { Routes };
export default Routes;
