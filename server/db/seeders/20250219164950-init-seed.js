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
      {
        title: 'DevOps инженер',
        description: 'Настройка CI/CD и работа с облачными сервисами',
        conditionsId: 1,
        location: 'Екатеринбург',
        companyId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Аналитик данных',
        description: 'Анализ больших данных с использованием Python и SQL',
        conditionsId: 2,
        location: 'Казань',
        companyId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Тестировщик ПО',
        description: 'Автоматизация тестирования и написание тест-кейсов',
        conditionsId: 3,
        location: 'Ростов-на-Дону',
        companyId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Менеджер проектов',
        description: 'Управление IT-проектами и координация команд',
        conditionsId: 1,
        location: 'Краснодар',
        companyId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Fullstack разработчик',
        description: 'Разработка полного цикла на JavaScript и Python',
        conditionsId: 2,
        location: 'Владивосток',
        companyId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Системный администратор',
        description: 'Обслуживание серверов и сетевой инфраструктуры',
        conditionsId: 3,
        location: 'Самара',
        companyId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Мобильный разработчик',
        description: 'Создание приложений на React Native и Flutter',
        conditionsId: 1,
        location: 'Нижний Новгород',
        companyId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Разработчик баз данных',
        description: 'Оптимизация и управление базами данных PostgreSQL',
        conditionsId: 2,
        location: 'Уфа',
        companyId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Инженер по кибербезопасности',
        description: 'Обеспечение безопасности сетей и приложений',
        conditionsId: 3,
        location: 'Челябинск',
        companyId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Специалист по машинному обучению',
        description: 'Разработка моделей ML на TensorFlow и PyTorch',
        conditionsId: 1,
        location: 'Томск',
        companyId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Технический писатель',
        description: 'Создание документации для IT-продуктов',
        conditionsId: 2,
        location: 'Омск',
        companyId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Разработчик игр',
        description: 'Создание игр на Unity и C#',
        conditionsId: 3,
        location: 'Пермь',
        companyId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Специалист по автоматизации',
        description: 'Автоматизация бизнес-процессов с помощью RPA',
        conditionsId: 1,
        location: 'Тюмень',
        companyId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Продуктовый аналитик',
        description: 'Анализ продуктовых метрик и UX-исследования',
        conditionsId: 2,
        location: 'Иркутск',
        companyId: 2,
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
        photo: '6-1740227174147.webp',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
    await queryInterface.bulkDelete('Vacancies', null, {});
    await queryInterface.bulkDelete('Resumes', null, {});
    await queryInterface.bulkDelete('Conditions', null, {});
  },
};
