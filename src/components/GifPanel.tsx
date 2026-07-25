import {useState} from 'react';
import GiphyLogo from '../assets/giphyLogo.png'
import styles from "../styles/Deck.module.css";

type Giphy = {
    id: string;
    title: string;
    url: string;
};

function GifPanel ({gifPanel, createGif, gifTools, deleteGif, setLoading, setError}:any) {

    const [gifResults, setGifResults] = useState<Giphy[] | null>([]);
    const [giphyQuery, setGiphyQuery] = useState("");    

    const fetchGiphs = async (e: any) => {
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
    }

    return (
    <div className={styles.sidePanel} style={{ display: gifPanel ? "flex" : "none" }}>
        <div style={{ display: (gifTools) ? "flex" : "none" }}>
        <div className={styles.sidePanelTitle}>Giph Deletion</div>
        <div className={styles.sidePanelOptions}>
            <button className={styles.sidePanelBtn} onClick={deleteGif}>Delete</button>
        </div>
        </div>
        <div>
        <div className={styles.sidePanelTitle}>Gifs</div>
        <form onSubmit={fetchGiphs} className={styles.sidePanelOptions}>
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

    )

}
export default GifPanel;