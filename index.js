const express = require('express');
const apiRoutes = require('./api/v1/messages');
const { sequelize, connectToDatabase } = require('./database/database');

const app =  express();
const PORT = 3000;

app.use(express.json());
app.use('/api/v1', apiRoutes);

app.get('/', (request,response) => {
  response.status(200).json({message: "Hello World"})
})

app.listen(PORT, async ()=> {
  console.log(`Server is running at http://localhost:${PORT}`);
  await connectToDatabase();
});