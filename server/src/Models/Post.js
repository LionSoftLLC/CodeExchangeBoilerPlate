//Dependencies
import _ from 'lodash';
import mongoose from 'mongoose';
import Logger from 'winston';
import Promise from 'bluebird';

//Local dependencies
import { Content } from './Content';

//Instantiated
const ObjectId = mongoose.SchemaTypes.ObjectId;

const schema = {
	reactions: {
		type: [ObjectId],
		default: [],
	}
};

const Post = class Post extends Content {
	constructor(modelName = `Post`, childSchema = {}) {
		super(modelName, Object.assign({}, schema, childSchema));
	}

	////////////////////////
	// INHEREITED METHODS //
	////////////////////////

	_createMongooseFunctionHooks() {
		super._createMongooseFunctionHooks();
		// preserve context
		const _this = this;

		_this._mongooseSchema.methods.fillAll = _this._fillAll;
		
		_this._mongooseSchema.methods.getReactions = _this._getReactions;
	}

	////////////////////////////
	// MODEL INSTANCE METHODS //
	////////////////////////////

	_fillAll() {
		// preserve context
		const _this = this;
		
		return Promise.all([
			_this.getAuthor(),
			_this.getMedia(),
			_this.getLikeCount(),
		])
			.then((results) => {
				const [
					author,
					media,
					likeCount,
					reactions,
				] = results;

				const contentObj = {
					_id: _this._id,
					createdDate: _this.createdDate,
					author,
					comment: _this.comment,
					media,
					likeCount,
					reactions,
				};

				return Promise.resolve(contentObj);
			})
			.catch((err) => {
				Logger.error(`Encountered an error while filling Content information`);
				return Promise.reject(err);
			});
	}

};

const PostInstance = new Post();
const PostModel = PostInstance.Model;

export { PostModel, Post };
export default PostModel;
