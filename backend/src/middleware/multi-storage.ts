import express, {Request} from 'express';
import multer, { FileFilterCallback } from 'multer';



type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void

export const upload = (path:string) =>{

  return {
      destination: function (req:Request, file:Express.Multer.File, cb:DestinationCallback) {
        cb(null,  path)
      },
      filename: function (req:Request, file:Express.Multer.File, cb:FileNameCallback) {
             console.log("from here", file);
        cb(null,  Date.now() + file.originalname) //Appending extension
      }
  }
}