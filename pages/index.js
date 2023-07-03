import { Fragment } from "react";
import Head from "next/head";
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";

function HomePage(props) {
    return (
        <Fragment>
            <Head>
                <title>React Meetups</title>
                <meta
                    name="description"
                    content="Browse a huge list of highly active React meetups!"
                />
            </Head>
            <MeetupList meetups={props.meetups} />;
        </Fragment>
    );
}

// export async function getServerSideProps(context) {
//     const res = context.res;
//     const req = context.req;

//     return {
//         props: {
//             meetups: DUMMY_MEETUP
//         }
//     }

// }

export async function getStaticProps() {
    // fetch data API
    const client = await MongoClient.connect(
        "mongodb+srv://saifloayhazem:45ZpDb6UcfdEdD2V@saifluay.82rs50x.mongodb.net/meetups?retryWrites=true&w=majority"
    );
    const db = client.db();
    const meetupCollection = db.collection("meetups");

    const meetups = await meetupCollection.find().toArray();

    client.close();
    return {
        props: {
            meetups: meetups.map((meetup) => ({
                title: meetup.title,
                image: meetup.image,
                address: meetup.address,
                id: meetup._id.toString(),
            })),
        },
        revalidate: 1,
    };
}

export default HomePage;
