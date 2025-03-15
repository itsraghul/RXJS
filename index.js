const { Observable } = require('rxjs');

const observable = new Observable((sub) => {
  sub.next('Hello World');
});

const observer = observable.subscribe();
