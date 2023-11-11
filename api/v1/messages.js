const express = require('express');
const router = express.Router();
const Message = require('../../database/models');
const matrix = require('./context.json');

router.get('/messages', async(requests, response) => {
  const message = await Message.findAll();
  response.status(200).json(message);
});

router.post('/messages', async (request, response) => {
  const {conversation_id, message} = request.body;

  if(!conversation_id)
    response.status(404).json({"message": "conversation_id is required."});
  else if(!message)
    response.status(404).json({"message": "message is required."});
  else {
    
    //use context.json to identify context
    let botReply = assessMessage(message);
    console.log("botReply", botReply);
    console.log("conversation_id", conversation_id);
    
    const userMessage = Message.build({
      'messageID': conversation_id,
      'text': message,
      'sender': 'user'
    });
  
    try {
      await userMessage.save();
      
      const botMessage = Message.build({
        'messageID': conversation_id,
        'text': botReply,
        'sender': 'bot'
      });
      try {
        await botMessage.save();
  
        response.status(201).json({ data: {
          "response_id": conversation_id,
          "response": botMessage.text,
        }});
      } catch (error) {
        response.json(error);
      }
    } catch (error) {
      response.json(error);
    }
  }
});

router.get('/messages/:id', async (requests, response) => {
  const message = await message.findOne({
    where: {
      id: requrest.params.id
    }
  })

  response.status(201).json(message);
});

router.put('/messages/:id', (requests, response) => {
  response.status(403).json({"message": "PUT Method is not supported."});
});

function assessMessage(context) {
  let response = "";

  matrix.context.forEach(rule => {
      let match = rule.keywords.some(keyword => {
        const regex = new RegExp(`\\b${keyword}\\b`, 'i');
        return regex.test(context);
      });

     response = assessResponse(match, response, rule); 
  }) 

  if(response.length <= 0) {
      return matrix.default.response;
  } else {
      return response;
  }
}

function assessResponse(match, response, rule) {
  if(match === true) {
    if(response.length > 0) {
        response += " " + rule.response;
    } else {
        response = rule.response;
    }
  }
  return response;
}

module.exports = router;