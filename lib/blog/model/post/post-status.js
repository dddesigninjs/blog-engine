const validateStatus = (value) => {
	if (typeof value !== 'string') {
		throw new Error(`Post status must be string`);
	}
	const availableStatus = Object.values(postStatus);
	if (!availableStatus.includes(value)) {
		throw new Error(`${value} is a not a valid status value`);
	}
};


/**
 * PostStatus value object constructor function
 * @param {string} value 
 * @return {object PostStatus} 
 */
const postStatus = (value) => {
	validateStatus(value);
	const status = value;
	return Object.freeze({
		/**
		 * 
		 */
		get [Symbol.toStringTag]() {
			return 'PostStatus';
		},
		/**
		 * 
		 */
		get status() {
			return status;
		},
		/**
		 * 
		 */
		publish() {
			return postStatus(postStatus.PUBLISHED);
		},
		/**
		 * 
		 */
		draft() {
			return postStatus(postStatus.DRAFT);
		},
		/**
		 * 
		 */
		valueOf() {
			return status;
		},
		/**
		 * 
		 */
		toString() {
			return status;
		},
		/**
		 * 
		 * @param {PostStatus} other 
		 */
		equals(other) {
			if (Object.prototype.toString.call(other) === '[object PostStatus]') {
				return other.status === status;
			}
		}
	});
};

postStatus.PUBLISHED = 'published';
postStatus.DRAFT = 'draft';

/**
 * Post status
 * module blog/model/post 
 */
module.exports = Object.freeze(postStatus);