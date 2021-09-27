import React, { useState, useRef, useEffect } from 'react';
import { useDfinityAuth } from "../context/DfinityContextProvider"
import {
    createActor,
    canisterId,
  } from "../declarations/shelf_ui/index";
// import { IDL } from "@dfinity/candid";

const UploadView = () => {
    const auth = useDfinityAuth();
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState(false);
    const inputRef = useRef({});

    useEffect(() => {
        if(auth.isAuthenticated) {
            setLoading(false);
        }
    }, [auth.isAuthenticated]);

    const onChangeHandler = () => {
        setSelected(true);
    };

    const handleSubmit = async () => {
        if(selected && auth.isAuthenticated) {
            const identity = auth.identity;
            const assetActor = createActor(canisterId, { agentOptions: { identity: identity },});
            const foobar = [...new TextEncoder().encode(inputRef['name'])]
            await assetActor.store({
                key: "/test.mp4",
                content: foobar,
                sha256: [],
                content_type: "text/plain",
                content_encoding: "identity",
              });
        }
    };
    // console.log(auth);

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
                                <input type="file" name="file" onChange={onChangeHandler} ref={el => {inputRef.current['file'] = el}} />
                            </label>
                            <br /><br />
                            <button type="button" onClick={handleSubmit}>
                                Upload
                            </button>
                        </form >
                    </div>
                </div>
            </div>
        </section>
    );
}
export default UploadView;