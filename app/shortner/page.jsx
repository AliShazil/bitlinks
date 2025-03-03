"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

const Shorten = () => {
    const [url, setUrl] = useState("");
    const [shortUrl, setShortUrl] = useState("");
    const [generatedUrl, setGeneratedUrl] = useState("");
    const [urlList, setUrlList] = useState([]);

    const HOST = process.env.NEXT_PUBLIC_HOST || window.location.origin;

    const generate = async () => {
        try {
            const response = await fetch(`${HOST}/api/generate`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url, shorturl: shortUrl }),
            });

            const result = await response.json();
            if (!response.ok) throw new Error(result.message || "Error generating URL");

            setUrl("");
            setShortUrl("");
            setGeneratedUrl(`${HOST}/${shortUrl}`);
            alert(result.message);
            fetchUrls();
        } catch (error) {
            console.error("Error generating URL:", error);
        }
    };

    const fetchUrls = async () => {
        try {
            const response = await fetch(`${HOST}/api/generate`);
            if (!response.ok) throw new Error("Failed to fetch URLs");
            const result = await response.json();
            setUrlList(result);
        } catch (error) {
            console.error("Error fetching URLs:", error);
        }
    };

    const deleteAllUrls = async () => {
        try {
            await fetch(`${HOST}/api/generate`, { method: "DELETE" });
            setUrlList([]);
            setGeneratedUrl("");
        } catch (error) {
            console.error("Error deleting URLs:", error);
        }
    };

    useEffect(() => {
        fetchUrls();
    }, []);

    return (
        <>
            <div className="mx-auto max-w-lg bg-purple-200 my-16 p-8 rounded-lg flex flex-col gap-4">
                <h1 className="font-bold text-2xl">Generate Your Short URLs</h1>
                <div className="flex flex-col gap-2">
                    <input
                        type="text"
                        value={url}
                        className="px-4 py-2 focus:outline-purple-500 rounded-md border-2 border-purple-400"
                        placeholder="Enter Your URL"
                        onChange={(e) => setUrl(e.target.value)}
                    />

                    <input
                        type="text"
                        value={shortUrl}
                        className="px-4 py-2 focus:outline-purple-500 rounded-md border-2 border-purple-400"
                        placeholder="Enter Your Preferred Short URL"
                        onChange={(e) => setShortUrl(e.target.value)}
                    />

                    <button
                        onClick={generate}
                        className="bg-purple-500 shadow-lg rounded-lg p-3 py-2 my-3 font-bold cursor-pointer text-white"
                    >
                        Generate
                    </button>
                    {generatedUrl && (
                        <>
                            <span className="font-bold text-lg">Generated URL:</span>
                            <code>
                                <Link className="hover:underline" target="_blank" href={generatedUrl}>
                                    {generatedUrl}
                                </Link>
                            </code>
                        </>
                    )}
                </div>
            </div>

            {urlList.length > 0 && (
                <>
                    <div className="flex justify-center mx-7 my-7">
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
                                                <Link
                                                    href={`${HOST}/${item.shorturl}`}
                                                    target="_blank"
                                                    className="text-purple-600 hover:underline"
                                                >
                                                    {`${HOST}/${item.shorturl}`}
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <button
                            onClick={deleteAllUrls}
                            className="bg-purple-500 shadow-lg rounded-lg p-3 py-2 my-3 font-bold cursor-pointer text-white"
                        >
                            Delete All URLs
                        </button>
                    </div>
                </>
            )}
        </>
    );
};

export default Shorten;
