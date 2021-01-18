module.exports = ({ headers }, res) => {
  const token = headers.clubyapikey;
  token === 'zWqbR8E2goiDGFKuUAtP'
    ? res.status(200).json({
        data: [
          {
            uuid: '9950d12c-7424-4f5d-94b3-9c2ed876323b',
          },
          {
            uuid: '412ea246-3f86-4839-be74-0a785027c920',
          },
          {
            uuid: '28df319e-b94a-4d91-9bdf-3c4ca8dbc693',
          },
        ],
        revision: 1,
        schema: 'uuid',
      })
    : res.status(401).json({ message: 'Unauthorized' });
};
