import { facebook, instagram, twitter } from "../assets/icons";
import { FiMessageSquare } from "react-icons/fi";
import { GrResources } from "react-icons/gr";
import { MdCardMembership } from "react-icons/md";
import { RxActivityLog } from "react-icons/rx";


export const socialMedia = [
    { src: facebook, alt: "Facebook logo", url: "https://www.facebook.com/profile.php?id=61556115600897" },
    { src: instagram, alt: "Instagram logo", url: "https://www.instagram.com/neverlftbhnd/" },
    { src: twitter, alt: "Twitter logo", url: "https://twitter.com/NeverLeftB/" },
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
            { name: "TS Name mailto: jimiHendrix@nlb.com" },
            { name: "Telephone tel: (123) 456-7890" },
        ],
    },
        {
        title: "Local Breweries",
        links: [
            { name: "Just want to find a local beer?", link: "/bars" },
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
        subtext: "I don't know what to say yet, but something is going here."
    },
];
