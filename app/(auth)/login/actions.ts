"use server"

import { signIn } from "@/lib/auth";



export async function googleAuthenticate(
 redirect
) {
  try {
    await signIn('google', {redirect:redirect});
  } 
  catch(e){
    console.log(e)
  }
}