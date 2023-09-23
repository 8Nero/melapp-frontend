import { React, useState } from "react";
import axios from "axios";

function Home() {

    const [file, setFile] = useState();
    const [prediction, setPrediction] = useState("");

    // mock window.URL.createObjectURL as it wasn't available
    const createObjectURL = (file) => {
        if (window.URL && window.URL.createObjectURL) {
            return window.URL.createObjectURL(file);
        } else if (window.webkitURL && window.webkitURL.createObjectURL) {
            return window.webkitURL.createObjectURL(file);
        } else {
            throw new Error("Your browser does not support createObjectURL");
        }
    };

    // handle selecting an image
    function handleChange(event) {
        setFile(createObjectURL(event.target.files[0]));
    }

    // handle submitting the image
    async function onSubmit(event) {
        try {
            event.preventDefault();

            // create formData object to send the file
            const formData = new FormData();
            formData.append("file", event.target.elements.file.files[0]);

            // send POST request to API server with file data
            const res = await axios.post("https://melapp-backend-de0d85f8bc91.herokuapp.com/predict", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            // update prediction to display it on screen
            setPrediction(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            <section id="main">
                <div id="app">
                    <div>
                        <h3>Select an image to classify!</h3>
                    </div>
                    <form id="imageForm" encType="multipart/form-data" method="POST" onSubmit={onSubmit}>
                        <label htmlFor="imageFile">Choose File</label>
                        <input id="imageFile" name="file" type="file" onChange={handleChange} />
                        {file && (
                            <>
                                <img src={file} alt="selected" />
                                <label htmlFor="classifyImage">Classify Image</label>
                                <input id="classifyImage" type="submit" />
                            </>
                        )}
                        {prediction !== "" &&
                            <div className="prediction">{prediction}</div>}
                    </form>
                </div>
            </section>
        </div>
    );
}

export default Home;