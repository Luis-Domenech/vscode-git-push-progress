import * as path from 'path';
const Mocha = require('mocha');
import glob from 'glob'

export function run(testsRoot: string, cb: (error: any, failures?: number) => void): void {
	// Create the mocha test
	const mocha = new Mocha({
		ui: 'tdd'
	});
	mocha.options.color = true

	glob('**/**.test.js', { cwd: testsRoot }, (err, files) => {
		if (err) {
			return cb(err);
		}

		// Add files to the test suite
		files.forEach(f => mocha.addFile(path.resolve(testsRoot, f)));

		try {
			// Run the mocha test
			mocha.run(failures => {
				cb(null, failures);
			});
		} catch (err) {
			cb(err);
		}
	});
}
