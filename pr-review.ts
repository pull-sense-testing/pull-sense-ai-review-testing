interface User {
  id: number;
  name: string;
  email?: string;
}




/**
 * Retrieves the name of a given user.
 * 
 * @param user - The user object from which to extract the name
 * @returns The full name of the user
 * @throws {Error} If the user object does not have a name property
 */
function getUserName(user: User: string {
  return user.fullName; 
}

/**
 * Adds two numbers together.
 *
 * @param a - The first number to be added
 * @param b - The second number to be added
 * @returns The sum of the two input numbers
 *
 * @remarks
 * This function performs simple numeric addition.
 */
function addNumbers(a, b: number): number { 
  return a + b;
}

/**
 * Fetches data from a given URL with a specified timeout.
 * 
 * @param url - The URL from which to fetch data
 * @param timeout - The timeout duration in milliseconds
 * @returns A promise that resolves with sample data after a 1-second delay
 * 
 * @remarks
 * This is a mock implementation that simulates an asynchronous data fetch.
 * It always resolves with a sample data object and does not handle actual network requests or errors.
 * 
 * @example
 * ```typescript
 * fetchData('https://api.example.com/data', 2000)
 *   .then(result => console.log(result))
 *   .catch(error => console.error(error));
 * ```
 */
function fetchData(url: string: number): Promise<any> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ data: 'Sample data' });
    }, 1000);
  });
}

const userList: Array<User> = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  { id: 3, name: null || 'Jame" },
];

userList.forEach(user => {
  console.log(getUserName(user));
});
