import styles from "../styles/Deck.module.css";
import GiphyLogo from "../assets/giphyLogo.png";
import { useState } from "react";

/*
    Description: This is a sub-component that contains code for the sticker side panel in Edit component.
    Last updated: 7/13/2026
*/

type Giphy = {
    id: string;
    title: string;
    url: string;
};

function StickerSidePanel({ stickerPanel, stickerTools, createSticker, deleteSticker, setLoading, setError }: any) {
    const [giphyQuery, setGiphyQuery] = useState("");
    const [stickerResults, setStickerResults] = useState<Giphy[] | null>([]);

    const fetchStickers = async (e: any) =>  {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(`https://api.giphy.com/v1/stickers/search?api_key=${import.meta.env.VITE_GIPHY_API_KEY}&q=${giphyQuery.trim()}&limit=12&rating=g`);
            const data = await response.json();
            if (!response.ok) throw new Error(data.message);

            const stickers = data.data.map((item: any) => ({
                id: item.id,
                title: item.title,
                url: item.images.original_still.url
            }));

            setStickerResults(stickers);

        } catch(error: any) {
            setError({ status: true, message: error.message });

        } finally {
            setGiphyQuery("");
            setLoading(false);
        }
    }

    return (
        <div className={styles.sidePanel} style={{ display: stickerPanel ? "flex" : "none" }}>
            <div style={{ display: (stickerTools) ? "flex" : "none" }}>
                <div className={styles.sidePanelTitle}>Sticker Deletion</div>
                <div className={styles.sidePanelOptions}>
                    <button className={styles.sidePanelBtn} onClick={deleteSticker}>Delete</button>
                </div>
            </div>
            <div>
                <div className={styles.sidePanelTitle}>Stickers</div>
                <form onSubmit={fetchStickers} className={styles.sidePanelOptions}>
                    <input
                        type="text"
                        placeholder="Search for stickers"
                        value={giphyQuery}
                        onChange={(e) => setGiphyQuery(e.target.value)}
                    />
                    <button type="submit" className={styles.sidePanelFormBtn}>Search</button>
                </form>
                <div className={styles.giphyGrid}>
                    {stickerResults?.map((sticker) => (
                        <img
                            key={sticker.id}
                            src={sticker.url}
                            alt={sticker.title}
                            onClick={() => createSticker(sticker.url)}
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

export default StickerSidePanel;