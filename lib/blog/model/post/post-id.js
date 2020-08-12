const { v4: uuidv4, validate } = require('uuid');

const fromString = (id) => {
	if (!validate(id)) {
		throw new Error('Post ID is not valid');
	}

	return Object.freeze({
		get [Symbol.toStringTag]() {
			return 'PostId';
		},
		equals(other) {
			if (Object.prototype.toString(other)) {
				return other.valueOf() === id;
			}
		},
		valueOf() {
			return id;
		},

		toString() {
			return id.toString();
		}
	});
};

const generate = () => {
	return fromString(uuidv4());
};

module.exports = {
	fromString,
	generate,
};