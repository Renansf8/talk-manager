const validateFormat = (talk) => {
  const { watchedAt, rate } = talk;

  const dateRegex = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/;
  if (!dateRegex.test(watchedAt)) {
    return 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"';
  }

  if (rate < 1 || rate > 5) {
    return 'O campo "rate" deve ser um inteiro de 1 à 5';
  }
};

const validateFields = (talk) => {
  const { watchedAt, rate } = talk;

  if (!watchedAt || rate == null) {
    return true;
  }

  if (watchedAt === '' || rate === '') {
    return true;
  }

  return false;
};

module.exports = (req, res, next) => {
  const { talk } = req.body;
  
  if (!talk) {
    return res.status(400)
    .json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }

  const noFields = validateFields(talk);
  if (!talk || noFields) {
    return res.status(400)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }

  const validContent = validateFormat(talk);
  if (validContent) return res.status(400).json({ message: validContent });
  next();
};
