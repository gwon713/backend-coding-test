module.exports = {
    apps: [{
    name: 'cluster_BE',
    script: './build/start.js',
    instances: 0,
    exec_mode: 'cluster'
    }]
}