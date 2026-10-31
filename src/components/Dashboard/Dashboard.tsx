import Navbar from "../Navbar";
import { useEffect, useState } from "react";
import styles from "../../styles/Dashboard.module.css";
import UserAuth from "../../util/AuthContext";
import DashboardAnimation from "./DashboardAnimation";
import FeedbackButton from "../FeedbackButton";
import DashboardToolbar from "./DashboardToolbar";
import CreateDeckForm from "./CreateDeckForm";
import RenameDeckForm from "./RenmeDeckForm";
import type Dashboard from "../../interfaces/Dashboard";

function Dashboard() {
    // manage user session, error handling, data loading
    const { session } = UserAuth();
    const [error, setError] = useState({ status: false, message: "" });
    const [loading, setLoading] = useState(false);
    
    // manage options in toolbar and overlays
    const [toolVisible, setToolVisible] = useState(false);
    const [createOverlay, setCreateOverlay] = useState(false);
    const [renameOverlay, setRenameOverlay] = useState(false);
    
    // stores id and name of all decks user has created
    const [decks, setDecks] = useState<Dashboard[]>([]);

    // to track number of decks user has created
    // user can only create 6 decks
    const [totalDecks, setTotalDecks] = useState(0);

    // id to fetch deck content in study or edit
    const [deckId, setDeckId] = useState<null | number>(null);

    // to store new or updated deck name value
    const [deckName, setDeckName] = useState("");

    function setDeckSelected(id: number | null, request: boolean) {
        setDeckId(id);
        setToolVisible(request);
    }

    function exitOverlay() {
        if (createOverlay) {
            setCreateOverlay(false);
        } else {
            setRenameOverlay(false);
        }
        setDeckName("");
        setDeckSelected(null, false);
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

    // VERIFY
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
                    name: deckName.trim()
                    // TODO: add initial content here
                })
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message);
            setDecks(prev => [...prev, data[0]]);
            setError({ status: false, message: "" });

        } catch(error: any) {
            setError({ status: true, message: error.message });

        } finally {
            setLoading(false);
            exitOverlay();
        } 
    };

    // VERIFY
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

            const data = await response.json();
            if (!response.ok) throw new Error(data.message);

            // update deck decks array
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

    // VERIFY
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
            setDecks(prevDecks => prevDecks.filter(deck => deck.id !== deckId)); 

        } catch(error: any) {
            setError({ status: true, message: error.message });

        } finally {
            setLoading(false);
            setDeckSelected(null, false);
        }
    };

    console.log(session);

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
                        toolVisible={toolVisible}
                        setDeckSelected={setDeckSelected}
                        setCreateOverlay={setCreateOverlay}
                        setRenameOverlay={setRenameOverlay}
                        deleteDeck={deleteDeck}
                    />
                    { (loading) ?
                        <div className={"error-message"}>
                            Loading request...
                        </div>
                    :
                        (error.status) ?
                            <div className={"error-message"}>{error.message}</div>
                        :
                            <></>
                    }
                    <div className={styles.deckList}>
                        {
                            decks.map(deck => 
                                <div 
                                    key={deck.id}
                                    className={styles.deck}
                                    onClick={() => setDeckSelected(deck.id, true)}
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
                            deckName={deckName}
                            setDeckName={setDeckName}
                            submitCreateForm={submitCreateForm}
                        />
                    }
                    { renameOverlay &&
                        <RenameDeckForm
                            exitOverlay={exitOverlay}
                            deckName={deckName}
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