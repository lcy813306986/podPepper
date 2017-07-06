/**
 * Created by luojian on 17-5-5.
 */
var NODE_ENV='production';
var app=require('./server.prod')

app.listen(3000, function (err, result) {
  if (err) {
    console.log(err)
  }
  console.log('NODE_ENV:production,Listening at localhost:3000')
})
