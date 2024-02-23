import { useState } from "react";
import axios from "axios";
import "./FileUpload.css";
const FileUpload = ({ contract, account, provider }) => {
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("No image selected");
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (file) {
            try {
                const formData = new FormData();
                formData.append("file", file);

                const resFile = await axios({
                    method: "post",
                    url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
                    data: formData,
                    headers: {
                        pinata_api_key: `138684d3eb692d4b5ad6`,
                        pinata_secret_api_key: `344414c637868f735780c2fc15f6f591a5998156db98b962f6efc0130f0e89f9`,
                        "Content-Type": "multipart/form-data",
                    },
                });
                const ImgHash = `ipfs://${resFile.data.IpfsHash}`;
                // const signer=contract.connect(provider.getSigner());
                contract.add(account, ImgHash);
                alert("Successfully image uploaded");
                setFileName("No image selected");
                setFile(null);
            } catch (e) {
                alert("Unable to uplaod to pinata");
            }
        }
    };
    const retrieveFile = (e) => {
        const data = e.target.files[0];   //files array of files object
        //console.log(data);
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(data);
        reader.onloadend = () => {
            setFile(e.target.files[0]);
        }
        setFileName(e.target.files[0].name);
        e.preventDefault();
    };
    return (
        <div className="top">
            <form className="form" onSubmit={handleSubmit}>
                <label htmlFor="file-upload" className="choose">
                    choose image
                </label>
                <input
                    disabled={!account}
                    type="file"
                    id="file-upload"
                    name="data"
                    onChange={retrieveFile}
                />
                <span className="textArea">Image:{fileName}</span>
                <button type="submit" className="upload" disabled={!file}>Upload file</button>
            </form>
        </div>
    )
};
export default FileUpload;













// API Key
// 138684d3eb692d4b5ad6

// API Secret
// 344414c637868f735780c2fc15f6f591a5998156db98b962f6efc0130f0e89f9
