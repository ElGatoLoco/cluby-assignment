module.exports = ({ headers }, res) => {
  const token = headers.clubyapikey;
  token === 'zWqbR8E2goiDGFKuUAtP'
    ? res.status(200).json({
        fields: [
          {
            id: 'uuid',
            title: 'uuid',
            validationRegex: '[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}',
          },
        ],
        id: 'uuid',
        title: 'My uuid list',
      })
    : res.status(401).json({ message: 'Unauthorized' });
};
