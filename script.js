document.addEventListener("DOMContentLoaded", function () {
    const background = document.getElementById("background");
    const imageDir = ""; // Replace with the path to your image directory
    const tileWidth = 100; // Adjust the size of your tiles
    const tileHeight = 100;

    console.log('fuck!')

    // Load images and apply them as background tiles
    function loadImages() {
        fetchImages().then((images) => {
            const imageCount = images.length;
            const numTilesX = Math.ceil(window.innerWidth / tileWidth);
            const numTilesY = Math.ceil(window.innerHeight / tileHeight);
            
            for (let i = 0; i < numTilesX * numTilesY; i++) {
                const randomIndex = Math.floor(Math.random() * imageCount);
                const imageUrl = images[randomIndex];
                createTile(imageUrl);
            }
        });
    }

    // Fetch images from the specified directory
    async function fetchImages() {
        const response = await fetch(imageDir);
        const files = await response.text();
        const imageFiles = files
            .split("\n")
            .filter((file) => /\.(jpe?g|png|gif|bmp)$/i.test(file))
            .map((file) => `${imageDir}/${file}`);
        return imageFiles;
    }

    // Create a tile element and set the background image
    function createTile(imageUrl) {
        const tile = document.createElement("div");
        tile.className = "tile";
        tile.style.backgroundImage = `url(${imageUrl})`;
        background.appendChild(tile);
    }

    loadImages();
});
