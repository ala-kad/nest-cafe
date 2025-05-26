import { Request } from 'express';
import { BadRequestException } from '@nestjs/common';

export const fileName = (
  req: Request, 
  file: any, 
  cb: (error: Error | null, filename: string) => void
) => {
   const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1E9);
  const newFilename = file.originalname 
  cb(null, uniquePrefix + '-' + newFilename);
}

export const fileFilter = (
  req: Request, 
  file: any, 
  cb: (error: Error | null, acceptFile: boolean) => void
) => {
 if(!file.mimetype.match(/\/(jpg|jpeg|png|gif|webp)$/)) {
    return cb(new BadRequestException('Only jpg|jpeg|png|gif|webp files are allowed!'), false); 
  }
  cb(null, true);
}