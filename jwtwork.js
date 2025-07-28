const jwt = require('jsonwebtoken');

const jwtPassword = "secret";

const zod = require('zod');

const emailScheme = zod.string().email();
const passwordScheme = zod.string().min(6);

function signJWT(username , password){
    const usernameResponse =  emailScheme.safeParse(username);
    const passwordResponse = passwordScheme.safeParse(password);
    if(!usernameResponse.success || !passwordResponse.success){
        return null;
    }

    const signature = jwt.sign({
        username
    }, jwtPassword)
    return signature;
}

function decodeJWT(token){
    const decode = jwt.decode(token);

    if(decode){
        return true;
    }else{
       return false;
    }
}

function verifyJWT(token){
   try{
     jwt.verify(token , jwtPassword);
     return true;
   }catch(e){
    ans = false;
   }
   console.log(ans);
}