"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link'

const Shorten = () => {
    const [url, setUrl] = useState('')
    const [shortUrl, setShortUrl] = useState('')
    const [generatedUrl, setGeneratedUrl] = useState('')
    const [urlList, setUrlList] = useState([])

    const generate = async () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "url": url,
            "shorturl": shortUrl
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("/api/generate", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setUrl("")
                setShortUrl("")
                setGeneratedUrl(`${process.env.NEXT_PUBLIC_HOST}/${shortUrl}`)
                alert(result.message)
                console.log(result)
                fetchUrls()
            })
            .catch((error) => console.error(error));
    }

    const fetchUrls = async () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        fetch("http://localhost:3000/api/generate", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log(result)
                setUrlList(result)
            })
            .catch((error) => console.error(error));
    }

    const deleteAllUrls = async () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const requestOptions = {
            method: "DELETE",
            headers: myHeaders,
            redirect: "follow"
        };

        

        fetch("http://localhost:3000/api/generate", requestOptions)
            .then((response) => response.text())
            .then((result) => {
                setUrlList([])
                setGeneratedUrl('')
            })
            .catch((error) => console.error(error));
    }

    useEffect(() => {
        fetchUrls()
    }, [])

    return (
        <>
            <div className='mx-auto max-w-lg bg-purple-200 my-16 p-8 rounded-lg flex flex-col gap-4'>
                <h1 className='font-bold text-2xl'>Generate Your Short URLs</h1>
                <div className='flex flex-col gap-2'>
                    <input type="text"
                        value={url}
                        className='px-4 py-2 focus:outline-purple-500 rounded-md border-2 border-purple-400'
                        placeholder='Enter Your URL'
                        onChange={e => { setUrl(e.target.value) }}
                    />

                    <input type="text"
                        value={shortUrl}
                        className='px-4 py-2 focus:outline-purple-500 rounded-md border-2 border-purple-400'
                        placeholder='Enter Your Preferred Short URL'
                        onChange={e => { setShortUrl(e.target.value) }}
                    />

                    <button onClick={() => generate()} className='bg-purple-500 shadow-lg rounded-lg p-3 py-2 my-3 font-bold cursor-pointer text-white'>Generate</button>
                    {generatedUrl && <span className='font-bold text-lg'>Generated URL:</span>}
                    {generatedUrl && <code><Link className='hover:underline' target="_blank" href={generatedUrl}>{generatedUrl}</Link></code>}
                </div>
            </div>


            {urlList.length > 0 && <>
                {/* Table Section */}
                < div className='flex justify-center mx-7 my-7'>
                    <div className="relative overflow-x-auto mt-8 w-full sm:w-[70vw]">
                        <table className="w-full text-sm text-left table-auto">
                            <thead className="text-white bg-purple-500">
                                <tr>
                                    <th scope="col" className="px-6 py-3 border-b border-gray-300 text-center">
                                        Original URL
                                    </th>
                                    <th scope="col" className="px-6 py-3 border-b border-gray-300 text-center">
                                        Shortened URL
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {urlList.map((item, index) => (
                                    <tr key={index} className="bg-purple-300">
                                        <td className="px-6 py-4 text-purple-600 text-center">{item.url}</td>
                                        <td className="px-6 py-4 text-center">
                                            <Link href={item.shorturl} target="_blank" className="text-purple-600 hover:underline">
                                                {`${process.env.NEXT_PUBLIC_HOST}/${item.shorturl}`}
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div >
                <div className='flex justify-center'>
                    <button onClick={() => deleteAllUrls()} className='bg-purple-500 shadow-lg rounded-lg p-3 py-2 my-3 font-bold cursor-pointer text-white'>Delete All Urls</button>
                </div>
            </>
            }

        </>
    )
}

export default Shorten
