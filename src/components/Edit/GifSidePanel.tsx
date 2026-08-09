import {useState} from 'react';
import GiphyLogo from '../../assets/giphyLogo.png'
import styles from "../../styles/Deck.module.css";
import type Giphy from "../../interfaces/Giphy";
import { setFrontCard, setBackCard, deleteFrontCard, deleteBackCard } from './EditHelpers';
import type GifSidePanelProps from '../../interfaces/GifSidePanelProps';

/*
    Description: This is a sub-component that contains code for the gif side panel in Edit component.
    Last updated: 8/9/2026
*/

function GifSidePanel (props: GifSidePanelProps) {
    const { setLoading, setError, gifTools, showGifTools, cardSide, cardNum, gifIndex, frontCards, setFrontCards, backCards, setBackCards } = props;
    const [gifResults, setGifResults] = useState<Giphy[] | null>([]);
    const [giphyQuery, setGiphyQuery] = useState("");    

    const fetchGifs = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${import.meta.env.VITE_GIPHY_API_KEY}&q=${giphyQuery.trim()}&limit=12&rating=g`);
            const data = await response.json();
            if (!response.ok) throw new Error(data.message);

            const gifs = data.data.map((item: any) => ({
                id: item.id,
                title: item.title,
                url: item.images.original.url
            }));

            setGifResults(gifs);

        } catch(error: any) {
            setError({ status: true, message: error.message });
        
        } finally {
            setGiphyQuery("");
            setLoading(false);
        }
    };

    // function create gifs with helpers in EditHelpers
    function createGif(gifUrl: string) {
        if (cardSide === "Front") {
            let content = {id: null, card_id: frontCards[cardNum - 1].id, url: gifUrl, width: 120, height: 120, x: 50, y: 50};
            setFrontCard("gif", content, setFrontCards, cardNum);
        } else {
            let content = {id: null, card_id: backCards[cardNum - 1].id, url: gifUrl, width: 120, height: 120, x: 50, y: 50};
            setBackCard("gif", content, setBackCards, cardNum);
        }
    }

    // function to delete gifs with helpers in EditHelpers
    function deleteGif() {
        if (cardSide === "Front") {
            deleteFrontCard("gif", gifIndex!, setFrontCards, cardNum);
        } else {
            deleteBackCard("gif", gifIndex!, setBackCards, cardNum);
        }
        showGifTools(false, null, gifResults);
    }

    return (
        <div className={styles.sidePanel}>
            <div style={{ display: (gifTools) ? "flex" : "none" }}>
                <div className={styles.sidePanelTitle}>Giph Deletion</div>
                <div className={styles.sidePanelOptions}>
                    <button className={styles.sidePanelBtn} onClick={deleteGif}>Delete</button>
                </div>
            </div>
            <div>
                <div className={styles.sidePanelTitle}>Gifs</div>
                <form onSubmit={fetchGifs} className={styles.sidePanelOptions}>
                    <input
                        type="text"
                        placeholder="Search for gifs"
                        value={giphyQuery}
                        onChange={(e) => setGiphyQuery(e.target.value)}
                    />
                    <button type="submit" className={styles.sidePanelFormBtn}>Search</button>
                </form>
                <div className={styles.giphyGrid}>
                    {gifResults?.map((gif) => (
                        <img
                            key={gif.id}
                            src={gif.url}
                            alt={gif.title}
                            onClick={() => createGif(gif.url)}
                        />
                    ))}
                </div>
                <div className={styles.giphyLogo}>
                    <img src={GiphyLogo} alt="Powered by GIPHY" />
                </div>    
            </div>
        </div>
    );
}

export default GifSidePanel;