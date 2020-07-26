class FancyError extends Error {
	constructor(args) {
		super(args);
		this.name = "FancyError";
	}
}

module.exports = { FancyError };
