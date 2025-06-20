using System.Security.Cryptography;
using Taskify.Contracts.DTOs.CustomResponses;

namespace TaskifyAPI.Helper.Upload
{
    public class DocumentSettings
    {
        private static readonly string[] AllowedExtensions = { ".jpg", ".jpeg", ".png", ".pdf", ".webp" };
        private const long MaxFileSizeBytes = 5 * 1024 * 1024;

        public static (BaseApiResponse response, string? fileName) UploadFile(IFormFile file, string folderName)
        {
            var validation = ValidateFile(file);
            if (validation != null)
                return (validation, null);

            string folderPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "image", folderName);
            if (!Directory.Exists(folderPath))
                Directory.CreateDirectory(folderPath);

            string fileHash = GetFileHash(file);

            string? existingFile = Directory.GetFiles(folderPath)
                .FirstOrDefault(f => Path.GetFileNameWithoutExtension(f) == fileHash);

            if (existingFile != null)
            {
                string existingFileName = Path.GetFileName(existingFile);
                return (new BaseApiResponse(200, "File already exists."), existingFileName);
            }

            string extension = Path.GetExtension(file.FileName).ToLowerInvariant();
            string uniqueFileName = $"{fileHash}{extension}";
            string filePath = Path.Combine(folderPath, uniqueFileName);

            try
            {
                using var fileStream = new FileStream(filePath, FileMode.Create);
                file.CopyTo(fileStream);
                return (new BaseApiResponse(200, "File uploaded successfully."), uniqueFileName);
            }
            catch
            {
                return (new BaseApiResponse(500, "File upload failed due to a server error."), null);
            }
        }

        public static (BaseApiResponse response, string? fileName) UpdateFile(IFormFile newFile, string folderName, string oldFileName)
        {
            var validation = ValidateFile(newFile);
            if (validation != null)
                return (validation, null);

            string folderPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "image", folderName);
            string oldFilePath = Path.Combine(folderPath, oldFileName);

            if (File.Exists(oldFilePath))
                File.Delete(oldFilePath);

            return UploadFile(newFile, folderName);
        }

        public static BaseApiResponse DeleteFile(string folderName, string fileName)
        {
            string folderPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "image", folderName);
            string filePath = Path.Combine(folderPath, fileName);

            if (File.Exists(filePath))
            {
                File.Delete(filePath);
                return new BaseApiResponse(200, "File deleted successfully.");
            }

            return new BaseApiResponse(404, "File not found.");
        }

        private static BaseApiResponse? ValidateFile(IFormFile file)
        {
            if (file == null || file.Length == 0)
                return new BaseApiResponse(400, "File is empty or null.");

            if (file.Length > MaxFileSizeBytes)
                return new BaseApiResponse(400, "File exceeds maximum size of 5MB.");

            string extension = Path.GetExtension(file.FileName).ToLowerInvariant();
            if (!AllowedExtensions.Contains(extension))
                return new BaseApiResponse(400, $"Unsupported file type: {extension}");

            string contentType = file.ContentType.ToLowerInvariant();
            if (!(contentType.StartsWith("image/") || contentType == "application/pdf"))
                return new BaseApiResponse(400, "Only image and PDF files are allowed.");

            return null;
        }

        public static string GetFileUrl(string folderName, string fileName, HttpRequest request)
        {
            var baseUrl = $"{request.Scheme}://{request.Host}";
            return $"{baseUrl}/image/{folderName}/{fileName}";
        }

        private static string GetFileHash(IFormFile file)
        {
            using var stream = file.OpenReadStream();
            using var sha256 = SHA256.Create();
            byte[] hashBytes = sha256.ComputeHash(stream);
            return BitConverter.ToString(hashBytes).Replace("-", "").ToLowerInvariant();
        }

    }
}
