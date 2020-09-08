/**
 * 
 * @param {*} state 
 */
const makePost = (state) => {
	let {title, body, author, tags, status} = state;
	
	if (typeof tags === 'undefined') {
		tags = [];
	}

	return Object.freeze({
		get [Symbol.toStringTag]() {
			return 'Post';
		},
		/**
		 * 
		 * @return Boolean
		 */
		isDraft() {
			return status === 'draft';
		},
		/**
		 * @return Boolean
		 */
		isPublished() {
			return status === 'published';
		},
		/**
		 * 
		 * @param {*} anAuthor 
		 * @return Boolean
		 */
		isAuthoredBy(anAuthor) {
			return author === anAuthor;
		},
		/**
		 * 
		 * @param {*} tag 
		 * @return Boolean
		 */
		isTaggedWith(tag) {
			if(tags.length) {
				return tags.includes(tag);
			}
			return false;
		},
		/**
		 * 
		 * @param {*} anAuthor
		 * @return void
		 */
		publish(anAuthor) {
			if (!this.isAuthoredBy(anAuthor)) {
				throw new Error('Only post author allowed to publish it');
			}
			if (this.isPublished()) {
				throw new Error('The post is already published');
			}
   			status = 'published';
		},
		/**
		 * 
		 * @param {*} anAuthor 
		 */
		draft(anAuthor) {
			if (!this.isAuthoredBy(anAuthor)) {
				throw new Error('Only post author allowed to draft it');
			}

			if (this.isDraft()) {
				throw new Error('The post is already draft');
			}
			status = 'draft';
		},
		/**
		 * 
		 * @param {*} tag 
		 */
		tagWith(tag) {
			tags.push(tag);
		},

		removeTag(tag) {
			const idx = tags.indexOf(tag);
			if (idx >= 0) {
				tags.splice(idx, 1);
			}
		}
	});
}

/**
 * 
 * @param {*} state 
 */
const draft = (spec) => {
	return makePost({...spec, status: 'draft'});
};

/**
 * 
 * @param {*} state 
 */
const publish = (spec) => {
	return makePost({...spec, status: 'published'});
};

module.exports = {
	draft,
	publish
};

