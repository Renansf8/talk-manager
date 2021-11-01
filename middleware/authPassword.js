module.exports = (req, res, next) => {
  const { password } = req.body;

  const passLength = 6;

  if (!password || password === '') {
    return res.status(400)
        .json({ message: 'O campo "password" é obrigatório' });
  }

  if (password.length < passLength) {
    return res.status(400)
      .json({ message: 'O "password" deve ter pelo menos 6 caracteres' }); 
  }
  next();
};
