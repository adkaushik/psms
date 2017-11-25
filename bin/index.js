const app = require('express')();
const fs = require('fs');

const { PATH, SLOT_LIMIT, PORT } = require('./constants');

const licensePlates = [];
const queue = [];

const initialData = fs.readFileSync(PATH);
licensePlates.push(initialData.toString());

fs.watchFile(PATH, function(event,filename){
  if(filename){
    console.log('Event : ' + event);
    console.log(filename + 'changed');
    const data = fs.readFileSync(PATH);
    console.log('New content is \n' + data);
    if (licensePlates.length >= SLOT_LIMIT) {
      queue.push(data.toString())
    } else {
      licensePlates.push(data.toString());
    }
  }
  else {
    console.log('filename not provided');
  }
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get("/", function(req,res){
  res.status(200).json({ data: licensePlates, limit: SLOT_LIMIT });
});

app.listen(PORT, function(){
  console.log(`server has started and listening on port ${PORT}`);
});
