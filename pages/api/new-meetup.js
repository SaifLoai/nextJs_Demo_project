import { MongoClient } from "mongodb";

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            const data = req.body;

            const client = await MongoClient.connect(
                "mongodb+srv://saifloayhazem:45ZpDb6UcfdEdD2V@saifluay.82rs50x.mongodb.net/meetups?retryWrites=true&w=majority"
            );
            const db = client.db();
            const meetupCollection = db.collection("meetups");

            const result = await meetupCollection.insertOne(data);
            console.log(result);

            client.close();

            res.status(201).json({ message: "Meetup inserted successfully!" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error." });
        }
    } else {
        res.status(405).json({ message: "Method Not Allowed." });
    }
}
