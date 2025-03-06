const Minio = require("minio");

const minioClient = new Minio.Client({
  endPoint: "localhost",
  port: 9000,
  useSSL: false,
  accessKey: "admin",
  secretKey: "password",
});

const BUCKET_NAME = "films";

async function uploadFile(file) {
  const fileName = Date.now() + "-" + file.originalname;

  try {
    await minioClient.fPutObject(BUCKET_NAME, fileName, file.path, {
      "Content-Type": file.mimetype,
    });
    console.log(`Файл загружен: ${fileName}`);

   
    const fileUrl = `http://localhost:9000/${BUCKET_NAME}/${fileName}`;
    return fileUrl;  
  } catch (error) {
    console.error("Ошибка при загрузке файла:", error);
    throw error;
  }
}

async function deleteFile(fileName) {
  try {
    await minioClient.removeObject(BUCKET_NAME, fileName);
    console.log(`Файл удален: ${fileName}`);
  } catch (error) {
    console.error("Ошибка при удалении файла:", error);
    throw error;
  }
}

module.exports = { minioClient, uploadFile, deleteFile };
