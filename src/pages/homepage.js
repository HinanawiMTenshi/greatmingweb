import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

function HomePage() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = [
        'https://bbs-static.miyoushe.com/static/2023/08/15/c69737026de88fd63ee17a0c6d9d8192_6738484146570679023.jpg',
        'https://bbs-static.miyoushe.com/static/2023/08/15/7880d10a17fcc12cc2476a5639a1047d_2485620812433002068.jpg',
        'https://bbs-static.miyoushe.com/static/2023/08/15/2e7ac0dbb4b64357ba9ddb946d5c0fcd_8229836485492762046.jpg',
        // Add more image URLs here
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) =>
                (prevIndex + 1) % images.length
            );
        }, 3000); // Change image every 3 seconds

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <div>
            <Head>
                <title>大明军团主界面</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <div className="homeHeader">
                <h1>大明军团</h1>
                <div className="homeNav">
                    <Link href="/development">日历</Link>
                    <Link href="/development">军饷</Link>
                    <Link href="/development">商城</Link>
                    <Link href="/development">成员</Link>
                </div>
                <div>
                    <Link href="/login">登录</Link>
                </div>
            </div>
            <div className="carousel-container">
                <img
                    src={images[currentImageIndex]}
                    alt={`Image ${currentImageIndex}`}
                    className="carousel-image"
                />
            </div>
            <div className="announcement">
                <h1>公告</h1>
            </div>
            <div className="shop">
                <h1>商店</h1>
            </div>
            <div className="hotspot">
                <h1>热点</h1>
            </div>
            <div className="greatmingimg">
            </div>
            <div className="group">
                <h1>五神三</h1>
            </div>

        </div>
    );
}

export default HomePage;
