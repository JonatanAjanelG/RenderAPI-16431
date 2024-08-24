

const env = {
  database: 'umg_salama_16431',
    username: 'umg_salama_16431_user',
    password: 'bf7OzTK7F7GZt1S5DpsOPlMqSTCxwuVF',
    host: 'dpg-cqin55eehbks73c0p4s0-a', 
    
    //Aqui se debe de modificar el host de externo para interno
    dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

module.exports = env; 