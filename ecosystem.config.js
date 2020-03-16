module.exports = {
  apps : [{
    name: 'bravo',
    script: './app/app.js',
    // Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
    instances: 1,
    autorestart: true,
    watch: [
      "app"
    ],
    autorestart: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    },
    pid: './pm2-app.pid'
  }]
};
