import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import axios from "axios";
export default function Developer() {
    let [pass, setPass] = useState('');
    let [d, SetD] = useState([]);
    let [os, setOs] = useState("");
    let [load, setLoad] = useState(false);
    function submit() {
        axios.post("https://location-back.onrender.com/pass", { pass }).then((data) => {
            console.log(data.data.mes);
            if (data.data.mes == "exist") {
                setLoad(true);
            }
            else {
                alert(" Opss Wrong Credientials !")
                window.location.reload()
            }
        })


    }
    useEffect(() => {
       
        fetch("https://location-back.onrender.com/fetchingData").then((res) => res.json()).then((data) => {
            SetD(data)
        })
    }, []);
    return (
        <>
            <div><h3 className="text-center my-3 mx-3 mb-3">
                Developer can use it
            </h3>
            </div>
            {!load ? (
                <div className="input-group mb-3 my-3 m-auto ">
                    <input onChange={(e) => { setPass(e.target.value) }} type="text" class="form-control" placeholder="Enter A Password " aria-describedby="basic-addon2" />
                    <div className="input-group-append">
                        <button onClick={submit} className="input-group-text" id="basic-addon2">Submit</button>
                    </div>
                </div>

            ) : (
                <div>
                    {d.map((el) => {

                        return <div className=" border d-flex  text-center w-auto h-auto mx-3 my-3 d-block">
                            <div className="boder w-25 h-50 mx-3 my-3" >
                                <h2> Device</h2>
                                <h6>
                                    {el.os}
                                </h6>
                            </div>
                            <div className=" w-50 h-50 float-end mx-3 my-3">
                                <h3> Latitude</h3>
                                <h5>
                                    {el.Latitude}

                                </h5>

                                <h3>
                                    Longitude
                                </h3>
                                <h5>
                                    {el.Longitude}

                                </h5>
                            </div>
                        </div>
                    })}

                </div >





            )
            }















        </>
    )
}
