import React, { useEffect, useState} from "react";
import { EmojioneV4 } from "react-emoji-render";
import Header from "./Header";
import Details from "./Details";
import axios from "./axios.js"

const Brewery = () => {
    const [loading, setLoading] = useState(false); // Is the data loading?
    const [input, setInput] = useState(""); // User input for brewery query
    const [breweries, setBreweries] = useState([]); // Array of breweries that will be set after fetching
    const [emptyResult, setEmptyResult] = useState(false); // Is the fetch result empty?
    const [review, setReviews] = useState(""); // Is the fetch result empty?
   
    const [data, setData] = useState(null);

    
    /**
     * Query for the breweries from the Open Brewery DB API and set those results
     * inside the state (breweries).
    */
   const getBreweries = () => {
        fetch(`https://api.openbrewerydb.org/breweries/search?query=${input}`)
            .then((response) => response.json())
            .then((data) => {
                setLoading(true);
                setTimeout(function () {
                    // If the response of the data array is empty
                    if (data.length < 1) {
                        setEmptyResult(true); // NO results for the query
                    }
                    setBreweries(data); // Set the breweries array from the response
                    
                    setLoading(false); // Set the loading state back to false
                }, 500);
            })
            .catch((error) => {
                console.error(error.message);
                alert("There was an error fetching the data");
            });
        };
       
        
        const  getReview= (id)=>{
            axios.get(`/reviews/get/${id}`)
            .then(response => {
                if (data==null){
                    setData(response.data[0].review)
                } else{
                    setData(null)
                }
            }   
            )
            .catch(error =>console.error(error)); 
           
        }
    const postReview=async (id)=>{
        await axios.post("/reviews/post",{
            review:review,
            review_id:id
        })
        setReviews("")
    }

    /**
     * Handle clearing the results. Clears up the state for
     * the breweries array, the results boolean, and the input string.
     */
    const handleClearingResults = () => {
        setBreweries([]);
        setEmptyResult(false);
        setInput("");
    };

    // Display the breweries as list item in alphabetical order by name of brewery.
    const breweriesArr = breweries
        .sort(function (a, b) {
            if (a.name < b.name) {
                return -1;
            }
            if (a.name > b.name) {
                return 1;
            }
            return 0;
        })
        .map((brewery) => (
            <>
            
                <li
                    className='list-item'
                    key={brewery.id}
                    data-toggle='modal'
                    data-target={"#detailsModal_" + brewery.id}
                >
                    <div className='list-item-title'>
                        <EmojioneV4
                            style={{ fontSize: "1.5em" }}
                            text=':beer:'
                        />
                        <h3>{brewery.name}</h3>
                    </div>
                    <div className='list-item-title'>
                        <EmojioneV4
                            style={{ fontSize: "1.5em" }}
                            text=':round_pushpin:'
                        />
                        <p className='lead'>
                            {brewery.city + ", " + brewery.state}
                        </p>

                        <EmojioneV4
                            style={{ fontSize: "1.5em" }}
                            text=':id_button:'
                        />
                        <p className='brewery_id'>
                            {brewery.id}
                        </p>

                        <EmojioneV4
                            style={{ fontSize: "1.5em" }}
                            text=':star:'
                        />
                        <button type="button" onClick={()=>{getReview(brewery.id)}}>Show Review</button>
                        <p>Reviews:{!data?"No reviews":data}</p>
                        <input
                            type='text'
                            value={review}
                            placeholder='Your Review'
                            aria-label='Search'
                            className='form-control'
                            onChange={(e) => setReviews(e.target.value)}
                        />
                        <button
                            className='btn btn-dark mx-1'
                            type='button'
                            id='button-review-post'
                            data-ripple-color='dark'
                            onClick={()=>{postReview(brewery.id)}}
                        >
                            Post Your Review
                        </button>
                    </div>
                </li>
                {/* Show more details about the brewery (address, number, website) */}
                <Details brewery={brewery} />
            </>
        ));

    return (
        <>
            <Header />
            <>
                <p className='text-center my-0'>
                    Search for breweries based off keywords.
                </p>
                <div className='search-bar-container'>
                    <div className='input-group mb-0'>
                        <input
                            type='text'
                            value={input}
                            placeholder='Search breweries...'
                            aria-label='Search'
                            className='form-control'
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <button
                            className='btn btn-dark mx-1'
                            type='button'
                            id='button-addon1'
                            data-ripple-color='dark'
                            onClick={getBreweries}
                        >
                            Search
                        </button>
                        <button
                            className='btn btn-danger'
                            type='button'
                            id='button-addon2'
                            data-ripple-color='dark'
                            onClick={handleClearingResults}
                        >
                            Clear
                        </button>
                    </div>
                </div>
                <div className='results-container'>
                    {/* While the data is loading */}
                    {loading && (
                        <div className='spinner-border' role='status'>
                            <span className='sr-only'>Loading...</span>
                        </div>
                    )}
                    {/* If there are results for the search query */}
                    <ul className='list'>{breweries && breweriesArr}</ul>
                    {/* If there are no results for the search query  */}
                    {emptyResult === true && (
                        <p className='lead text-center'>NO RESULTS</p>
                    )}
                </div>
            </>
            
        </>
    );
}


export default Brewery
