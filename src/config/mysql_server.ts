let mysqlServer:any ={}

let options: any = {
  dialect: 'mysql',
  logging: false,
  force: true,
  timezone: '+08:00',
  baseDir: 'modelsql',
  dialectOptions: {
    dateStrings: true,
    typeCast: true,
  },
  define: {
    timestamps: false,
  }
}

if (process.env.NODE_ENV === 'dev') {
  mysqlServer = {
    host: 'localhost',
    username: 'root',
    password: '961204',
    database: 'monitor',
    port: 3306,
    ...options,
  }
}

export default mysqlServer;