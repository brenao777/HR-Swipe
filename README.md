# HR-Swipe 🔥

**«Tinder для поиска работы»** — веб-приложение, где соискатели и HR находят друг друга свайпами.

- **Соискатель** листает карточки вакансий: свайп **влево** — откликнуться, **вправо** — скрыть.
- **HR** публикует вакансии и листает карточки откликнувшихся кандидатов: свайп **влево** — пригласить, **вправо** — отказать.
- Когда HR одобряет отклик, у соискателя появляется статус «Одобрено» и кнопка **чата** с работодателем (real-time на WebSocket).

Механика вдохновлена карточными свайп-интерфейсами (Tinder / JobSwipe): бинарное решение снижает когнитивную нагрузку, зелёный цвет — согласие, красный — отказ.

---

## ✨ Возможности

| Соискатель | HR / Компания |
|------------|---------------|
| Свайп-лента вакансий с фильтрами (город, зарплата, формат, график, опыт) | Профиль компании и список вакансий |
| Создание резюме с фото | Создание / удаление вакансий |
| Список откликов со статусами (на рассмотрении / одобрено / отказ) | Свайп-лента откликов по каждой вакансии |
| Чат с HR после одобрения | Чат с кандидатом |
| Регистрация / авторизация (JWT: access + refresh) | — |

---

## 🧱 Стек

**Клиент:** React 18 · TypeScript · Vite · Redux Toolkit · React Router · react-hook-form + Zod · react-spring (анимация свайпа) · React-Bootstrap · SCSS-модули · socket.io-client.
Архитектура — [Feature-Sliced Design](https://feature-sliced.design/) (`app / pages / widgets / features / entities / shared`).

**Сервер:** Node.js · Express · Sequelize · **SQLite** (zero-config) · JWT · bcryptjs · multer + sharp (загрузка и конвертация изображений в webp) · socket.io.

---

## 🚀 Быстрый старт

Требуется только **Node.js 18+**. База данных — SQLite, она создаётся и наполняется демо-данными автоматически при первом запуске. Никакого PostgreSQL, `.env` или миграций настраивать не нужно.

```bash
# 1. Установить зависимости (корень + клиент + сервер)
npm run install:all

# 2. Запустить клиент и сервер одной командой
npm run dev
```

- Клиент: <http://localhost:5173>
- API: <http://localhost:3000>

> Можно запускать по отдельности: `npm run server` и `npm run client`.

### Демо-аккаунты

Все аккаунты используют пароль **`qwerty123`**.

| Роль | E-mail |
|------|--------|
| Соискатель | `ivan@hr.dev` (есть отклики со статусами) |
| Соискатель | `anna@hr.dev`, `elena@hr.dev`, `dmitry@hr.dev`, `olga@hr.dev` |
| HR | `hr@hr.dev` (компания «ТехноCorp» с вакансиями и откликами) |
| HR | `kate@hr.dev` (компания «ДизайнЛаб») |

### Пересоздать демо-данные

```bash
npm run seed          # пересоздаёт схему и наполняет БД заново
```

---

## 📁 Структура

```
HR-Swipe/
├── package.json          # запуск клиента + сервера (concurrently)
├── client/               # React + Vite (Feature-Sliced Design)
│   └── src/
│       ├── app/          # store, роутинг, провайдеры
│       ├── pages/        # страницы (Applicant / HR / Login / Register / Layout)
│       ├── widgets/      # Navbar, Chat, списки резюме
│       ├── features/     # swipe (свайп-карусель)
│       ├── entities/     # user, Vacancy, Resume, Company, Chat, vacancyStatus
│       └── shared/       # axios-инстанс, хуки, imageUrl
└── server/               # Express + Sequelize (SQLite)
    ├── db/
    │   ├── models/       # User, Company, Vacancy, Resume, VacancyStatus, ResumeStatus
    │   ├── database.js   # конфиг SQLite
    │   └── seed.js       # авто-сид демо-данными
    └── src/
        ├── controllers/  services/  routes/  middlewares/  configs/
        ├── app.js        # express-приложение
        └── server.js     # http + socket.io, авто-сид при старте
```

### Модель данных

- **User** — соискатель или компания (`company: boolean`).
- **Company** `1—1` User, `1—∞` Vacancy.
- **Vacancy** `∞—1` Company.
- **Resume** `∞—1` User.
- **VacancyStatus** — отклик соискателя на вакансию (User ↔ Vacancy).
- **ResumeStatus** — решение HR по резюме на вакансию (`pending | accepted | rejection`).

---

## 🔌 API (кратко)

Все защищённые маршруты требуют заголовок `Authorization: Bearer <accessToken>`.

| Метод | Путь | Назначение |
|-------|------|------------|
| `POST` | `/api/auth/register` · `/api/auth/login` | регистрация / вход |
| `GET`  | `/api/auth/logout` · `/api/tokens/refresh` | выход / обновление токена |
| `GET`/`POST` | `/api/vacancies` | список вакансий (с фильтрами) / создать |
| `GET`/`DELETE` | `/api/vacancies/:id` | отклики на вакансию / удалить |
| `GET`/`POST` | `/api/resume` | список резюме / создать (с фото) |
| `GET`/`POST` | `/api/company` · `/api/company/:userId` | компания пользователя / с вакансиями |
| `POST` | `/api/response/:id` | отклик соискателя на вакансию |
| `GET`  | `/api/status` | отклики соискателя со статусами |
| `PUT`  | `/api/status/:resumeId` | решение HR (accepted / rejection) |

Загруженные фото и логотипы отдаются по `/uploads/<файл>`.

---

## ⚙️ Переменные окружения (необязательно)

Приложение работает без `.env`. При необходимости можно переопределить (см. `server/.env.example`):

| Переменная | По умолчанию |
|------------|--------------|
| `PORT` | `3000` |
| `CLIENT_ORIGIN` | `http://localhost:5173` |
| `DB_STORAGE` | `server/db/hr-swipe.sqlite` |
| `ACCESS_TOKEN_SECRET` / `REFRESH_TOKEN_SECRET` | dev-значения (задайте в продакшене!) |

---

## 📦 Сборка

```bash
npm --prefix client run build     # tsc + vite build → client/dist
```
