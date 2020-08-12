const named = (name) => {
	return Object.freeze({
		toString() {
			return name;
		}
	});
};

module.exports = {
	named
};