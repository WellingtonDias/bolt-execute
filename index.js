const {exec} = require("child_process");

module.exports = function(TASK,COMMANDS)
{
	if (bolt.isString(COMMANDS)) var commands = [COMMANDS];
	else if (bolt.isArray(COMMANDS))
	{
		for (let command of COMMANDS)
		{
			if (bolt.isNotString(command)) bolt.throwError(`execute: Bad formatted command "${command}" in task "${TASK}"`);
		};
		var commands = COMMANDS;
	}
	else bolt.throwError(`execute: Bad formatted task "${TASK}"`);

	return new Promise(function(RESOLVE)
	{
		const subprocess = exec(commands.join(" && "),function() {RESOLVE(undefined)});
		subprocess.stdin.pipe(process.stdin);
		subprocess.stdout.pipe(process.stdout);
		subprocess.stderr.pipe(process.stderr);
	});
};
