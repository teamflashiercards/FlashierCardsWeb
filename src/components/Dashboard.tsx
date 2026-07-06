import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faPlus, faFolderOpen, faPencil, faICursor, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState, type ChangeEvent } from 'react';
import type Deck from "../interfaces/Deck";
import styles from "../styles/Dashboard.module.css";
import UserAuth from "../AuthContext";
import DashboardAnimation from "./DashboardAnimation";
import FeedbackButton from "./FeedbackButton";
import BlueTooltip from "./BlueTooltip";

function Dashboard() {
    const navigate = useNavigate();
    const [error, setError] = useState({ status: false, message: "" });
    const [loading, setLoading] = useState(false);
    const { session } = UserAuth();
    const [toolVisible, setToolVisible] = useState(false);
    const [createOverlay, setCreateOverlay] = useState(false);
    const [renameOverlay, setRenameOverlay] = useState(false);
    const [deckName, setDeckName] = useState("");
    const [deckId, setDeckId] = useState<null | number>(null);
    const [decks, setDecks] = useState<Deck[]>([]);
    const [totalDecks, setTotalDecks] = useState(0);
    
    function handleFormData(e: ChangeEvent<HTMLInputElement>) {
        setDeckName(e.target.value);
    }

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
    }

    const fetchDeckData = async () => {
        setLoading(true);

        try {
            // get array of all decks from Supabase
            const response = await fetch(`${import.meta.env.VITE_FLASHIER_CARDS_API}/api/deck`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${session.access_token}`
                }
            });

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

    const createNewDeckContent = async (deckId: number) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_FLASHIER_CARDS_API}/api/deck/${deckId}/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${session.access_token}`
                },
                body: JSON.stringify({
                    front_card: {
                        id: null,
                        deck_id: deckId,
                        card_num: 1,
                        card_side: "front"
                    },
                    back_card: {
                        id: null,
                        deck_id: deckId,
                        card_num: 1,
                        card_side: "back"
                    }
                })
            });
            
            const data = await response.json();
            if (!response.ok)  throw new Error(data.message);

        } catch (error: any) {
            throw new Error(error.message);
        }
    };

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
                })
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message);
            setDecks(prev => [...prev, data[0]]);
            createNewDeckContent(data[0].id);
            setError({ status: false, message: "" });

        } catch(error: any) {
            setError({ status: true, message: error.message });

        } finally {
            setLoading(false);
            exitOverlay();
            setDeckSelected(null, false);
        } 
    };

    const submitRenameForm = async (e: any) => {
        e.preventDefault();
        setLoading(true);

        try {
            // verify user input
            if (deckName === "") {
                throw new Error("Please enter a deck name.");
            }

            // update a deck in Supabase
            const response = await fetch(`${import.meta.env.VITE_FLASHIER_CARDS_API}/api/deck/${deckId}`, {
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
            setDeckSelected(null, false);
        }
    };

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
                    <div className={styles.toolbar}>
                        <BlueTooltip title="Create New Deck">
                            <button
                                type="button"
                                className={styles.toolOption}
                                onClick={() => setCreateOverlay(true)} 
                            >
                                <span className={styles.shadow}></span>
                                <span className={styles.edge}></span>
                                <span className={styles.front}>
                                    <FontAwesomeIcon icon={faPlus} />
                                </span>
                            </button>
                        </BlueTooltip>
                        <BlueTooltip title="Study Deck">
                            <button
                                type="button"
                                style={{ display: toolVisible ? "inline-block" : "none" }}
                                className={styles.toolOption}
                                onClick={() => navigate(`/dashboard/study/${deckId}`)}
                            >
                                <span className={styles.shadow}></span>
                                <span className={styles.edge}></span>
                                <span className={styles.front}>
                                    <FontAwesomeIcon icon={faFolderOpen} />
                                </span>
                            </button>
                        </BlueTooltip>
                        <BlueTooltip title="Edit Deck">
                            <button
                                type="button"
                                style={{ display: toolVisible ? "inline-block" : "none" }}
                                className={styles.toolOption}
                                onClick={() => navigate(`/dashboard/edit/${deckId}`)}
                            >
                                <span className={styles.shadow}></span>
                                <span className={styles.edge}></span>
                                <span className={styles.front}>
                                    <FontAwesomeIcon icon={faPencil} />
                                </span>
                            </button>
                        </BlueTooltip>
                        <BlueTooltip title="Rename Deck">
                            <button
                                type="button"
                                style={{ display: toolVisible ? "inline-block" : "none" }}
                                className={styles.toolOption}
                                onClick={() => setRenameOverlay(true)}
                            >
                                <span className={styles.shadow}></span>
                                <span className={styles.edge}></span>
                                <span className={styles.front}>
                                    <FontAwesomeIcon icon={faICursor} />
                                </span>
                            </button>
                        </BlueTooltip>
                        <BlueTooltip title="Delete Deck">
                            <button
                                type="button"
                                style={{ display: toolVisible ? "inline-block" : "none" }}
                                className={styles.toolOption}
                                onClick={deleteDeck}
                            >
                                <span className={styles.shadow}></span>
                                <span className={styles.edge}></span>
                                <span className={styles.front}>
                                    <FontAwesomeIcon icon={faTrash} />
                                </span>
                            </button>
                        </BlueTooltip>
                        <BlueTooltip title="Cancel Selection">
                            <button
                                type="button"
                                onClick={() => setDeckSelected(null, false)}
                                style={{ display: toolVisible ? "inline-block" : "none" }}
                                className={styles.toolOption}
                            >
                                <span className={styles.shadow}></span>
                                <span className={styles.edge}></span>
                                <span className={styles.front}>
                                    <FontAwesomeIcon icon={faCircleXmark} />
                                </span>
                            </button>
                        </BlueTooltip>
                    </div>
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
                    <div className={styles.overlay} style={{ display: createOverlay ? "flex" : "none" }}>
                        <div className={styles.exitBtn}>
                            <FontAwesomeIcon 
                                icon={faCircleXmark} 
                                onClick={exitOverlay}
                                style={{cursor: "pointer"}}
                            />
                        </div>
                        <form className={styles.form} onSubmit={submitCreateForm}>
                            <div>
                                <div className={styles.formText}>
                                    Name
                                </div>
                                <input 
                                    type="text"
                                    name="deckName"
                                    value={deckName}
                                    onChange={handleFormData}
                                />
                            </div>
                            <button
                                type="submit"
                                className={"fancy-btn"}
                            >
                                <span className={"dark-blue-btn-shadow"}></span>
                                <span className={"dark-blue-btn-edge"}></span>
                                <span className={"dark-blue-btn-front"} style={{ minWidth: "150px"}}>Create deck</span>
                            </button>
                        </form>
                    </div>
                    <div className={styles.overlay} style={{ display: renameOverlay ? "flex" : "none" }}>
                        <div className={styles.exitBtn}>
                            <FontAwesomeIcon 
                                icon={faCircleXmark} 
                                onClick={exitOverlay}
                                style={{cursor: "pointer"}}
                            />
                        </div>
                        <form className={styles.form} onSubmit={submitRenameForm}>
                            <div>
                                <div className={styles.formText}>
                                    Name
                                </div>
                                <input 
                                    type="text"
                                    name="deckName"
                                    value={deckName}
                                    onChange={handleFormData}
                                />
                            </div>
                            <button
                                type="submit"
                                className={"fancy-btn"}
                            >
                                <span className={"dark-blue-btn-shadow"}></span>
                                <span className={"dark-blue-btn-edge"}></span>
                                <span className={"dark-blue-btn-front"} style={{ minWidth: "150px"}}>Rename deck</span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <FeedbackButton />
        </>
    );
}

export default Dashboard;