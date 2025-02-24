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
      {
        firstName: 'Боб',
        secondName: 'Бобов',
        email: 'bob@b.com',
        password: bcrypt.hashSync('qwertY1*', 10),
        company: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    await queryInterface.bulkInsert('Conditions', [
      {
        experience: '1-3 года',
        from: 60000, // Зарплата от
        before: 90000, // Зарплата до
        format: 'Гибрид',
        schedule: 'Полная',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        experience: '3-5 лет',
        from: 80000,
        before: 120000,
        format: 'Удаленно',
        schedule: 'Полная',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        experience: 'Нет опыта',
        from: 40000,
        before: 60000,
        format: 'Офис',
        schedule: 'Частичная',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    await queryInterface.bulkInsert('Companies', [
      {
        title: 'ТехноСофт',
        description:
          'Ведущая IT-компания, специализирующаяся на разработке веб-приложений и мобильных решений.',
        logo: '/logos/technosoft.png',
        location: 'Москва',
        userId: 1, // Связь с пользователем (например, HR или владелец компании)
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Данные XXI',
        description:
          'Компания, занимающаяся анализом данных и внедрением искусственного интеллекта.',
        logo: 'https://xxi-century.ru/images/Logo21v_197x197.png',
        location: 'Санкт-Петербург',
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'ДизайнЛаб',
        description:
          'Агентство дизайна и UX/UI, создающее современные решения для бизнеса.',
        logo: '/logos/designlab.png',
        location: 'Новосибирск',
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    await queryInterface.bulkInsert('Vacancies', [
      {
        title: 'Frontend разработчик',
        description: 'Разработка интерфейсов на React и TypeScript',
        conditionsId: 1, // Гибкий график
        location: 'Москва',
        companyId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Backend разработчик',
        description: 'Создание API на Node.js и Express',
        conditionsId: 2, // Удалённая работа
        location: 'Санкт-Петербург',
        companyId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Дизайнер UI/UX',
        description: 'Проектирование интерфейсов и прототипов',
        conditionsId: 3, // Полный рабочий день
        location: 'Новосибирск',
        companyId: 3,
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
        photo:
          '6-1740227174147.webp',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // {
      //   userId: 1,
      //   number: '+7 812 234-56-78',
      //   specialty: 'Аналитик данных',
      //   location: 'Санкт-Петербург',
      //   age: 32,
      //   experience: '5 лет анализа данных в компании Данные XXI.',
      //   coverLetter: 'Умею работать с Python и SQL, стремлюсь находить инсайты в данных.',
      //   photo:
      //     'https://img.freepik.com/premium-photo/funny-dog-with-glasses-smiles-top-view_114106-2698.jpg',
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
      // {
      //   userId: 1,
      //   number: '+7 383 345-67-89',
      //   specialty: 'Графический дизайнер',
      //   location: 'Новосибирск',
      //   age: 25,
      //   experience: '2 года фриланса для различных клиентов.',
      //   coverLetter: 'Креативный дизайнер с опытом работы в Adobe Suite и брендинге.',
      //   photo:
      //     'https://img.freepik.com/premium-photo/funny-dog-with-glasses-smiles-top-view_114106-2698.jpg',
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
      // {
      //   userId: 1,
      //   number: '+7 343 456-78-90',
      //   specialty: 'Менеджер проектов',
      //   location: 'Екатеринбург',
      //   age: 35,
      //   experience: '7 лет управления командами в СтройПроект.',
      //   coverLetter: 'Доказано умею завершать проекты в срок и в рамках бюджета.',
      //   photo:
      //     'https://img.freepik.com/premium-photo/funny-dog-with-glasses-smiles-top-view_114106-2698.jpg',
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
      // {
      //   userId: 1,
      //   number: '+7 391 567-89-01',
      //   specialty: 'Инженер DevOps',
      //   location: 'Красноярск',
      //   age: 30,
      //   experience: '4 года оптимизации CI/CD в компании КлаудТех.',
      //   coverLetter: 'Опыт в AWS и Kubernetes, ориентирован на масштабируемые решения.',
      //   photo:
      //     'https://img.freepik.com/premium-photo/funny-dog-with-glasses-smiles-top-view_114106-2698.jpg',
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
      // {
      //   userId: 1,
      //   number: '+7 423 678-90-12',
      //   specialty: 'Специалист по маркетингу',
      //   location: 'Владивосток',
      //   age: 27,
      //   experience: '3 года продвижения кампаний в МаркетЛайф.',
      //   coverLetter: 'Инновационный маркетолог с талантом к стратегиям в соцсетях.',
      //   photo:
      //     'https://img.freepik.com/premium-photo/funny-dog-with-glasses-smiles-top-view_114106-2698.jpg',
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
      // {
      //   userId: 1,
      //   number: '+7 831 789-01-23',
      //   specialty: 'Аналитик кибербезопасности',
      //   location: 'Нижний Новгород',
      //   age: 33,
      //   experience: '6 лет защиты сетей в компании СекьюрСеть.',
      //   coverLetter: 'Внимательный к деталям, сосредоточен на защите данных.',
      //   photo:
      //     'https://img.freepik.com/premium-photo/funny-dog-with-glasses-smiles-top-view_114106-2698.jpg',
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
      // {
      //   userId: 1,
      //   number: '+7 351 890-12-34',
      //   specialty: 'UX-дизайнер',
      //   location: 'Челябинск',
      //   age: 29,
      //   experience: '4 года разработки интерфейсов в ДизайнСтудии.',
      //   coverLetter: 'Ориентирован на пользователя, люблю тестировать юзабилити.',
      //   photo:
      //     'https://img.freepik.com/premium-photo/funny-dog-with-glasses-smiles-top-view_114106-2698.jpg',
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
      // {
      //   userId: 1,
      //   number: '+7 381 901-23-45',
      //   specialty: 'Инженер по машинному обучению',
      //   location: 'Омск',
      //   age: 31,
      //   experience: '5 лет создания моделей ML в ИИ Технологии.',
      //   coverLetter: 'Эксперт в TensorFlow и PyTorch, готов решать сложные задачи.',
      //   photo:
      //     'https://img.freepik.com/premium-photo/funny-dog-with-glasses-smiles-top-view_114106-2698.jpg',
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
      // {
      //   userId: 1,
      //   number: '+7 846 012-34-56',
      //   specialty: 'Бизнес-аналитик',
      //   location: 'Самара',
      //   age: 34,
      //   experience: '6 лет улучшения процессов в БизнесРешения.',
      //   coverLetter: 'Аналитический склад ума, сильные навыки коммуникации.',
      //   photo:
      //     'https://img.freepik.com/premium-photo/funny-dog-with-glasses-smiles-top-view_114106-2698.jpg',
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
    await queryInterface.bulkDelete('Vacancies', null, {});
    await queryInterface.bulkDelete('Resumes', null, {});
    await queryInterface.bulkDelete('Conditions', null, {});
  },
};
