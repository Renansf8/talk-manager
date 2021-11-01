const express = require('express');
const fs = require('fs').promises;
const authToken = require('../middleware/authToken');
const authName = require('../middleware/authName');
const authAge = require('../middleware/authAge');
const authTalk = require('../middleware/authTalk');

const router = express.Router();

async function getAllTalkers() {
  return fs.readFile('./talker.json', 'utf-8')
    .then((content) => JSON.parse(content));
}

async function setTalker(newTalker) {
  return fs.writeFile('./talker.json', JSON.stringify(newTalker));
}

router.get('/', async (_req, res, next) => {
  try {
    const getTalkers = await getAllTalkers();
    
    return res.status(200).json(getTalkers);
  } catch (err) {
    next(err);
  }
});

router.get('/search', authToken, async (req, res, next) => {
  try {
    const { q } = req.query;
    const getTalkers = await getAllTalkers();
    
    const findTalkerByName = getTalkers.filter((talker) => talker.name
    .toLowerCase().includes(q.toLowerCase()));
    
    return res.status(200).json(findTalkerByName);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const getTalkers = await getAllTalkers(); 
    
    const filteredTalker = getTalkers.find((talker) => talker.id === parseInt(id, 10));
    
    if (!filteredTalker) {
      return res.status(404)
      .json({ message: 'Pessoa palestrante não encontrada' }); 
    }
    
    return res.status(200).json(filteredTalker);
  } catch (err) {
    next(err);
  }
});

router.post('/', 
authToken, 
authName,
authAge,
authTalk,
async (req, res, next) => {
  try {
    const { name, age, talk } = req.body;
    const getTalkers = await getAllTalkers();
    const lastId = getTalkers[getTalkers.length - 1].id;
    const newTalker = { id: lastId + 1, name, age, talk };
    getTalkers.push(newTalker);
    await setTalker(getTalkers);
    return res.status(201).json(newTalker);
  } catch (err) {
    next(err);
  }
});
  
router.put('/:id', 
authToken,
authName,
authAge,
authTalk,
async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, age, talk } = req.body;
    
    const getTalkers = await getAllTalkers(); 
    
    const talkerIndex = getTalkers.findIndex((talker) => talker.id === parseInt(id, 10));
    
    getTalkers[talkerIndex] = { ...getTalkers[talkerIndex], name, age, talk };
    
    await setTalker(getTalkers);
    
    return res.status(200).json(getTalkers[talkerIndex]);
  } catch (err) {
    next(err);
  }
});
  
router.delete('/:id', authToken, async (req, res, next) => {
  try {
    const { id } = req.params;
    const getTalkers = await getAllTalkers(); 
    
    const talkerIndex = getTalkers.findIndex((talker) => talker.id === parseInt(id, 10));
    
    getTalkers.splice(talkerIndex, 1);
    
    await setTalker(getTalkers);
    
    return res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;