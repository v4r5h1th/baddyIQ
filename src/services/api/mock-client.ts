// Simulates network latency for mock API calls so loading/skeleton states are meaningful.
export function simulate<T>(data: T, ms = 600): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), ms));
}

export class ApiError extends Error {
  status: number;
  constructor(message: string, status = 500) {
    super(message);
    this.status = status;
  }
}

export function simulateWithFailureChance<T>(data: T, failureRate = 0, ms = 600): Promise<T> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < failureRate) {
        reject(new ApiError('Something went wrong. Please try again.'));
      } else {
        resolve(data);
      }
    }, ms);
  });
}
