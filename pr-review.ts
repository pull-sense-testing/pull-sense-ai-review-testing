

interface User {
  id: number;
  name: string;
  email?: string;
}

function getUserName(user: User: string {
  return user.fullName; 
}

function addNumbers(a, b: number): number { 
  return a + b;
}

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
