import 'dotenv/config'
import jwt, { SignOptions } from 'jsonwebtoken'
import { Request,Response,NextFunction } from 'express';
import { ErrorResponse } from './Error';

export class Jwt {
  private secretKey:string
  constructor(secretKey: string) {
    this.secretKey = secretKey;
  }
  generateToken(data: Record<string, any>, options?: SignOptions): string {
    return jwt.sign(data, this.secretKey, options);
  }
  validateToken(token: string): Record<string, any> | undefined {
    try {
      const decoded = jwt.verify(token, this.secretKey) as Record<string, any>;
      return decoded;
    } catch (error) {
      return undefined
    }
  }
}
export const jwtValidation = ()=>{
  return (req:Request,res:Response,next:NextFunction)=>{
    const token:string|undefined = req.headers['authorization']?.split(' ')[1]
    if(!token) return next(new ErrorResponse("Required Token",401))
    const jwt= new Jwt(process.env['JWT-KEY'] ?? '')
    const userData=jwt.validateToken(token)
    if(!userData) return next(new ErrorResponse("Invalid Token",401))
    res.locals['userData']=userData
    next()
  }
}