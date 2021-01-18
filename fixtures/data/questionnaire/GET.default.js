module.exports = ({ headers }, res) => {
  const token = headers.clubyapikey;
  token === 'zWqbR8E2goiDGFKuUAtP'
    ? res.status(200).json({
        data: [],
        revision: 0,
        schema: 'questionnaire',
      })
    : res.status(401).json({ message: 'Unauthorized' });
};
