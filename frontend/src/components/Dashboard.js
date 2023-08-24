import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Dashboard = (props) => {

    const [quote, setQuote] = useState("");
    const [quoteData, setQuoteData] = useState("");

    const navigate = useNavigate();

    async function populateQuote() {

        const req = await fetch('http://localhost:5000/api/quote', {
            method: 'GET',
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        })

        const data = await req.json();

        if (data.status === 'ok') {
            setQuote(data.quote);
        }
        else {
            props.showAlert(data.error, "danger");
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            const user = jwt_decode(token);

            if (!user) {
                localStorage.removeItem('token');
                navigate('/login');
            }
            else {
                populateQuote();
            }
        }
    });

    const updateQuote = async (event) => {
        event.preventDefault();

        const req = await fetch('http://localhost:5000/api/quote', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('token')
            },
            body: JSON.stringify({
                quote: quoteData
            })
        })

        const data = await req.json();

        if (data.status === 'ok') {
            setQuote(quoteData);
            setQuoteData('');
        }
        else {
            props.showAlert(data.error, "danger");
        }
    }

    return (
        <>
            <h1>Your quote: {quote || "No quote found"} </h1>
            <div className="m-3">
                <div class="input-group mb-3">
                    <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" 
                        placeholder="Quote" value={quoteData} onChange={(e) => setQuoteData(e.target.value)} />
                </div>
                <button type="button" className="btn btn-primary btn-lg" value="Update quote" onClick={updateQuote}>Submit</button>
            </div>
        </>
    );
}

export default Dashboard;