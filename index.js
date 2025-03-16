const { Observable } = require('rxjs');
const { map } = require('rxjs/operators');

const users = {
  data: [
    {
      status: 'active',
      age: 20,
      name: 'John sss',
    },
    {
      status: 'inactive',
      age: 21,
      name: 'Jane vvv',
    },
    {
      status: 'active',
      age: 20,
      name: 'John sssssswww',
    },
    {
      status: 'active',
      age: 33,
      name: 'Jane awve',
    },
    {
      status: 'active',
      age: 22,
      name: 'John mveee',
    },
    {
      status: 'inactive',
      age: 44,
      name: 'Jane lkjs',
    },
  ],
};

//Producer
let observable = new Observable((sub) => {
  sub.next(users);
  sub.complete();
});

//Any Error will stop the next flow

//intermediate function / processing
observable = observable.pipe(
  map((value) => {
    console.log('Got data from observable', value);
    return value.data;
  }),
  map((value) => {
    return value.filter((user) => user.status === 'active');
  }),
  map((value) => value.reduce((acc, user) => acc + user.age, 0) / value.length),
  map((value) => {
    if (value < 18) throw new Error('AVG age is too young');
    else return value;
  })
);

//Consumer
const observer = {
  next: (value) => console.log('Observer got a value of ', value),

  error: (err) => console.error('Observer got an error of ' + err),

  complete: () => console.log('Observer got a complete notification '),
};

observable.subscribe(observer);
