module.exports= {
    name: "check permisson",
    script: 'index.js',
    instances: 1,
    autorestart: true,
    exec_mode: "fork",
    watch: false,
    max_memory_restart: '512M',
    env:{
        "database_host": "localhost",
        "database_port": 3306,
        "PORT": 3012,
        "database_user": "root",
        "password": "",
        "database": "hiq_ccm_prod",
        "url_web_hook_hiq": "https://hooks.slack.com/services/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",
        "email_send": " chihieu.vo@hiq.ai",     
        "domain_test":"http://localhost:3012/",
        "verify_code" : "#H#I#Q#2021",
        "email_password" : "qfkzpckysaccptsa"
    },
    env_production:{
        "database_host": "10.128.0.5",
        "database_port": 3306,
        "PORT": 3012,
        "database_user": "campaign-service",
        "password": "cSagzeh9r9XNTHHR",
        "database": "hiq_ccm_prod",
        "domain_test":"https://vn.hiq.ai/",
        "url_web_hook_hiq": "https://hooks.slack.com/services/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",
        "email_send": "tuan.pham@hiq.ai",     
        "verify_code" : "#H#I#Q#2021",
        "email_password" : "qfkzpckysaccptsa"
    },
    error_file: 'err.log',
    out_file: 'out.log',
    log_file: 'combined.log',
    time: true
}