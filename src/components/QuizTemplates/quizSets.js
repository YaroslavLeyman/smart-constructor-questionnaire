export const quizSets = [
    [
      {
        title: 'React - это ... ?',
        variants: ['библиотека', 'язык программирования', 'приложение'],
        correct: 0,
      },
      {
        title: 'Компонент - это ... ',
        variants: ['приложение', 'часть приложения или страницы', 'то, что я не знаю что такое'],
        correct: 1,
      },
      {
        title: 'Что такое JSX?',
        variants: [
          'Это простой HTML',
          'Это функция',
          'Это тот же HTML, но с возможностью выполнять JS-код',
        ],
        correct: 2,
      },
    ],
    [
      {
        title: 'JavaScript - это ... ?',
        variants: ['головная боль', 'язык программирования', 'приложение'],
        correct: 1,
      },
      {
        title: 'Что такое замыкание в JavaScript ?',
        variants: ['что-то связанное с электричеством', 'вычисление параметров по умолчанию', 'функция, которая имеет доступ к переменным своей внешней функции'],
        correct: 2,
      },
      {
        title: 'Выберите типы данных в JavaScript ',
        variants: ['number, boolean, object', 'string, null, function', 'оба варианта верные'],
        correct: 0,
      },
    ],
    [
      {
        title: 'Union type позволяет сказать коду, что ... ?',
        variants: ['сущность будет определять свой тип по общим свойствам, указанных типов', 'сущность будет всеми указанными типами', 'сущность будет одним из предложенных типов'],
        correct: 2,
      },
      {
        title: 'Литерал это: ',
        variants: ['символ в строке', 'строка', 'конкретное значение любого типа'],
        correct: 2,
      },
      {
        title: 'Кортеж (tuple) - это структура, которая необходима для: ',
        variants: ['записи набора данных в строго определенном порядке по типам', 'записи данных в массив без индексов', 'замены объектов в TypeScript'],
        correct: 0,
      },
    ],
    [
      {
        title: 'Расширение Redux отображающее историю изменений состояния: ',
        variants: ['Toolkit', 'DevTools', 'StateChange'],
        correct: 1,
      },
      {
        title: 'Что такое Reducer в Redux ?',
        variants: ['функция, которая получает текущий state и action объект', 'объект JavaScript, у которого есть type поле', 'поле с дополнительной информацией о том, что произошло'],
        correct: 0,
      },
      {
        title: 'Что такое Thunk в Redux ?',
        variants: ['вид функции Redux, которая может содержать асинхронную логику', 'получение данных с сервера', 'хранилище Redux'],
        correct: 0,
      },
    ],
    [
      {
        title: 'Что такое цикл событий ?',
        variants: ['выполнение неблокирующих операции ввода-вывода', 'фрагмент выполнения проверки аргумента', 'обработка ошибок'],
        correct: 0,
      },
      {
        title: 'Какие методы исполняются синхронно ?',
        variants: ['неблокирующие', 'блокирующие', 'оба варианта верные'],
        correct: 1,
      },
      {
        title: 'Что принимает setTimeout() первым параметром ?',
        variants: ['строку', 'задержку в миллисекундах', 'функцию, которую нужно выполнить'],
        correct: 2,
      },
    ],
    [
      {
        title: 'Что такое Git ?',
        variants: ['софт для контроля версий файлов', 'облачная платформа для хранения git-репозиториев', 'репозиторий'],
        correct: 0,
      },
      {
        title: 'Как удалить ветку ?',
        variants: ['git branch -b название ветки', 'git merge -D название ветки', 'git branch -D название ветки'],
        correct: 2,
      },
      {
        title: 'Почему при слиянии веток может возникнуть конфликт ?',
        variants: ['вы и коллега внесли разные изменения в одну и ту же строку', 'кто-то забыл предупредить Git что код будет обновлен', 'затрудняюсь ответить'],
        correct: 0,
      },
    ],
  ];
  