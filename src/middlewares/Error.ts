import { NextFunction, Request, Response } from "express"

export class ErrorResponse extends Error{
  status:number
  details?:Record<string,string>
  constructor(message:string,status:number,details?:Record<string,string>){
    super(message)
    this.status=status
    this.details=details
  }
}

export default function errorHandler(
  error: Error,
  _req: Request,
  res: Response,
  _next:NextFunction
){
  if (error instanceof ErrorResponse) {
    res.status(error.status).json({
      ok: false,
      error: {
        message: error.message,
        details: error.details,
      },
    });
  } else {
    console.log(error)
    res.status(500).json({
      ok: false,
      error: {
        message: "Error of server",
      },
    });
  }
}