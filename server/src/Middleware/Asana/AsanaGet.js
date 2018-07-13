//Dependencies
import _ from 'lodash';
import Logger from 'winston';
import asana from 'asana';
//Local dependencies
import {
	PostModel
} from './../../Models/Post';
import {
	RequestError
} from '../../Errors/RequestError';

//Instantiated
const POST_LIMIT = 100;

const AsanaGet = (req, res, next) => {

	// Construct an Asana client
	const client = asana.Client.create().useAccessToken(process.env.ASANA_TOKEN);

	// Get your user info
	client.users.me()
		.then((me) => {
			// Print out your information
			const greeting = `Hello world! My name is ${me.name} and my primary Asana workspace is ${me.workspaces[0].name}.`;

			res.json({
				msg: greeting,
				data: {
					success: true,
				}
			})
		});

	// next(new RequestError(`No way to link to asana. Please provide linking details`, RequestError.Codes.internal, true));
};

export {
	AsanaGet
};
export default AsanaGet;
