module.exports = {
  apps : [{
    name: 'howse-react',
    script: 'http-server',
    args: 'build -p 3000 --proxy http://43.203.242.199:4000? --spa',
    cwd: '/home/ubuntu/board-front'  // 현재 프론트엔드 프로젝트 경로
  }, {
    script: './service-worker/',
    watch: ['./service-worker']
  }],

  deploy : {
    production : {
      user : 'SSH_USERNAME',
      host : 'SSH_HOSTMACHINE',
      ref  : 'origin/master',
      repo : 'GIT_REPOSITORY',
      path : 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
