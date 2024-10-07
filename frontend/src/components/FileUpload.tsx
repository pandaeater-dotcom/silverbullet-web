import { ChangeEvent, FC, FormEvent, useState } from "react";

const FileUpload: FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>("");

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file) {
      setUploadStatus("No file selected. Please select a file.");
      return;
    }

    const data = new FormData();
    data.append("file", file);

    try {
      const response = await fetch("http://localhost:3000/api/upload", {
        method: "POST",
        body: data,
      });

      if (response.ok) {
        const result = await response.json();
        setUploadStatus(`File uploaded successfully.Server response: ${JSON.stringify(result)}`);
      } else {
        setUploadStatus(`File upload failed`);
      }
    } catch (error) {
      setUploadStatus(`Error: ${error}`);
    }
  };

  return (
    <>
      <h2>File Upload</h2>
      <form onSubmit={handleFormSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      {uploadStatus && <p>{uploadStatus}</p>}
    </>
  );
};

export default FileUpload;
