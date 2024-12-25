const Queue = require('./Queue');

test('큐에 요소를 추가하고 크기 확인', () => {
  const queue = new Queue();
  queue.push(1);
  queue.push(2);
  expect(queue.length).toBe(2);
});

test('큐에서 요소를 꺼낼 수 있다', () => {
  const queue = new Queue();
  queue.push(1);
  queue.push(2);
  queue.push(3);
  expect(queue.pop()).toBe(1);  // 첫 번째로 추가된 값이 나와야 함
  queue.push(1)
  expect(queue.pop()).toBe(2); 
  expect(queue.pop()).toBe(3); 
});

test('큐가 비어있는지 확인', () => {
  const queue = new Queue();
  expect(queue.isEmpty()).toBe(true);  // 처음엔 비어있어야 함
  queue.push(1);
  expect(queue.isEmpty()).toBe(false);  // 요소가 추가되면 비지 않음
});