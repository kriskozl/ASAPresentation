const track = document.getElementById("image-track");
const textContainer = document.getElementById('text-container');

const handleOnDown = (e) => {
    track.dataset.mouseDownAt = e.clientX;
};

const handleOnUp = () => {
    track.dataset.mouseDownAt = "0";
    track.dataset.prevPercentage = track.dataset.percentage || "0";
};

const checkOverlap = () => {
    // Check if the image track overlaps with the text container
    const trackRect = track.getBoundingClientRect();
    const textRect = textContainer.getBoundingClientRect();

    const overlap = !(trackRect.right < textRect.left ||
        trackRect.left > textRect.right ||
        trackRect.bottom < textRect.top ||
        trackRect.top > textRect.bottom);
    if (overlap) {
        // If they overlap, hide the text
        textContainer.classList.add('hidden');
    } else {
        // If they don't overlap, show the text
        textContainer.classList.remove('hidden');
    }

    requestAnimationFrame(checkOverlap);
};

const handleOnMove = (e) => {
    if (track.dataset.mouseDownAt === "0") return;

    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth / 2;

    const percentage = (mouseDelta / maxDelta) * -100,
        nextPercentageUnconstrained =
            parseFloat(track.dataset.prevPercentage) + percentage,
        nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

    track.dataset.percentage = nextPercentage;

    track.animate(
        {
            transform: `translate(${nextPercentage}%, -50%)`,
        },
        { duration: 1200, fill: "forwards" }
    );

    for (const image of track.getElementsByClassName("image")) {
        image.animate(
            {
                objectPosition: `${100 + nextPercentage}% center`,
            },
            { duration: 1200, fill: "forwards" }
        );
    }
};

window.onmousedown = (e) => handleOnDown(e);
window.ontouchstart = (e) => handleOnDown(e.touches[0]);
window.onmouseup = handleOnUp;
window.ontouchend = handleOnUp;
window.onmousemove = (e) => handleOnMove(e);
window.ontouchmove = (e) => handleOnMove(e.touches[0]);
// Start the continuous overlap check
checkOverlap();