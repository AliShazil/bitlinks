import clientPromise from "@/lib/mongodb"

export async function POST(request) {
    const body = await request.json();
    console.log('Received POST request', body);
    const client = await clientPromise;
    const db = client.db('bitlinks');
    const collection = db.collection('urls');

    //Check if the short URL already exists

    const existing = await collection.findOne({ shorturl: body.shorturl });
    if (existing) {
        return Response.json({ success: false, error: true, message: 'Short URL already exists' })
    }

    const result = await collection.insertOne({
        url: body.url,
        shorturl: body.shorturl
    })

    return Response.json({ success: true, error: false, message: 'URL Generated Successfully' })
}

export async function GET() {
    const client = await clientPromise;
    const db = client.db('bitlinks');
    const collection = db.collection('urls');
    const allUrls = await collection.find({}).toArray();
    console.log(allUrls)
    return Response.json(allUrls)
}

export async function DELETE() {
    const client = await clientPromise;
    const db = client.db('bitlinks');
    const collection = db.collection('urls');
    const allUrls = await collection.deleteMany({});
    return Response.json({ success: true, error: false, message: 'All URLs deleted successfully'  })
}