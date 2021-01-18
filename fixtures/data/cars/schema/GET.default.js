module.exports = ({ headers }, res) => {
  const token = headers.clubyapikey;
  token === 'zWqbR8E2goiDGFKuUAtP'
    ? res.status(200).json({
        fields: [
          {
            id: 'carModel',
            title: 'Car model',
            validationRegex: '^(?!\\s)(?!.*\\s$)[a-zA-Z0-9\\s\\.-]{1,64}$',
          },
          {
            id: 'licensePlate',
            title: 'License plate',
            validationRegex: '^([A-Z]){1,3}-([0-9]){1,3}$',
          },
        ],
        id: 'cars',
        title: 'My car list',
      })
    : res.status(401).json({ message: 'Unauthorized' });
};
