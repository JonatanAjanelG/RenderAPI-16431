

const env = {
    database: 'umg_salama_16431',
    username: 'umg_salama_16431_user',
    password: 'dpg-cqin55eehbks73c0p4s0-a.oregon-postgres.render.com',
    host: 'dpg-cqin55eehbks73c0p4s0-a', 
    dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

module.exports = env; 