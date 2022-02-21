import crypto from 'crypto';
import path from "path";
import multer from 'multer';

//Declarando diretorio destino dos uploads de avatar.
const uploadFolder = path.resolve(__dirname, '..', '..', 'uploads');


export default {
  directory: uploadFolder,
    storage: multer.diskStorage({
      destination: uploadFolder,
      filename(request, file, callback) {
        const fileHash = crypto.randomBytes(10).toString('hex');

        let filename = `${fileHash}-${file.originalname}`;
      
        callback(null, filename);
    },
  }),
  
};

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NDUwMzYyMjEsImV4cCI6MTY0NTEyMjYyMSwic3ViIjoiOTgzNDk0MTYtMjI1Yi00MGY4LThkNzItMjhiMjNlNTU1MjI2In0.UWNgAMXiQRO3dnqkplD2GEhZUfks2Of37WTtnTDtlew
