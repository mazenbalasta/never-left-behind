import { facebook, instagram, twitterX } from "../assets/icons";
import { FiMessageSquare } from "react-icons/fi";
import { GrResources } from "react-icons/gr";
import { MdCardMembership } from "react-icons/md";
import { RxActivityLog } from "react-icons/rx";

export const socialMedia = [
    { src: facebook, alt: "Facebook logo", link: "https://www.facebook.com/profile.php?id=61556115600897" },
    { src: instagram, alt: "Instagram logo", link: "https://www.instagram.com/neverlftbhnd/" },
    { src: twitterX, alt: "Twitter logo", link: "https://twitter.com/NeverLeftB/media" },
];

export const footerLinks = [
    {
        title: "Help",
        links: [
            { name: "About us", link: "/" },
            { name: "Resources", link: "/resources" },
            { name: "Benefits of becoming a Member", link: "/" },
            { name: "Privacy policy", link: "/" },
        ],
    },
    {
        title: "Get in touch",
        links: [
            { name: "@TS Name", link: "mailto:jimiHendrix@nlb.com" },
            { name: "Need help: 844.907-1342", link: "tel:(844) 907-1342" },
        ],
    },
        {
        title: "Local watering holes",
        links: [
            { name: "Latroy?", link: "/" },
            { name: "placeholder", link: "/" },
        ],
    },
];

export const services = [
    {
        imgURL: FiMessageSquare,
        label: "Message Forum",
        subtext: "Share your thoughts and questions. Our members will help you get answers."
    },
    {
        imgURL: GrResources,
        label: "Resources",
        subtext: "Looking for veteran qualifications? We can help."
    },
    {
        imgURL: RxActivityLog,
        label: "Activities",
        subtext: "Find what to do in your area with fellow veterans."
    },
    {
        imgURL: MdCardMembership,
        label: "Benefits",
        subtext: 
        " - Access to resources\n\n" +
        " - Access to message forum\n\n" +
        " - Access to activities\n\n" +
        " - Early access to new job\n" +
        "listings and events"
    },
];
