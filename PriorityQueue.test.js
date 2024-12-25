const PriorityQueue = require('./PriorityQueue');

test('우선순위 큐에 요소를 추가하고 크기 확인', () => {
    const pq = new PriorityQueue();
    pq.push(1);
    pq.push(2);
    pq.push(3);
    expect(pq.length).toBe(3);
});

test('우선순위 큐에 비교함수를 지정하지 않으면 최소 힙으로 동작한다.', () => {
    const pq = new PriorityQueue();
    pq.push(3);
    pq.push(2);
    pq.push(1);
    expect(pq.top()).toBe(1);
    pq.pop();
    expect(pq.top()).toBe(2);
    pq.pop();
    expect(pq.top()).toBe(3);
    pq.pop();
});

test('우선순위 큐에 내림차순 비교 함수를 지정하면 최대 힙으로 동작한다.', () => {
    const pq = new PriorityQueue((a, b) => b - a);
    pq.push(1);
    pq.push(2);
    pq.push(3);
    expect(pq.top()).toBe(3);
    pq.pop();
    expect(pq.top()).toBe(2);
    pq.pop();
    expect(pq.top()).toBe(1);
    pq.pop();
});

test('우선순위 큐가 비어있는지 확인', () => {
    const pq = new PriorityQueue();
    expect(pq.isEmpty()).toBe(true);
    pq.push(1);
    expect(pq.isEmpty()).toBe(false);
  });