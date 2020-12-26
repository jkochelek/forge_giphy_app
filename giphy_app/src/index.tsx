// Importing required components from the UI kit
import ForgeUI, { render, Text, Fragment, Image, useAction, Button } from '@forge/ui';
// Importing the api object
import api from "@forge/api";

// GIPHY API base URL
const GIPHY_API_BASE = 'https://api.giphy.com/v1/gifs/';

// GiphyJson interface to be used by our getRandomGif function
interface GiphyJson {
    title: string;
    url: string;
}

// getRandomGif function makes the GIPHY API call to get a random GIF and filter out title and url
const getRandomGif = async (): Promise<GiphyJson> => {
    console.log("Making GIPHY API call...")
    const response = await api.fetch(
        `${GIPHY_API_BASE}random?api_key=${process.env.GIPHY_API_KEY}&rating=g`,
    );

    const {
        data: {
            title,
            images: {
                fixed_height: { url },
            },
        },
    } = await response.json();

    return {
        title,
        url,
    };
};

// ImageCardProps interface which will be used by ImageCard component
interface ImageCardProps {
    title: string;
    src: string;
}

// ImageCard component containing text and image
const ImageCard = ({title, src}: ImageCardProps) => (
    <Fragment>
        <Text content={title}/>
        <Image src={src} alt={title}/>
    </Fragment>
);

// App function will return the final output
const App = () => {
    const [{ title, url }, setRandomGif] = useAction(getRandomGif, getRandomGif);

    return (
      <Fragment>
        <Text content="Random GIF!" />
        <ImageCard src={url} title={title} />
        <Button
          text="🔀 Shuffle!"
          onClick={() => {
            setRandomGif();
          }}
        />
      </Fragment>
    );
};

// Exporting the above App function by exporting via 'run'
export const run = render(<App/>);