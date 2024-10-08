import { HttpInterceptor, HttpInterceptorFn } from "@angular/common/http";

export const LoginInterceptor: HttpInterceptorFn = (req,next) => {

    const token = localStorage.getItem('access_token') ; 

    if(token){
        const cloneRequest = req.clone({
            setHeaders : {
                Authorization : `Bearer ${token}`
            }
        }) ;  
        return next(cloneRequest)
    }

    return next(req)
}