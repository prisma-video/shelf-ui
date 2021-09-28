import React, { useState, useRef, useEffect } from 'react';
import { useDfinityAuth } from "../context/DfinityContextProvider"
import {
    createActor,
    canisterId,
  } from "../declarations/video/index";
// import { IDL } from "@dfinity/candid";

const UploadView = () => {
    const auth = useDfinityAuth();
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState(false);
    const fileRef = useRef(null)

    useEffect(() => {
        if(auth.isAuthenticated) {
            setLoading(false);
        }
    }, [auth.isAuthenticated]);

    const onChangeHandler = () => {
        setSelected(true);
    };

    function fileToByteArray(file) {
        return new Promise((resolve, reject) => {
            try {
                let reader = new FileReader();
                let fileByteArray = [];
                reader.readAsArrayBuffer(file);
                reader.onloadend = (evt) => {
                    if (evt.target.readyState == FileReader.DONE) {
                        let arrayBuffer = evt.target.result,
                            array = new Uint8Array(arrayBuffer);
                        for (const byte of array) {
                            fileByteArray.push(byte);
                        }
                    }
                    resolve(fileByteArray);
                }
            }
            catch (e) {
                reject(e);
            } 
        })
    }

    const handleSubmit = async () => {
        if(selected && auth.isAuthenticated) {
            const identity = auth.identity;
            const assetActor = createActor(canisterId, { agentOptions: { identity: identity },});
            // const foobar = [...new TextEncoder().encode(fileRef.current.files[0].name)]
            console.log("HEHE", fileRef.current.files[0]);
            let byteArray = await fileToByteArray(fileRef.current.files[0]);
            console.log(byteArray);
            const res = await assetActor.store({
                key: fileRef.current.files[0].name,
                content: byteArray,
                sha256: [],
                content_type: fileRef.current.files[0].type,
                content_encoding: "identity",
              });
            console.log("Uploaded", res)
        }
    };

    const handleGet = async () => {
        if(selected && auth.isAuthenticated) {
            const identity = auth.identity;
            const assetActor = createActor(canisterId, { agentOptions: { identity: identity },});
            const get = await assetActor.get({
                key: fileRef.current.files[0].name,
                accept_encodings: ["identity"],
            });
            console.log("Pulled", get)
        }
    };

    return (
        loading ?
        "loading"
        :
        <section className="section section--details">
            <div className="container">
                <div className="row">
                    <div>
                        <form >
                            <label>
                                Upload a file: <br /><br />
                                <input type="file" name="file" onChange={onChangeHandler} ref={fileRef} />
                            </label>
                            <br /><br />
                            <button type="button" onClick={handleSubmit} style={{color:"white"}}>
                                Upload
                            </button>
                            <br />
                            <button type="button" onClick={handleGet} style={{color:"white"}}>
                                Get
                            </button>
                        </form >
                    </div>
                </div>
            </div>
        </section>
    );
}
export default UploadView;