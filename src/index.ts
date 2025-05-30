interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}
const USERS_API="https://jsonplaceholder.typicode.com/users";
let users:User[];
let posts:Post[];
let comments:Comment[]
const selectUser= document.getElementById('userSelect') as HTMLSelectElement;
const profileDetails=document.getElementById('profileDetails') as HTMLDivElement;
const postslist=document.getElementById('postslist') as HTMLDivElement;
const commentslist=document.getElementById('commentslist')!;
let getUsers = async () => {
    const response = await fetch(USERS_API);
        users = await response.json();
        users.forEach((user) => {
            const optionElement = document.createElement("option");
            optionElement.value = user.id.toString();
            optionElement.textContent = user.name;
            selectUser.appendChild(optionElement);
        });
      getPosts(1, users[0].name);
    displayUserprofile(1,users);
};

let displayUserprofile=(userId:number, users:User[])=>{
  const currentUser=users.find(user => user.id === userId);
  if(currentUser){
  profileDetails.innerHTML=`
    <h3> ${currentUser.name}</h3>
    <p>@ ${currentUser.username}</p>
    <p>${currentUser.website}</p>
    <p>${currentUser.company.catchPhrase}</p>
    <p class="location"><ion-icon name="location" style="font-size:34px; padding-right:5px;"></ion-icon>${currentUser.address.city}</p>
  `}
}
 let getPosts=async (userId:number, name:string)=>{
      const response= await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
      posts=await response.json();
    postslist.innerHTML='';

    posts.forEach(post=>{
      const container = document.createElement('div')!;
     container.className = 'container';
      container.innerHTML=`
        <img src="./images/profile.png" alt="profile" class="profile">
        <div class="content">
          <div class="title">
            <h3 style="display:inline-flex;"> ${name} 
             <ion-icon name="logo-twitter" style="color:blue; padding-left:10px; backgroud-color:blue;"></ion-icon>
             </h3>
          </div>
          <p>${post.body}</>
          <div style=" display:flex; gap:40px;">
              <p style=" display: inline-flex;"><ion-icon name="chatbubbles" style="font-size:24px; padding-right:10px;"></ion-icon> 200</p>
              <p style=" display: inline-flex;"><ion-icon name="repeat" style="font-size:24px; padding-right:10px;"></ion-icon> 200</p>
              <p style=" display: inline-flex;"><ion-icon name="heart" style="font-size:24px; color:red; padding-right:10px;"></ion-icon> 200</p>
          </div>
        <div>
      `;
      container.addEventListener('click', () => {
        console.log(post.id)
      getComments(post.id)
    });
    postslist.appendChild(container);
    });
    if (posts.length > 0) {
            getComments(posts[0].id);
        }
 }
let getComments= async (postId:number)=>{
    const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
    const comments = await response.json();
    commentslist.innerHTML='';
    const p = document.createElement('p')!;
    p.innerHTML = `Post ${postId.toString()} comments`;
    commentslist.appendChild(p)
    comments.forEach((comment: { name: any; body: any; }) => {
      const container = document.createElement('div')!;
      container.className = 'container';
      container.innerHTML=`
        <img src="./images/profile.png" alt="profile" class="profile">
        <div class="content">
          <div class="title">
            <h3 style="display:inline-flex;"> ${comment.name} 
             <ion-icon name="logo-twitter" style="color:blue; padding-left:10px; backgroud-color:blue;"></ion-icon>
             </h3>
          </div>
          <p>${comment.body}</>
          <div style=" display:flex; gap:40px;">
              <p style=" display: inline-flex;"><ion-icon name="chatbubbles" style="font-size:24px; padding-right:10px;"></ion-icon> 0</p>
              <p style=" display: inline-flex;"><ion-icon name="repeat" style="font-size:24px; padding-right:10px;"></ion-icon> 0</p>
              <p style=" display: inline-flex;"><ion-icon name="heart" style="font-size:24px; color:red; padding-right:10px;"></ion-icon> 0</p>
          </div>
        <div>
      `;  
      commentslist.appendChild(container);
        });
}

selectUser.addEventListener('change', () => {
    const userId = parseInt(selectUser.value);
    const selectedOption = selectUser.options[selectUser.selectedIndex];
    const username = selectedOption.textContent || "Unknown User";
    getPosts(userId, username);
    displayUserprofile(userId,users)
});
getUsers();
