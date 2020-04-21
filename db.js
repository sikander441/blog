const mongoose = require('mongoose')

const conn = async() =>{
console.log('Connecting to DB_URL: '+process.env.DB_UR)
await mongoose.connect(process.env.DB_UR, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

}

module.exports = {
  conn
}