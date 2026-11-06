import Navbar from "../Navbar";
import { useEffect, useState } from "react";
import styles from "../../styles/Dashboard.module.css";
import UserAuth from "../../util/AuthContext";
import DashboardAnimation from "./DashboardAnimation";
import FeedbackButton from "../FeedbackButton";
import DashboardToolbar from "./DashboardToolbar";
import CreateDeckForm from "./CreateDeckForm";
import RenameDeckForm from "./RenameDeckForm";
import type Deck from "../../interfaces/Deck";
import Alert from "@mui/material/Alert";

/*
    Description: This component contains code for the Dashboard which displays all the decks.
    Last updated: 11/5/2026
*/

function Dashboard() {
    // manage user session, error handling, data loading
    const { session } = UserAuth();
    const [error, setError] = useState({ status: false, message: "" });
    const [loading, setLoading] = useState(false);
    
    // manage options in toolbar and overlays
    const [showTools, setShowTools] = useState(false);
    const [createOverlay, setCreateOverlay] = useState(false);
    const [renameOverlay, setRenameOverlay] = useState(false);
    
    // stores id and name of all decks user has created
    const [decks, setDecks] = useState<Deck[]>([]);

    // to track number of decks user has created
    // user can only create 6 decks
    const [totalDecks, setTotalDecks] = useState(0);

    // id to fetch deck content in study or edit
    const [deckId, setDeckId] = useState<null | number>(null);

    // to store new or updated deck name value
    const [deckName, setDeckName] = useState("");

    function exitOverlay() {
        if (createOverlay) {
            setCreateOverlay(false);
        } else {
            setRenameOverlay(false);
        }
        setDeckName("");
        setDeckId(null);
        setShowTools(false);
    }

    // function to fetch all decks user has created when dashboard is opened
    const fetchDeckData = async () => {
        setLoading(true);

        try {
            const response = await fetch(`${import.meta.env.VITE_FLASHIER_CARDS_API}/api/deck`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${session.access_token}`
                }
            });

            // returns empty array or an array of objects
            const data = await response.json();
            if (!response.ok) throw new Error(data.message);

            setDecks(data);
            setTotalDecks(data.length);

        } catch(error: any) {
            setError({ status: true, message: error.message });

        } finally {
            setLoading(false);
        }
    };

    // function to create a new deck
    const submitCreateForm = async (e: any) => {
        e.preventDefault();
        setLoading(true);

        try {
            // verify user input
            if (deckName === "") {
                throw new Error("Please enter a deck name.");
            } else if ((totalDecks + 1) > 6) {
                throw new Error("You can only create up to 6 decks.");
            }

            // create a deck in Supabase
            const response = await fetch(`${import.meta.env.VITE_FLASHIER_CARDS_API}/api/deck`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${session.access_token}`
                },
                body: JSON.stringify({
                    name: deckName.trim(),
                    content: [{
                        front_card: {text: [], gif: [], sticker: []},
                        back_card: {text: [], gif: [], sticker: []}
                    }]
                })
            });

            // returns an array with one object with deck id, name, and content
            const data = await response.json();
            if (!response.ok) throw new Error(data.message);

            setDecks(prev => [...prev, {id: data[0].id, name: data[0].name}]);
            setTotalDecks(prevTotal => prevTotal + 1);
            setError({ status: false, message: "" });

        } catch(error: any) {
            setError({ status: true, message: error.message });

        } finally {
            setLoading(false);
            exitOverlay();
        } 
    };

    // function to rename a deck
    const submitRenameForm = async (e: any) => {
        e.preventDefault();
        setLoading(true);

        try {
            // verify user input
            if (deckName === "") {
                throw new Error("Please enter a deck name.");
            }

            // update a deck in Supabase
            const response = await fetch(`${import.meta.env.VITE_FLASHIER_CARDS_API}/api/deck/${deckId}/name`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${session.access_token}`
                },
                body: JSON.stringify({
                    name: deckName.trim()
                })
            });

            // returns an array with one object with deck id and name
            const data = await response.json();
            if (!response.ok) throw new Error(data.message);

            // update decks array
            setDecks(prevDecks => 
                prevDecks.map(deck => 
                    deck.id === data[0].id ? data[0] : deck
                )
            );

            setError({ status: false, message: "" });
            
        } catch(error: any) {
            setError({ status: true, message: error.message });

        } finally {
            setLoading(false);
            exitOverlay();
        }
    };

    // function to delete a deck
    const deleteDeck = async () => {
        setLoading(true);

        try {
            // delete a deck in Supabase
            const response = await fetch(`${import.meta.env.VITE_FLASHIER_CARDS_API}/api/deck/${deckId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${session.access_token}`
                }
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message);

            // remove the deck that was deleted
            setDecks(prevDecks => prevDecks.filter(deck => deck.id !== deckId)); 
            setTotalDecks(prevTotal => prevTotal - 1);

        } catch(error: any) {
            setError({ status: true, message: error.message });

        } finally {
            setLoading(false);
            setDeckId(null);
            setShowTools(false);
        }
    };

    useEffect(() => {
        fetchDeckData();
    }, []);

    return (
        <>
            <DashboardAnimation />
            <div className={styles.mainContainer} style={{ pointerEvents: createOverlay || renameOverlay ? "none" : "auto" }}>
                <Navbar />
                <div className={styles.subContainer}>
                    <div className={"app-title"}>
                        Flashier Cards
                    </div>
                    <DashboardToolbar 
                        deckId={deckId}
                        setDeckId={setDeckId}
                        showTools={showTools}
                        setShowTools={setShowTools}
                        setCreateOverlay={setCreateOverlay}
                        setRenameOverlay={setRenameOverlay}
                        deleteDeck={deleteDeck}
                    />
                    { (loading) ?
                        <Alert severity="info" style={{marginBottom: "0.5rem"}}>
                            Loading request...
                        </Alert>
                    :
                        (error.status) ?
                            <Alert severity="error" style={{marginBottom: "0.5rem"}}>
                                {error.message}
                            </Alert>
                        :
                            <></>
                    }
                    <div className={styles.deckList}>
                        {
                            decks.map(deck => 
                                <div 
                                    key={deck.id}
                                    className={styles.deck}
                                    onClick={() => {
                                        setDeckId(deck.id);
                                        setShowTools(true);
                                    }}
                                    style={{ border: (deck.id == deckId) ? "2px solid #004A94" : "" }}
                                >
                                    {deck.name}
                                </div>
                            )
                        }
                    </div>
                    { createOverlay &&
                        <CreateDeckForm
                            exitOverlay={exitOverlay}
                            setDeckName={setDeckName}
                            submitCreateForm={submitCreateForm}
                        />
                    }
                    { renameOverlay &&
                        <RenameDeckForm
                            exitOverlay={exitOverlay}
                            setDeckName={setDeckName}
                            submitRenameForm={submitRenameForm}
                        />
                    }
                </div>
            </div>
            <FeedbackButton />
        </>
    );
}

export default Dashboard;