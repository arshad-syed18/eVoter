import * as React from 'react';

export default function VotesPage(props){
    const elect = props.props;  // election id of the election clicked
    console.log(elect)
    return (
        <p>Hey! Add about Voting here here!{elect}</p>
    );
}