module.exports = {
  apps: [{
    name: 'relaxation-studio',
    script: './.output/server/index.mjs',
    cwd: '/var/www/relaxation-studio.ru',
    instances: 1,
    exec_mode: 'fork',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: '/root/.pm2/logs/relaxation-studio-error.log',
    out_file: '/root/.pm2/logs/relaxation-studio-out.log',
    log_file: '/root/.pm2/logs/relaxation-studio-combined.log',
    time: true
  }]
}
