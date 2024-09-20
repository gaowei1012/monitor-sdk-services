
let redisLocalServer: any = {}
let options:any = {
  redis_app_login_session: 'eventservice-app-user:loginsession',
}
// if (process.env.NODE_NEV == 'dev') {
//   redisLocalServer = {
//     redisPort: 6379,
//     // redisHost: '127.0.0.1',
//     redisHost: '47.92.94.8',
//     redispwd: '961204',
//     ...options
//   };
// } else {
//   redisLocalServer = {
//     redisPort: 6379,
//     redisHost: '127.0.0.1',
//     // redisHost: '47.92.94.8',
//     redispwd: '961204',
//     ...options
//   };
// }

redisLocalServer = {
  redisPort: 6379,
  // redisHost: '115.159.158.244',
  redisHost: '127.0.0.1',
  redispwd: '961204',
  no_ready_check: true,
  ...options
}

// redisLocalServer = {
//   redisPort: 6379,
//   redisHost: '127.0.0.1',
//   redispwd: '961204',
//   ...options
// };

export default redisLocalServer

