const { db, Student, Campus } = require('./server/db');
const { green, red } = require('chalk');

const campuses = [
  {
    name: 'Luna',
    imageUrl:
      'https://www.esa.int/var/esa/storage/images/esa_multimedia/images/2015/02/jupiter_s_cratered_moon_callisto/15210787-1-eng-GB/Jupiter_s_cratered_moon_Callisto_large.jpg',
    address: '1 MilkyWay',
    description: 'One small step for man...',
  },

  {
    name: 'Terra',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Earth_Eastern_Hemisphere.jpg/260px-Earth_Eastern_Hemisphere.jpg',
    address: '2 MilkyWay',
    description:
      "This won't be around for long if we keep doing what we're doing, so enjoy it while it lasts!",
  },
  {
    name: 'Mars',
    imageUrl:
      'https://shawglobalnews.files.wordpress.com/2018/11/ny851-1011_2016_1611101.jpg?quality=70&strip=all&w=720',
    address: '3 MilkyWay',
    description:
      "Why isn't there a song that goes 'I'm red, dabba dee dabba di'???",
  },
  {
    name: 'Titan',
    imageUrl:
      'https://boygeniusreport.files.wordpress.com/2017/11/download.jpeg?quality=98&strip=all&w=782',
    address: 'Next to Saturn',
    description: 'Remember me',
  },
];

const fakeEmails = [
  'stone@meekness.com',
  'ca-tech@dps.centrin.net.id',
  'trinanda_lestyowati@telkomsel.co.id',
  'asst_dos@astonrasuna.com',
  'amartabali@dps.centrin.net.id',
  'achatv@cbn.net.id',
  'bali@tuguhotels.com',
  'baliminimalist@yahoo.com',
  'bliss@thebale.com',
  'adhidharma@denpasar.wasantara.net.id',
  'centralreservation@ramayanahotel.com',
  'apribadi@balimandira.com',
  'cdagenhart@ifc.org',
  'dana_supriyanto@interconti.com',
  'dos@novotelbali.com',
  'daniel@hotelpadma.com',
  'daniel@balibless.com',
  'djoko_p@jayakartahotelsresorts.com',
];

const id = () => Math.round(Math.random() * (campuses.length - 1)) + 1;
let emailInd = 0;
const email = () => {
  return fakeEmails[emailInd++];
};

const students = [
  {
    firstName: 'Cody',
    lastName: 'C',
    campusId: id(),
    email: email(),
    gpa: Math.random() * 4.0,
    imageUrl: 'https://picsum.photos/200/300/?random',
  },
  {
    firstName: 'Ben',
    lastName: 'B',
    campusId: id(),
    email: email(),
    gpa: Math.random() * 4.0,
    imageUrl: 'https://picsum.photos/200/300/?random',
  },
  {
    firstName: 'Star',
    lastName: 'S',
    campusId: id(),
    email: email(),
    gpa: Math.random() * 4.0,
    imageUrl: 'https://picsum.photos/200/300/?random',
  },
  {
    firstName: 'Batman',
    lastName: 'B',
    campusId: id(),
    email: email(),
    gpa: Math.random() * 4.0,
    imageUrl: 'https://picsum.photos/200/300/?random',
  },
  {
    firstName: 'Elliot',
    lastName: 'E',
    campusId: id(),
    email: email(),
    gpa: Math.random() * 4.0,
    imageUrl: 'https://picsum.photos/200/300/?random',
  },
  {
    firstName: 'Fira',
    lastName: 'F',
    campusId: id(),
    email: email(),
    gpa: Math.random() * 4.0,
    imageUrl: 'https://picsum.photos/200/300/?random',
  },
  {
    firstName: 'Henry',
    lastName: 'H',
    campusId: id(),
    email: email(),
    gpa: Math.random() * 4.0,
    imageUrl: 'https://picsum.photos/200/300/?random',
  },
  {
    firstName: 'Marcy',
    lastName: 'M',
    campusId: id(),
    email: email(),
    gpa: Math.random() * 4.0,
    imageUrl: 'https://picsum.photos/200/300/?random',
  },
  {
    firstName: 'Milton',
    lastName: 'M',
    campusId: id(),
    email: email(),
    gpa: Math.random() * 4.0,
    imageUrl: 'https://picsum.photos/200/300/?random',
  },
  {
    firstName: 'Murphy',
    lastName: 'M',
    campusId: id(),
    email: email(),
    gpa: Math.random() * 4.0,
    imageUrl: 'https://picsum.photos/200/300/?random',
  },
  {
    firstName: 'Raffi',
    lastName: 'R',
    campusId: id(),
    email: email(),
    gpa: Math.random() * 4.0,
    imageUrl: 'https://picsum.photos/200/300/?random',
  },
  {
    firstName: 'Tulsi',
    lastName: 'T',
    campusId: id(),
    email: email(),
    gpa: Math.random() * 4.0,
    imageUrl: 'https://picsum.photos/200/300/?random',
  },
  {
    firstName: 'Pork Chop',
    lastName: 'Pig',
    campusId: id(),
    email: email(),
    gpa: Math.random() * 4.0,
    imageUrl: 'https://picsum.photos/200/300/?random',
  },
  {
    firstName: 'Ribs',
    lastName: 'R',
    campusId: id(),
    email: email(),
    gpa: Math.random() * 4.0,
    imageUrl: 'https://picsum.photos/200/300/?random',
  },
  {
    firstName: 'Stacey',
    lastName: 'S',
    campusId: id(),
    email: email(),
    gpa: Math.random() * 4.0,
    imageUrl: 'https://picsum.photos/200/300/?random',
  },
  {
    firstName: 'JD',
    lastName: 'Doctor',
    campusId: id(),
    email: email(),
    gpa: Math.random() * 4.0,
    imageUrl: 'https://picsum.photos/200/300/?random',
  },
  {
    firstName: 'BenBen',
    lastName: 'JohnJohn',
    campusId: id(),
    email: email(),
    gpa: Math.random() * 4.0,
    imageUrl: 'https://picsum.photos/200/300/?random',
  },
  {
    firstName: 'Odie',
    lastName: 'O',
    campusId: id(),
    email: email(),
    gpa: Math.random() * 4.0,
    imageUrl: 'https://picsum.photos/200/300/?random',
  },
];

const seed = async () => {
  await Promise.all(campuses.map(campus => Campus.create(campus)));
  await Promise.all(students.map(student => Student.create(student)));
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
