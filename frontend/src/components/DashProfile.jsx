import { useSelector } from "react-redux";
import { TextInput, Button } from "flowbite-react";

export default function DashProfile () {
  
    const {currentUser} = useSelector((state) => state.user)
    console.log(currentUser)
  
  
    return (
    <div className="max-w-lg mx-auto p-3 w-full">
       <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
       <form className="flex flex-col gap-4">
           <div className="h-32 w-32 cursor-pointer self-center 
           shadow-md overflow-hidden rounded-full">
              <img src={currentUser.profilePicture} alt="user" 
              className="rounded-full h-full w-full object-cover border-[lightgray]"
              
              />
           </div>
           <TextInput 
            type="text"
            id="username"
            placeholder="username"
            defaultValue={currentUser.username}
           />
           <TextInput 
            type="email"
            id="email"
            placeholder="email"
            defaultValue={currentUser.email}
           />
           <TextInput 
            type="password"
            id="password"
            placeholder="password"
            defaultValue={currentUser.password}
           />
            <Button color="blue" type="submit">
                    Mettre à jour
           </Button>
           
       </form>
       <div className="flex justify-between text-red-500 mt-5">
         <span className="cursor-pointer">Supprimer le compte</span>
         <span className="cursor-pointer">Déconnexion</span>
       </div>
    </div>
  )
}
