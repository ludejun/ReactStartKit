const FakeRequest = (data, delay) => new Promise(resolve => setTimeout(() => resolve(data), delay));
export default FakeRequest;
