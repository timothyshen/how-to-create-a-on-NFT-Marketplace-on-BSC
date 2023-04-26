import { useState, useEffect } from "react";
import { create } from "ipfs-http-client";

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
    <div className="container mx-auto">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center mt-10"
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="mb-5"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Upload Image
        </button>
      </form>
    </div>
  );
};

export default ImageUpload;
