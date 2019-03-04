const { db, Calculation } = require('./server/db');
const { green, red } = require('chalk');

const calculations = [
  {
    label: 'Add1',
    rawInput: '3+4',
    evaluatedInput: '3+4',
    result: 7,
  },

  {
    label: 'Subtract1',
    rawInput: '7-3',
    evaluatedInput: '7-3',
    result: 4,
  },
  {
    label: 'Add2',
    rawInput: '3+(Subtract1)',
    evaluatedInput: '3+(4)',
    result: 7,
  },
  {
    name: 'Multiply1',
    rawInput: '12-(Add1)*(Subtract1)',
    evaluatedInput: '12-(7)*(4)',
    result: -16,
  },
];

const seed = async () => {
  await Promise.all(
    calculations.map(calculation => Calculation.create(calculation))
  );
};

const main = async () => {
  await db
    .sync({ force: true })
    .then(() => {
      console.log('Seeding database...');
      return seed();
    })
    .catch(err => {
      console.log('Error while seeding');
      console.log(err.stack);
    })
    .then(() => {
      console.log(green('Seeding success!'));
      db.close();
    });
};

main().catch(err => {
  console.error(red('Oh noes! Something went wrong!'));
  console.error(err);
  db.close();
});
