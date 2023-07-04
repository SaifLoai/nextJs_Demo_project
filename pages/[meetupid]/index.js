import { Fragment } from "react";
import Head from "next/head";
import { MongoClient, ObjectId } from "mongodb";
import MeetupDetails from "../../components/meetups/MeetupDetails";

function detailsMeetupPage(props) {
    return (
        <Fragment>
            <Head>
                <title>{props.meetupData.title}</title>
                <meta name="description" content={props.meetupData.description} />
            </Head>
            <MeetupDetails
                image={props.meetupData.image}
                title={props.meetupData.title}
            />
        </Fragment>
    );
}

export async function getStaticPaths() {
    const client = await MongoClient.connect(
        "mongodb+srv://saifloayhazem:45ZpDb6UcfdEdD2V@saifluay.82rs50x.mongodb.net/meetups?retryWrites=true&w=majority"
    );
    const db = client.db();
    const meetupCollection = db.collection("meetups");

    const meetups = await meetupCollection.find({}, { _id: 1 }).toArray();
    return {
        fallback: false,
        paths: meetups.map((meetupId) => ({
            params: { meetupid: meetupId._id.toString() },
        })),
    };
}

export async function getStaticProps(context) {
    // fetch data here
    const meetupId = context.params.meetupid;
    const client = await MongoClient.connect(
        "mongodb+srv://saifloayhazem:45ZpDb6UcfdEdD2V@saifluay.82rs50x.mongodb.net/meetups?retryWrites=true&w=majority"
    );
    const db = client.db();
    const meetupCollection = db.collection("meetups");

    const meetup = await meetupCollection.findOne({
        _id: new ObjectId(meetupId),
    });

    return {
        props: {
            meetupData: {
                image: meetup.image,
                id: meetup._id.toString(),
                title: meetup.title,
                description: meetup.description,
                address: meetup.address,
            },
        },
    };
}

export default detailsMeetupPage;
