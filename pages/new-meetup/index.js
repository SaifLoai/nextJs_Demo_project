import { Fragment } from "react";
import Head from "next/head";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";

import { useRouter } from "next/router";

function NewMeetupPage() {
    const router = useRouter();
    async function addMeetupHandler(meetupData) {
        const response = await fetch("/api/new-meetup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(meetupData),
        });
        const data = await response.json();
        console.log(data);

        router.push("/");
    }

    return (
        <Fragment>
            <Head>
                <title>Add a New Meetup</title>
                <meta
                    name="description"
                    content="Add your own meetups and I create amazing networking opportunities."
                />
            </Head>
            <NewMeetupForm onAddMeetup={addMeetupHandler} />;
        </Fragment>
    );
}

export default NewMeetupPage;
