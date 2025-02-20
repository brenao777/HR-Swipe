'use strict';

const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        firstName: 'Иван',
        secondName: 'Петров',
        email: 'b@b.com',
        password: bcrypt.hashSync('qwertY1*', 10),
        company: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    await queryInterface.bulkInsert('Resumes', [
      {
        userId: 1,
        number: '+7 495 123-45-67',
        specialty: 'Инженер-программист',
        location: 'Москва',
        age: 28,
        experience: '3 года разработки веб-приложений в компании ТехноСофт.',
        coverLetter:
          'Я увлеченный разработчик с глубокими знаниями JavaScript и Node.js.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        number: '+7 812 234-56-78',
        specialty: 'Аналитик данных',
        location: 'Санкт-Петербург',
        age: 32,
        experience: '5 лет анализа данных в компании Данные XXI.',
        coverLetter: 'Умею работать с Python и SQL, стремлюсь находить инсайты в данных.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        number: '+7 383 345-67-89',
        specialty: 'Графический дизайнер',
        location: 'Новосибирск',
        age: 25,
        experience: '2 года фриланса для различных клиентов.',
        coverLetter: 'Креативный дизайнер с опытом работы в Adobe Suite и брендинге.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        number: '+7 343 456-78-90',
        specialty: 'Менеджер проектов',
        location: 'Екатеринбург',
        age: 35,
        experience: '7 лет управления командами в СтройПроект.',
        coverLetter: 'Доказано умею завершать проекты в срок и в рамках бюджета.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        number: '+7 391 567-89-01',
        specialty: 'Инженер DevOps',
        location: 'Красноярск',
        age: 30,
        experience: '4 года оптимизации CI/CD в компании КлаудТех.',
        coverLetter: 'Опыт в AWS и Kubernetes, ориентирован на масштабируемые решения.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        number: '+7 423 678-90-12',
        specialty: 'Специалист по маркетингу',
        location: 'Владивосток',
        age: 27,
        experience: '3 года продвижения кампаний в МаркетЛайф.',
        coverLetter: 'Инновационный маркетолог с талантом к стратегиям в соцсетях.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        number: '+7 831 789-01-23',
        specialty: 'Аналитик кибербезопасности',
        location: 'Нижний Новгород',
        age: 33,
        experience: '6 лет защиты сетей в компании СекьюрСеть.',
        coverLetter: 'Внимательный к деталям, сосредоточен на защите данных.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        number: '+7 351 890-12-34',
        specialty: 'UX-дизайнер',
        location: 'Челябинск',
        age: 29,
        experience: '4 года разработки интерфейсов в ДизайнСтудии.',
        coverLetter: 'Ориентирован на пользователя, люблю тестировать юзабилити.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        number: '+7 381 901-23-45',
        specialty: 'Инженер по машинному обучению',
        location: 'Омск',
        age: 31,
        experience: '5 лет создания моделей ML в ИИ Технологии.',
        coverLetter: 'Эксперт в TensorFlow и PyTorch, готов решать сложные задачи.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        number: '+7 846 012-34-56',
        specialty: 'Бизнес-аналитик',
        location: 'Самара',
        age: 34,
        experience: '6 лет улучшения процессов в БизнесРешения.',
        coverLetter: 'Аналитический склад ума, сильные навыки коммуникации.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
