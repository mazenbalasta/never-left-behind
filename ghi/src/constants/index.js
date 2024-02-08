import { facebook, instagram, twitterX } from "../assets/icons";
import { FiMessageSquare } from "react-icons/fi";
import { GrResources } from "react-icons/gr";
import { MdCardMembership } from "react-icons/md";
import { RxActivityLog } from "react-icons/rx";
import React, { useState } from "react";


export const socialMedia = [
    { src: facebook, alt: "Facebook logo", link: "https://www.facebook.com/profile.php?id=61556115600897" },
    { src: instagram, alt: "Instagram logo", link: "https://www.instagram.com/neverlftbhnd/" },
    { src: twitterX, alt: "Twitter logo", link: "https://twitter.com/NeverLeftB/media" },
];

export const footerLinks = [
    {
        title: "Help",
        links: [
            { name: "About us", link: "/aboutus" },
            { name: "Privacy policy", link: "/" },
        ],
    },
    {
        title: "Get in touch",
        links: [
            { name: "Email us", link: "mailto:neverleftbehind.vite@gmail.com" },
            { name: "Need help call: 844.907-1342", link: "tel:(844) 907-1342" },
        ],
    },
        {
            title: "Local watering holes",
            links: [
                { name: "Latroy?", link: "/" },
                { name: "Placeholder", link: "/" },
            ],

        },
];

export const services = [
    {
        imgURL: FiMessageSquare,
        label: "Message Forum",
        subtext: "Share your thoughts and questions. Our members will help you get answers.",
        buttonText: "Let's talk",
        path: "/messages",
    },
    {
        imgURL: GrResources,
        label: "Resources",
        subtext: "Looking for veteran qualifications? We can help.",
        buttonText: "Find resources",
        path: "/resources",
    },
    {
        imgURL: RxActivityLog,
        label: "Activities",
        subtext: "Find what to do in your area with fellow veterans.",
        buttonText: "Find activities",
        path: "/activities",
    },
    {
        imgURL: MdCardMembership,
        label: "Benefits",
        subtext: 
        "Special benefits for:\n" +
        " - Veterans\n" +
        " - Partners\n",
        buttonText: "Learn more",
        path: "/benefits",
    },
];
