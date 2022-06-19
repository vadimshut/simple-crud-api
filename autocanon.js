const autocannon = require('autocannon');

autocannon(
  {
    url: 'http://localhost:9999',
    connections: 10, //default
    pipelining: 1, // default
    duration: 10, // default
  },
  console.log,
);

async function foo() {
  const result = await autocannon({
    url: 'http://localhost:9999',
    connections: 200, //default
    pipelining: 1, // default
    duration: 10, // default
  });
  console.log(result);
}

foo();
