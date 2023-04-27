import { useState, useEffect } from "react";
import { create } from "ipfs-http-client";
import style from "@/styles/upload.module.css";

const auth = `Basic ${Buffer.from(
  `${process.env.NEXT_PUBLIC_INFURA_ID}:${process.env.NEXT_PUBLIC_INFURA_SECRET_KEY}`
).toString("base64")}`;

const client = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});

const ImageUpload = ({ setHash }) => {
  const [file, setFile] = useState(null);

  const handleChange = (event) => {
    setFile(event.target.files[0]);
    console.log(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) return;

    try {
      const addedFile = await client.add(file);
      setHash(addedFile.path);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div className={style.container}>
      <form onSubmit={handleSubmit} className={style.form}>
        <input
          type="file"
          accept="image/*"
          onChange={handleChange}
          className={style.inputFile}
        />
        <button type="submit" className={style.inputSubmit}>
          Upload Image
        </button>
      </form>
    </div>
  );
};

export default ImageUpload;
