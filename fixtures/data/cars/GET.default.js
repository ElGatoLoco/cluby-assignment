module.exports = ({ headers }, res) => {
  const token = headers.clubyapikey;
  token === 'zWqbR8E2goiDGFKuUAtP'
    ? res.status(200).json({
        data: [
          {
            carModel: 'Tesla Model 3',
            licensePlate: 'ABC-123',
          },
          {
            carModel: 'BMW 520d 2.0 Diesel',
            licensePlate: 'BMW-1',
          },
          {
            carModel: 'Porsche 911 Turbo S',
            licensePlate: 'POR-53',
          },
        ],
        revision: 1,
        schema: 'cars',
      })
    : res.status(401).json({ message: 'Unauthorized' });
};
