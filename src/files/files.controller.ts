import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@Controller('files')
export class FilesController {
  @Post('/single')
  @UseInterceptors(FileInterceptor('file'))
  uploadSingleFile(@UploadedFile() file) {
    console.log(file);
  }

  @Post('/multiple')
  @UseInterceptors(FilesInterceptor('files'))
  uploadMultipleFiles(@UploadedFiles() files) {
    console.log(files);
  }
}
