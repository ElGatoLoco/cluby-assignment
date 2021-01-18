module.exports = ({ headers }, res) => {
  const token = headers.clubyapikey;
  token === 'zWqbR8E2goiDGFKuUAtP'
    ? res.status(200).json({
        fields: [
          {
            id: 'question1',
            title: 'What is your favourite color?',
            validationRegex: '^[0-9A-z\\. \\-_\\+,]{1,64}$',
          },
          {
            id: 'question2',
            title: 'What is your favourite food?',
            validationRegex: '^[0-9A-z\\. \\-_\\+,]{1,64}$',
          },
          {
            id: 'question3',
            title: 'What is your favourite animal?',
            validationRegex: '^[0-9A-z\\. \\-_\\+,]{1,64}$',
          },
          {
            id: 'question4',
            title: 'What is your favourite city?',
            validationRegex: '^[0-9A-z\\. \\-_\\+,]{1,64}$',
          },
          {
            id: 'question5',
            title: 'What is your favourite hobby?',
            validationRegex: '^[0-9A-z\\. \\-_\\+,]{1,64}$',
          },
        ],
        id: 'questionnaire',
        title: 'Favourite items questionnaire',
      })
    : res.status(401).json({ message: 'Unauthorized' });
};
