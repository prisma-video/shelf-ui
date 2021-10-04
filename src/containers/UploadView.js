import React, { useState, useRef, useEffect } from 'react';
import { useDfinityAuth } from "../context/DfinityContextProvider"
import { bigmap as bigMap } from "../declarations/bigmap/index";
//   } from "../declarations/video/index";
// import bigMap from 'ic:canisters/bigmap';



const UploadView = () => {
    const auth = useDfinityAuth();
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState(false);
    const [play, setPlay] = useState(false);
    const [showPlayer, setShowPlayer] = useState(false);
    const [videoId, setVideoId] = useState();
    const [videoSourceURL, setVideoSourceURL] = useState();
    const fileRef = useRef(null)

    useEffect(() => {
        if(auth.isAuthenticated) {
            setLoading(false);
        }
        if(showPlayer && videoId) {
            const video = getVideoChunks(videoId);
            setVideoSourceURL(video);
            setPlay(true);
        }
    }, [auth.isAuthenticated, showPlayer]);

    const handlePlayClick = function () {
        setPlay(!play);
    };

    const onChangeHandler = () => {
        setSelected(true);
    };

    const storeVideo = async() =>  {
        if(selected && auth.isAuthenticated) {
            
            // BIGMAP UPLOADING
            const id = [];

            // let idstr = '';
            for (let i = 0; i < 32; i++) {
                let val = Math.floor(Math.random() * 10)
                id.push(val);
                // idstr += val;
            }

            const dataByteArray = [];
            let byteArray = await fileToByteArray(fileRef.current.files[0]);
            const data = JSON.stringify({
                title: fileRef.current.files[0].name,
                file: byteArray,
            });

            for (let i = 0; i < data.length; i++) {
                dataByteArray.push(data.charCodeAt(i))
            }

            const ret = await bigMap.put(id, dataByteArray);

            console.log("Result", ret);
            window.bigMap = bigMap;
            setVideoId(id);
            console.log("Uploaded", id);
        }
    }

    const watchVideo = async() =>  {
        console.log("TRACE0");
        if(selected && auth.isAuthenticated) {
            console.log("TRACE1");
            setShowPlayer(true);
        }
    }

    const getVideoChunks = async (videoId) => {
        // const chunkBuffers = [];
        const nestedBytes = await bigMap.get(videoId);
        //   .filter((v) => v !== null);
        // nestedBytes.forEach((bytes) => {
        //   const bytesAsBuffer = Buffer.from(new Uint8Array(bytes));
        //   chunkBuffers.push(bytesAsBuffer);
        // });
        const videoBlob = new Blob([Buffer.concat(await nestedBytes)], {
          type: "video/mp4",
        });
        const vidURL = URL.createObjectURL(videoBlob);
        return vidURL;
    }
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

    // const handleSubmit = async () => {
    //     if(selected && auth.isAuthenticated) {
    //         const identity = auth.identity;
    //         const assetActor = createActor(canisterId, { agentOptions: { identity: identity },});
    //         // const foobar = [...new TextEncoder().encode(fileRef.current.files[0].name)]
    //         console.log("HEHE", fileRef.current.files[0]);
    //         let byteArray = await fileToByteArray(fileRef.current.files[0]);
    //         console.log(byteArray);
    //         const res = await assetActor.store({
    //             key: fileRef.current.files[0].name,
    //             content: byteArray,
    //             sha256: [],
    //             content_type: fileRef.current.files[0].type,
    //             content_encoding: "identity",
    //           });
    //         console.log("Uploaded", res)
    //     }
    // };

    // const handleGet = async () => {
    //     if(selected && auth.isAuthenticated) {
    //         const identity = auth.identity;
    //         const assetActor = createActor(canisterId, { agentOptions: { identity: identity },});
    //         const get = await assetActor.get({
    //             key: fileRef.current.files[0].name,
    //             accept_encodings: ["identity"],
    //         });
    //         console.log("Pulled", get)
    //     }
    // };

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
                                {/* <input type="file" name="file" onChange={onChangeHandler} ref={fileRef} /> */}
                                <input type="file" name="file" onChange={onChangeHandler} ref={fileRef}  />
                            </label>
                            <br /><br />
                            <button type="button" onClick={storeVideo} style={{color:"white"}}>
                                Upload
                            </button>
                            <br />
                            <button type="button" onClick={watchVideo} style={{color:"white"}}>
                                Watch
                            </button>

                            {
                                showPlayer &&
                                <video
                                onClick={handlePlayClick}
                                src={videoSourceURL}
                                loop={true}
                                muted={true}
                                autoPlay={false}
                            />}
                        </form >
                    </div>
                </div>
            </div>
        </section>
    );
}
export default UploadView;