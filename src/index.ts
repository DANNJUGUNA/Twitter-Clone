
const USERS_API = 'https://jsonplaceholder.typicode.com/users';

interface User {
    id: number,
    name: string,
    username: string,
    email: string,
    address: object,
    phone: string,
    website: string,
    company: object
}

async function fetchUsers(): Promise<User[]> {
  const response = await fetch(`${USERS_API}`);
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data: User[] = await response.json();
  console.log(data);
  return data;
}
const userSelect = document.getElementById('userSelect') as HTMLSelectElement;
userSelect.innerHTML = '';
  fetchUsers()
  .then(users => users.forEach(user=>{
    const option = document.createElement('option');
    option.value = String(user.id);
    option.textContent = user.name;
    userSelect.appendChild(option);
  }));
fetchUsers();

