import React from "react";
import ReactHtmlParser from 'react-html-parser';
import Tag from "./Tag"
import "./PlayDetails.css"
import upcoming from "./upcoming.png"
import convertCloudinaryUrl from "./convert-cloudinary-url";

const PlayDetails = (props) => {
    // Working out whether we’sre displaying a poster, programme, or collage (if we’sre displaying any image).
    let imgType = "image"
    if (props.myRoles.includes("poster-designer") || props.myRoles.includes("co-designer")) {
        imgType = "poster"
    }
    else if (props.myRoles.includes("programme-designer")) {
        imgType = "programme"
    }
    else if (props.myRoles.includes("photographer")) {
        imgType = "collage of photos"
    }
    // Calculating whether an Upcoming! sticker should be displayed.
    let date = new Date().getTime()/1000
    let isUpcoming = date<props.epochLastPerformance
    // Let’s create a Tag element for every troupe.
    let byMap = props.byArray.map((troupe,index)=>{return <Tag text={troupe} key={index} handler={()=>{props.troupeHandler(props.byArraySlug[index])}}/>})
    let className = (props.cloudinary ? "play-details" : "play-details play-details-text-only") + " oneOf"+props.numPlays;
    return (
        // If a URL for the image is specified in the data, we don’st want a className of play-details-text-only.
        <section className={className}>
            {/* If a URL for the image is specified in the data, we display the image. */}
            {props.cloudinary ? <img src={convertCloudinaryUrl(props.cloudinary,400,null)} alt={ReactHtmlParser(props.title)+" "+imgType} className={props.posterOrientation}/> : null}
            {/* Displaying the text */}
            <div className={props.cloudinary ? "play-text" : "play-text-only"}>
                {/* Displaying the Upcoming! sticker if appropriate. */}
                {isUpcoming ? <img className="upcoming" alt="Upcoming!" src={upcoming} onClick={props.upcomingHandler} title="See all upcoming productions"/> : null}
                {/* The heading is the play’s title */}
                <h2 className="play-title" onClick={()=>{props.slugHandler(props.slug)}} title={"See only "+props.title}>{ReactHtmlParser(props.title)}</h2>
                {/* Performance dates and troupes */}
                <p className="play-by-p"><span className="subheading">{isUpcoming ? "To be ".concat(props.verb.toLowerCase()) : props.verb}</span> <Tag handler={props.yearHandler} text={props.datesAsText} /> 
                {props.datePrecision === "month" ? <span>{" "}(I can&rsquo;t be more precise than that)</span> : null }
                &nbsp;<span className="subheading">by</span> {byMap}</p>
                {/* Play synopsis */}
                {props.synopsis ? <p className="synopsis"><span className="subheading">Synopsis:</span> {ReactHtmlParser(props.synopsis)}</p> : null}
                {/* List of my roles */}
                <p className="play-roles-p"><span className="subheading">My roles:</span>{" "} 
                    {props.myRoles.includes("actor") ? <Tag handler={props.roleHandler} text="actor"/> : null}
                    {props.myRoles.includes("poster-designer") ? <Tag handler={props.roleHandler} text="poster-designer"/> : null}
                    {props.myRoles.includes("programme-designer") ? <Tag handler={props.roleHandler} text="programme-designer"/> : null}
                    {props.myRoles.includes("lyricist") ? <Tag handler={props.roleHandler} text="lyricist" /> : null}
                    {props.myRoles.includes("photographer") ? <Tag handler={props.roleHandler} text="photographer"/> : null}
                    {props.myRoles.includes("assistant-director") ? <Tag handler={props.roleHandler} text="assistant-director"/> : null}
                    {props.myRoles.includes("co-designer") ? <Tag handler={props.roleHandler} text="co-designer of the poster (with illustration by Alison Pitt)"/> : null}
                </p>
                {/* If I lyricized songs, they are listed. */}
                {props.mySongsLyricized ? <p><span className="subheading">Songs I lyricized:</span> {props.mySongsLyricized.map((song,index)=>{return <span key={index} className="song-title">{ReactHtmlParser(song)}</span>})}</p> : null}
                {/* If there’s an example lyric, it’s displayed. */}
                {props.exampleLyric ? <p className="example-lyric"><span className="subheading">Example lyric:</span><br/>
                {ReactHtmlParser(props.exampleLyric)}</p> : null}
                {props.cloudinary ? <p className="see-pdf"><a href={convertCloudinaryUrl(props.cloudinary,1280,"pdf")} title={"See "+imgType+" as a PDF"}><i className="far fa-file"></i>See {imgType} as a PDF</a></p> : null}
            </div>
        </section>
    )
}
export default PlayDetails