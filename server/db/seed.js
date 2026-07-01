'use strict';

const bcrypt = require('bcryptjs');
const db = require('./models');

const { sequelize, User, Company, Vacancy, Resume, ResumeStatus, VacancyStatus } = db;

// Images below already live in server/public and are served from /uploads/<file>.
const LOGOS = {
  techno: 'ts.jpg',
  kodmag: 'КодМаг.jpg',
  designlab: 'ДизайнЛаб.jpg',
};
const PHOTOS = [
  '1-1740224993618.webp',
  '2-1740661632271.webp',
  '6-1740227174147.webp',
  '9-1740661845520.webp',
  '60-1740586736165.webp',
  '64-1740668003490.webp',
];

// All demo accounts share the same password for convenience.
const DEMO_PASSWORD = 'qwerty123';

async function seed() {
  await sequelize.sync({ force: true });

  const password = await bcrypt.hash(DEMO_PASSWORD, 10);

  // --- Users -------------------------------------------------------------
  const [hrBob, hrKate] = await Promise.all([
    User.create({ firstName: 'Борис', secondName: 'Гуров', email: 'hr@hr.dev', password, company: true }),
    User.create({ firstName: 'Екатерина', secondName: 'Лунева', email: 'kate@hr.dev', password, company: true }),
  ]);

  const [ivan, anna, elena, dmitry, olga] = await Promise.all([
    User.create({ firstName: 'Иван', secondName: 'Петров', email: 'ivan@hr.dev', password, company: false }),
    User.create({ firstName: 'Анна', secondName: 'Соколова', email: 'anna@hr.dev', password, company: false }),
    User.create({ firstName: 'Елена', secondName: 'Морозова', email: 'elena@hr.dev', password, company: false }),
    User.create({ firstName: 'Дмитрий', secondName: 'Волков', email: 'dmitry@hr.dev', password, company: false }),
    User.create({ firstName: 'Ольга', secondName: 'Зайцева', email: 'olga@hr.dev', password, company: false }),
  ]);

  // --- Companies ---------------------------------------------------------
  const techno = await Company.create({
    title: 'ТехноCorp',
    description: 'Продуктовая IT-компания: облачные сервисы и мобильные приложения для миллионов пользователей.',
    logo: LOGOS.techno,
    location: 'Москва',
    userId: hrBob.id,
  });
  const designlab = await Company.create({
    title: 'ДизайнЛаб',
    description: 'Дизайн-студия полного цикла: продуктовый дизайн, брендинг и веб-разработка.',
    logo: LOGOS.designlab,
    location: 'Санкт-Петербург',
    userId: hrKate.id,
  });

  // --- Vacancies ---------------------------------------------------------
  const [vFrontend, vBackend, vQa, vDesigner, vData, vPm] = await Promise.all([
    Vacancy.create({
      title: 'Frontend-разработчик (React)',
      description: 'Разработка клиентской части продукта на React + TypeScript, работа в команде из 6 человек.',
      location: 'Москва', companyId: techno.id, experience: 'React, TypeScript, Redux, вёрстка, REST API',
      format: 'Гибрид', schedule: 'Полная', workDuration: '1-3', from: 180000, before: 260000,
    }),
    Vacancy.create({
      title: 'Backend-разработчик (Node.js)',
      description: 'Проектирование и поддержка микросервисов на Node.js, работа с PostgreSQL и очередями.',
      location: 'Москва', companyId: techno.id, experience: 'Node.js, Express, PostgreSQL, Docker',
      format: 'Удаленно', schedule: 'Полная', workDuration: '3-6', from: 220000, before: 320000,
    }),
    Vacancy.create({
      title: 'QA-инженер',
      description: 'Ручное и автоматизированное тестирование веб-приложений, ведение тест-кейсов.',
      location: 'Москва', companyId: techno.id, experience: 'Postman, SQL, автотесты на JS, Selenium',
      format: 'Офис', schedule: 'Полная', workDuration: '1-3', from: 130000, before: 190000,
    }),
    Vacancy.create({
      title: 'Продуктовый дизайнер',
      description: 'Проектирование интерфейсов, прототипирование и работа над дизайн-системой.',
      location: 'Санкт-Петербург', companyId: designlab.id, experience: 'Figma, UX-исследования, прототипирование',
      format: 'Гибрид', schedule: 'Полная', workDuration: '3-6', from: 160000, before: 240000,
    }),
    Vacancy.create({
      title: 'Data Analyst',
      description: 'Анализ продуктовых метрик, построение дашбордов и A/B-тесты.',
      location: 'Санкт-Петербург', companyId: designlab.id, experience: 'SQL, Python, Tableau, статистика',
      format: 'Удаленно', schedule: 'Частичная', workDuration: '1-3', from: 150000, before: 220000,
    }),
    Vacancy.create({
      title: 'Project Manager',
      description: 'Управление командой дизайнеров и разработчиков, планирование спринтов.',
      location: 'Санкт-Петербург', companyId: designlab.id, experience: 'Agile, Scrum, Jira, управление командой',
      format: 'Офис', schedule: 'Проектная', workDuration: '6+', from: 200000, before: 300000,
    }),
  ]);

  // --- Resumes -----------------------------------------------------------
  const [rIvan, rAnna, rElena, rDmitry, rOlga] = await Promise.all([
    Resume.create({ userId: ivan.id, number: '+7 900 111-22-33', specialty: 'Frontend-разработчик', location: 'Москва', age: 27, experience: '4 года: React, TypeScript, Redux Toolkit, Vite.', coverLetter: 'Люблю аккуратный код и продуманный UX. Ищу продуктовую команду.', photo: PHOTOS[0] }),
    Resume.create({ userId: anna.id, number: '+7 900 222-33-44', specialty: 'Backend-разработчик', location: 'Москва', age: 31, experience: '6 лет: Node.js, Express, PostgreSQL, микросервисы.', coverLetter: 'Проектирую надёжные API и люблю разбираться в производительности.', photo: PHOTOS[1] }),
    Resume.create({ userId: elena.id, number: '+7 900 333-44-55', specialty: 'Продуктовый дизайнер', location: 'Санкт-Петербург', age: 29, experience: '5 лет: Figma, дизайн-системы, UX-исследования.', coverLetter: 'Делаю интерфейсы, которыми приятно пользоваться.', photo: PHOTOS[2] }),
    Resume.create({ userId: dmitry.id, number: '+7 900 444-55-66', specialty: 'QA-инженер', location: 'Москва', age: 25, experience: '3 года: ручное и авто-тестирование, Postman, Selenium.', coverLetter: 'Нахожу баги раньше пользователей.', photo: PHOTOS[3] }),
    Resume.create({ userId: olga.id, number: '+7 900 555-66-77', specialty: 'Data Analyst', location: 'Санкт-Петербург', age: 28, experience: '4 года: SQL, Python, Tableau, продуктовая аналитика.', coverLetter: 'Превращаю данные в понятные продуктовые решения.', photo: PHOTOS[4] }),
  ]);

  // --- Responses (ResumeStatus + mirrored VacancyStatus) -----------------
  // Applicants that swiped "apply" on a vacancy. HR then swipes accept/reject.
  const responses = [
    { resume: rIvan, user: ivan, vacancy: vFrontend, status: 'pending' },
    { resume: rIvan, user: ivan, vacancy: vBackend, status: 'accepted' },
    { resume: rAnna, user: anna, vacancy: vFrontend, status: 'pending' },
    { resume: rAnna, user: anna, vacancy: vBackend, status: 'pending' },
    { resume: rDmitry, user: dmitry, vacancy: vFrontend, status: 'pending' },
    { resume: rDmitry, user: dmitry, vacancy: vQa, status: 'pending' },
    { resume: rElena, user: elena, vacancy: vDesigner, status: 'pending' },
    { resume: rOlga, user: olga, vacancy: vData, status: 'pending' },
    { resume: rOlga, user: olga, vacancy: vPm, status: 'rejection' },
  ];

  await Promise.all(
    responses.flatMap(({ resume, user, vacancy, status }) => [
      ResumeStatus.create({ resumeId: resume.id, vacancyId: vacancy.id, status }),
      VacancyStatus.create({ userId: user.id, vacancyId: vacancy.id }),
    ]),
  );
}

// Create the schema and seed it only when the database is still empty.
async function ensureSeeded() {
  await sequelize.sync();
  const userCount = await User.count();
  if (userCount === 0) {
    await seed();
    // eslint-disable-next-line no-console
    console.log('🌱 База данных заполнена демо-данными.');
  }
}

module.exports = { seed, ensureSeeded, DEMO_PASSWORD };

// Allow `npm run seed` to force a fresh reseed.
if (require.main === module) {
  seed()
    .then(() => {
      // eslint-disable-next-line no-console
      console.log('🌱 Демо-данные успешно загружены.');
      return sequelize.close();
    })
    .then(() => process.exit(0))
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.error('Ошибка при заполнении БД:', error);
      process.exit(1);
    });
}
