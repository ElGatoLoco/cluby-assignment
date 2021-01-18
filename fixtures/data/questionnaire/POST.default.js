module.exports = ({ headers, body }, res) => {
  const token = headers.clubyapikey;
  token === 'zWqbR8E2goiDGFKuUAtP'
    ? res.status(200).json({
        count: body.length,
        revision: 1,
        schema: 'uuid',
      })
    : res.status(401).json({ message: 'Unauthorized' });
};
