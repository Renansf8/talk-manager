module.exports = (req, res, next) => {
  const { name } = req.body;
  const nameLen = 3;

  if (!name || name === '') {
    return res.status(400)
      .json({ message: 'O campo "name" é obrigatório' }); 
  }

  if (name.length < nameLen) {
    return res.status(400)
      .json({ message: 'O "name" deve ter pelo menos 3 caracteres' }); 
  }

  next();
};