const user={
      name:'hedy lamar',
      imageUrl:'https://i.imgur.com/yXOvdOSs.jpg',
      imageSize:150,
      imageSize2:400,
};

export default function Profile(){
    return(
        <main>
        <h1>{user.name}</h1>
        <img className="avatar" 
        src={user.imageUrl} 
        alt={'photo of '+user.name} 
        style={{width:user.imageSize2,height:user.imageSize}}/>
        </main>);}