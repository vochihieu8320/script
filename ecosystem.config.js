module.exports= {
    name: "ccm_check_permisson",
    script: 'index.js',
    instances: 1,
    autorestart: true,
    exec_mode: "cluster_mode",
    watch: false,
    max_memory_restart: '512M',
    env:{
        "database_host": "localhost",
        "database_port": 3306,
        "database_user": "root",
        "password": "",
        "database": "hiq_ccm_prod",
        "indiegogo_username" : "support@hiq.ai",
        "indiegogo_password" : "HiQ2017@11#17",
        "homePageUrl": "https://www.indiegogo.com"
    },
    env_production:{
        "database_host": "10.128.0.5",
        "database_port": 3306,
        "database_user": "campaign-service",
        "password": "cSagzeh9r9XNTHHR",
        "database": "hiq_ccm_test",
        "indiegogo_username" : "support@hiq.ai",
        "indiegogo_password" : "HiQ2017@11#17",
        "homePageUrl": "https://www.indiegogo.com"
    },
    error_file: 'err.log',
    out_file: 'out.log',
    log_file: 'combined.log',
    time: true
}