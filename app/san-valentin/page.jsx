'use client'

import React, { useEffect, useRef } from "react";

export default function SanValentin() {
    const titleElementRef = useRef(null);
    const buttonsContainerRef = useRef(null);
    const yesButtonRef = useRef(null);
    const noButtonRef = useRef(null);
    const catImgRef = useRef(null);
    const noCountRef = useRef(0);

    useEffect(() => {
        const titleElement = titleElementRef.current;
        const yesButton = yesButtonRef.current;
        const noButton = noButtonRef.current;
        const catImg = catImgRef.current;

        const MAX_IMAGES = 5;

        let play = true;

        function handleYesClick() {
            titleElement.innerHTML = "Yeeeii!! :3";
            buttonsContainerRef.current.classList.add("hidden");
            changeImage("yes");
        }

        function resizeYesButton() {
            const computedStyle = window.getComputedStyle(yesButton);
            const fontSize = parseFloat(computedStyle.getPropertyValue("font-size"));
            const newFontSize = fontSize * 1.6;

            yesButton.style.fontSize = `${newFontSize}px`;
        }

        function generateMessage(noCount) {
            const messages = [
                "No",
                "Segura?",
                "Porfavorcito",
                "No me hagas esto :(",
                "Rompes mi corazón",
                "Orale como de que no",
            ];

            const messageIndex = Math.min(noCount, messages.length - 1);
            return messages[messageIndex];
        }

        function changeImage(image) {
            catImg.src = `/cat-${image}.jpg`;
        }

        function updateNoButtonText() {
            noButton.innerHTML = generateMessage(noCountRef.current);
        }

        function handleNoClick() {
            if (play) {
                noCountRef.current++;
                const imageIndex = Math.min(noCountRef.current, MAX_IMAGES);
                changeImage(imageIndex);
                resizeYesButton();
                updateNoButtonText();
                if (noCountRef.current === MAX_IMAGES) {
                    play = false;
                }
            }
        }

        yesButton.addEventListener("click", handleYesClick);
        noButton.addEventListener("click", handleNoClick);

        return () => {
            yesButton.removeEventListener("click", handleYesClick);
            noButton.removeEventListener("click", handleNoClick);
        };
    }, []);

    return (
        <>
            <main className="container">
                <img className="cat-img" ref={catImgRef} src="/cat-0.jpg" alt="Picture of a cat" />
                <p className="title" ref={titleElementRef}>Quieres ser mi Valentina Sandrita?</p>
                <div className="buttons" ref={buttonsContainerRef}>
                    <button type="button" className="btn btn--yes" ref={yesButtonRef}>Si</button>
                    <button type="button" className="btn btn--no" ref={noButtonRef}>No</button>
                </div>
            </main>
        </>
    );
}
