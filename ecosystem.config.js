module.exports = {
  apps: [

    // First application
    {
      name: 'new51study',
      script: './server/server.js',
      env_dev: {
        "NODE_ENV": "development",
      },
      env: {
        "NODE_ENV": "production"
      },
      instances: 4,
      exec_mode: "cluster"
    },

  ]
};
