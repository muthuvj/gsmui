import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Marquee from 'react-fast-marquee'
import Navbar from '../../components/navbar/Navbar'

import './home.css'

const Home = () => {
    const [news, setNews] = useState('')

    useEffect(() => {
        const getnews = async () => {
            try {
                const res = await axios.get(
                    'https://tense-galoshes-colt.cyclic.app/api/newsfeed/'
                )
                setNews(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        getnews()
    }, [])

    return (
        <div className="homecontainer">
            <Navbar />
            <Marquee className="h1 text-danger" style={{ overflow: 'hidden' }}>
                {news.length > 0 && news[0].news}
            </Marquee>
            <div className="slidewrapper">
                <div
                    id="carouselExampleIndicators"
                    className="carousel slide"
                    data-ride="carousel"
                >
                    <ol className="carousel-indicators">
                        <li
                            data-target="#carouselExampleIndicators"
                            data-slide-to="0"
                            className="active"
                        ></li>
                        <li
                            data-target="#carouselExampleIndicators"
                            data-slide-to="1"
                        ></li>
                        <li
                            data-target="#carouselExampleIndicators"
                            data-slide-to="2"
                        ></li>
                    </ol>
                    <div className="carousel-inner slider">
                        <div className="carousel-item active">
                            <img
                                className="slideimg"
                                src="https://wallpapercave.com/wp/wp1954241.jpg"
                                alt="First slide"
                            />
                        </div>
                        <div className="carousel-item">
                            <img
                                className="slideimg"
                                src="https://wallpapercave.com/wp/wp3191443.jpg"
                                alt="Second slide"
                            />
                        </div>
                        <div className="carousel-item">
                            <img
                                className="slideimg"
                                src="http://2.bp.blogspot.com/-k_1WJsGmFzA/TqPevAuQb3I/AAAAAAAASS0/vBVgjP98aeg/s1600/Education+Wallpapers+%25288%2529.jpg"
                                alt="Third slide"
                            />
                        </div>
                    </div>
                    <a
                        className="carousel-control-prev"
                        href="#carouselExampleIndicators"
                        role="button"
                        data-slide="prev"
                    >
                        <span
                            className="carousel-control-prev-icon"
                            aria-hidden="true"
                        ></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a
                        className="carousel-control-next"
                        href="#carouselExampleIndicators"
                        role="button"
                        data-slide="next"
                    >
                        <span
                            className="carousel-control-next-icon"
                            aria-hidden="true"
                        ></span>
                        <span className="sr-only">Next</span>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Home
