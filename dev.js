const prompts = require('prompts');
const shell = require('shelljs');

(async () => {
  const response = await prompts({
    type: 'select',
    name: 'package',
    message: 'Which package do you want to start?',
    choices: [
      { title: 'API', value: 'api' },
      { title: 'Mobile', value: 'mobile' },
      { title: 'Web', value: 'web' },
    ],
  });

  if (response.package) {
    shell.exec(`pnpm --filter ${response.package} dev`);
  }
})();
