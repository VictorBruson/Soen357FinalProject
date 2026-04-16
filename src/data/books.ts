import type {Book} from "../types/book.ts";

export const BOOKS_DATA: Book[] = [
    {
        isbn: "bk-101",
        title: "Fundamentals of Software Architecture",
        authors: ["Mark Richards", "Neal Ford"],
        courseCode: "CS-402",
        required: true,
        categories: ["Software Engineering", "Web Development"],
        coverImage: "src/assets/covers/bk-101.jpg",
        description: "A comprehensive guide to distributed systems and frontend scalability.",
        length: "12 chapters",
        chapters: [
            {
                id: "ch-1",
                number: 1,
                title: "The Evolution of State",
                summary: "Understanding the shift from server-side to edge-side state management.",
                length: "15 min read",
                content: [
                    {
                        type: "heading",
                        level: 2,
                        text: "The Shift to Client-Side State"
                    },
                    {
                        type: "paragraph",
                        text: "In the early days of the web, the server was the source of truth. Today, we treat the browser as a sophisticated runtime."
                    },
                    {
                        type: "code",
                        language: "typescript",
                        code: "const [state, dispatch] = useReducer(reducer, initialState);"
                    },
                    {
                        type: "quote",
                        text: "The network is reliable—until it isn't. Design for the offline-first reality."
                    }
                ]
            },
            {
                id: "ch-2",
                number: 2,
                title: "The Fallacy of the Monolith",
                summary: "Deconstructing the monolith and the trade-offs of microservices.",
                length: "20 min read",
                content: [
                    {
                        type: "heading",
                        level: 2,
                        text: "The Distributed Salami"
                    },
                    {
                        type: "paragraph",
                        text: "Many teams attempt to 'fix' their monolith by simply slicing it into microservices without addressing the underlying coupling. This results in a 'Distributed Monolith'—all the complexity of microservices with none of the benefits of independent scaling."
                    },
                    {
                        type: "code",
                        language: "typescript",
                        code: "// The anti-pattern: Tight coupling via shared database\ninterface SharedServiceData {\n  userId: string;\n  legacyField: any; // Causes cascading failures\n}"
                    },
                    {
                        type: "list",
                        items: [
                            "Bounded Contexts: Defining clear boundaries for service ownership.",
                            "Eventual Consistency: Trading immediate accuracy for system availability.",
                            "Service Mesh: Managing the 'Tax' of network communication."
                        ]
                    }
                ]
            }
        ],
        trendingRank: 1
    },
    {
        isbn: "bk-202",
        title: "The Quantum Paradox",
        authors: ["William Lbeyne"],
        courseCode: "PHI-305",
        required: false,
        coverImage: "src/assets/covers/bk-202.jpg",
        categories: ["Philosophy", "Physics"],
        description: "Exploring moral implications of multi-state decision making.",
        chapters: [
            {
                id: "qe-ch1",
                number: 1,
                title: "Superposition and Responsibility",
                content: [
                    {
                        type: "heading",
                        level: 1,
                        text: "The Observer's Dilemma"
                    },
                    {
                        type: "list",
                        items: [
                            "Entanglement of moral agency",
                            "The collapse of the ethical wave function",
                            "Non-local consequences"
                        ]
                    },
                    {
                        type: "separator"
                    },
                    {
                        type: "image",
                        src: "https://assets.example.com/diagrams/quantum-matrix.png",
                        caption: "Figure 1.1: The probability matrix of ethical outcomes."
                    }
                ]
            },
            {
                id: "qe-ch2",
                number: 2,
                title: "Bifurcation of the Self",
                content: [
                    {
                        type: "heading",
                        level: 2,
                        text: "The Everettian Moral Framework"
                    },
                    {
                        type: "paragraph",
                        text: "If every quantum event results in a branching of the universe, the concept of a 'singular' moral legacy becomes a mathematical impossibility. Hugh Everett’s interpretation suggests that every choice we didn't make is currently being lived out by a version of ourselves in a parallel Hilbert space."
                    },
                    {
                        type: "quote",
                        text: "Regret is a symptom of believing in a single timeline."
                    },
                    {
                        type: "list",
                        items: [
                            "The Ethics of Infinite Versions: Do we owe a duty of care to our 'other' selves?",
                            "Quantum Suicide: The terrifying logic of subjective immortality.",
                            "Divergence points: Identifying the 'High-Stakes' quantum decoherence events in daily life."
                        ]
                    },
                    {
                        type: "code",
                        language: "markdown",
                        code: "Probability(Outcome A) + Probability(Outcome B) = 1.0\nLegacy(Outcome A) + Legacy(Outcome B) = Reality"
                    }
                ]
            }
        ],
        trendingRank: 4
    },
    {
        isbn: "bk-404",
        title: "Hands-On Rust Concurrency",
        authors: ["Bryan Troutwine"],
        courseCode: "CS-501",
        required: true,
        categories: ["Systems Programming", "Rust"],
        coverImage: "src/assets/covers/bk-404.jpg",
        description: "A deep dive into fearless concurrency, memory safety, and the Send/Sync traits.",
        length: "14 Chapters",
        chapters: [
            {
                id: "rust-ch-1",
                number: 1,
                title: "Ownership and Threads",
                summary: "How the borrow checker prevents data races at compile time.",
                length: "18 min read",
                content: [
                    {
                        type: "heading",
                        level: 2,
                        text: "The Rules of Engagement"
                    },
                    {
                        type: "paragraph",
                        text: "Concurrency in Rust is built on the same foundations as memory safety: ownership. You can't have a data race if the compiler ensures only one thread can mutate data at a time."
                    },
                    {
                        type: "code",
                        language: "rust",
                        code: "use std::thread;\n\nlet handle = thread::spawn(|| {\n    println!(\"Hello from the spawned thread!\");\n});"
                    },
                    {
                        type: "list",
                        items: [
                            "Immutable data is always thread-safe.",
                            "The Send trait allows ownership transfer between threads.",
                            "The Sync trait allows access from multiple threads via references."
                        ]
                    }
                ]
            },
            {
                id: "rust-ch-2",
                number: 2,
                title: "Shared State and Mutexes",
                summary: "Managing mutable data across threads using Atomically Reference Counted (ARC) pointers and Mutexes.",
                length: "22 min read",
                content: [
                    {
                        type: "heading",
                        level: 2,
                        text: "The Problem with Shared Mutability"
                    },
                    {
                        type: "paragraph",
                        text: "In many languages, sharing a counter between threads is a recipe for a race condition. Rust solves this by wrapping data in a Mutex (Mutual Exclusion) container, ensuring only one thread can access the data at a time."
                    },
                    {
                        type: "code",
                        language: "rust",
                        code: "use std::sync::{Arc, Mutex};\nuse std::thread;\n\nlet counter = Arc::new(Mutex::new(0));\nlet mut handles = vec![];\n\nfor _ in 0..10 {\n    let counter = Arc::clone(&counter);\n    let handle = thread::spawn(move || {\n        let mut num = counter.lock().unwrap();\n        *num += 1;\n    });\n    handles.push(handle);\n}"
                    },
                    {
                        type: "list",
                        items: [
                            "Arc (Atomic Reference Counting) allows multiple ownership across threads.",
                            "Locking a Mutex returns a 'Guard' that automatically releases the lock when it goes out of scope.",
                            "The compiler prevents you from accessing the inner data without first calling .lock()."
                        ]
                    },
                    {
                        type: "quote",
                        text: "Rust doesn't just make concurrency possible; it makes it boring by removing the fear of memory corruption."
                    }
                ]
            }
        ]
    },
    {
        isbn: "bk-702",
        title: "The Urbanism Reader",
        authors: ["Stefan Al", "Tom Verebes"],
        categories: ["Sociology", "Architecture"],
        coverImage: "src/assets/covers/bk-702.jpg",
        description: "Examining how augmented reality layers are redefining public spaces in Tokyo and Seoul.",
        length: "200 pages",
        chapters: [
            {
                id: "urban-ch-4",
                number: 4,
                title: "The Ghost in the Plaza",
                content: [
                    {
                        type: "heading",
                        level: 1,
                        text: "Layered Realities"
                    },
                    {
                        type: "quote",
                        text: "A city is no longer just concrete and steel; it is a stack of data protocols rendered in light."
                    },
                    {
                        type: "image",
                        src: "https://assets.urban-studies.org/tokyo-ar-overlay.jpg",
                        caption: "Visualizing the AR advertising density in Shibuya Crossing."
                    },
                    {
                        type: "separator"
                    },
                    {
                        type: "paragraph",
                        text: "When citizens begin to navigate via digital overlays, the physical architecture becomes a secondary 'canvas' for information delivery."
                    },
                    {
                        type: "heading",
                        level: 2,
                        text: "The Erosion of Physical Signage"
                    },
                    {
                        type: "paragraph",
                        text: "As digital overlays become the primary method of navigation, the traditional 'wayfinding' of the city—street signs, landmark plaques, and physical maps—begins to decay. In Seoul's Gangnam district, pilot programs have already replaced physical bus stop schedules with AR-only nodes, creating a 'digital divide' where those without the necessary hardware are effectively blind to the city's infrastructure."
                    }
                ],
                metadata: {
                    difficulty: "Advanced",
                    readingLevel: "Graduate"
                }
            },
            {
                id: "urban-ch-5",
                number: 5,
                title: "Metabolic Resilience",
                content: [
                    {
                        type: "heading",
                        level: 1,
                        text: "Cities as Living Organisms"
                    },
                    {
                        type: "paragraph",
                        text: "Drawing from the Japanese Metabolism movement of the 1960s, we now view the 'Smart City' not as a finished product, but as a biological system capable of self-repair and modular expansion."
                    },
                    {
                        type: "list",
                        items: [
                            "Modular housing units controlled by occupancy algorithms.",
                            "Self-healing infrastructure: Using bio-concrete and sensor networks.",
                            "The circular resource loop: Waste-to-energy systems in high-density zones."
                        ]
                    },
                    {
                        type: "image",
                        src: "https://assets.urban-studies.org/metabolist-diagram.jpg",
                        caption: "Figure 5.2: A schematic of the Nakagin-inspired modular growth model for the 21st century."
                    }
                ]
            },
            {
                id: "urban-ch-6",
                number: 6,
                title: "Algorithmic Zoning",
                content: [
                    {
                        type: "heading",
                        level: 2,
                        text: "The End of Static Planning"
                    },
                    {
                        type: "paragraph",
                        text: "Historically, urban planning was a slow, bureaucratic process involving decades of physical mapping. In the contemporary 'data-stacked' city, zoning is becoming dynamic. Algorithms now adjust traffic flow, public lighting intensity, and even vendor permits in real-time based on pedestrian density and heat signatures."
                    },
                    {
                        type: "list",
                        items: [
                            "Predictive Policing vs. Predictive Planning: The ethics of data-driven surveillance.",
                            "The Digital Commons: Who owns the data generated by citizens in public squares?",
                            "Tactical Urbanism: How low-cost, temporary changes (like pop-up parks) are tested via simulation before construction."
                        ]
                    },
                    {
                        type: "quote",
                        text: "When the map updates every millisecond, the territory ceases to be a location and becomes a stream of events."
                    }
                ]
            }
        ]
    },
    {
        isbn: "bk-999",
        title: "Biology of Deep-Sea Hydrothermal Vents",
        authors: ["Cindy Lee Van Dover"],
        courseCode: "BIO-420",
        required: false,
        categories: ["Marine Biology", "Ecology"],
        coverImage: "src/assets/covers/bk-999.jpg",
        description: "An exploration of extremophiles and chemosynthetic ecosystems.",
        chapters: [
            {
                id: "bio-ch-1",
                number: 1,
                title: "Life Without Sunlight",
                length: "25 min read",
                content: [
                    {
                        type: "heading",
                        level: 2,
                        text: "The Chemosynthesis Process"
                    },
                    {
                        type: "paragraph",
                        text: "Deep beneath the ocean floor, bacteria turn toxic chemicals into life-sustaining energy."
                    },
                    {
                        type: "list",
                        items: [
                            "Hydrogen Sulfide oxidation",
                            "Symbiotic relationships with giant tube worms",
                            "Heat-resistant enzyme structures"
                        ]
                    }
                ]
            },
            {
                id: "bio-ch-2",
                number: 2,
                title: "The Giant Tube Worm: Riftia pachyptila",
                length: "18 min read",
                content: [
                    {
                        type: "heading",
                        level: 2,
                        text: "Anatomy of an Extremophile"
                    },
                    {
                        type: "paragraph",
                        text: "The Riftia pachyptila is perhaps the most iconic resident of the vents. Lacking a mouth or digestive tract, these organisms rely entirely on an internal organ called the trophosome, which houses billions of symbiotic bacteria."
                    },
                    {
                        type: "quote",
                        text: "In the darkness of the abyss, the tube worm is a testament to the versatility of carbon-based life."
                    },
                    {
                        type: "list",
                        items: [
                            "Plume: The bright red organ used for gas exchange (Oxygen, CO2, and Hydrogen Sulfide).",
                            "Vestimentum: The muscular midsection that anchors the worm within its chitinous tube.",
                            "Endosymbiosis: The process by which the worm provides chemicals to bacteria in exchange for organic carbon."
                        ]
                    }
                ]
            }
        ],
        metadata: {
            isPeerReviewed: true,
            lastUpdated: "2026-01-15"
        }
    },
    {
        isbn: "bk-505",
        title: "Education and the Culture of Consumption",
        authors: ["David Hartley"],
        categories: ["Self-Help", "Psychology"],
        coverImage: "src/assets/covers/bk-505.webp",
        description: "An analytical look at how physical space affects mental clarity and decision-making.",
        length: "6 Chapters",
        chapters: [
            {
                id: "psych-ch-1",
                number: 1,
                title: "The Burden of Choice",
                summary: "Why having fewer options leads to higher satisfaction.",
                length: "12 min read",
                content: [
                    {
                        type: "heading",
                        level: 2,
                        text: "The Paradox of Overabundance"
                    },
                    {
                        type: "paragraph",
                        text: "For nearly 200 years the organisational form of the school has changed little. Bureaucracy has been its enduring form. The school has prepared the worker for the factory of mass production. It has created the 'mass consumer' to be content with accepting what is on offer, not what is wanted. However, a 'revised' educational code appears to be emerging. This code centres upon the concept of 'personalisation', which operates at two levels: first, as a new mode of public service delivery; and second, as a new 'grammar' for the school, with new flexibilities of structure and pedagogical process. Personalisation has its intellectual roots in marketing theory, not in educational theory and is the facilitator of 'education for consumption'. It allows for the 'market' to suffuse even more the fabric of education, albeit under the democratic-sounding call of freedom of choice."
                    },
                    {
                        type: "quote",
                        text: "Simplicity is not the absence of clutter, but the presence of focus."
                    },{
                        type: "paragraph",
                        text: "Education and the Culture of Consumption raises many questions about personalisation which policy-makers seem prone to avoid:"},
                    {
                        type: "list",
                        items: [
                           "Why, now, are we concerned about personalisation?",
                           "What are its theoretical foundations?" ,
                           "What are its pedagogical, curricular and organisational consequences?" ,
                           "What are the consequences for social justification of personalisation?" ,
                           "Does personalisation diminish the socialising function of the school, or does it simply mean that the only thing we share is that we have the right to personalised service? "
                        ]
                    },
                    {
                        type: "heading",
                        level: 2,
                        text: "The Grammar of Choice"
                    },
                    {
                        type: "paragraph",
                        text: "The 'personalisation' of education suggests a student-centric model, but Hartley argues this is a linguistic sleight of hand. By framing the student as a 'client' with a menu of options, the system shifts the responsibility of failure from the institution to the individual's 'poor choices.' This mirrors the retail environment, where the illusion of variety masks a rigid underlying supply chain."
                    },
                    {
                        type: "code",
                        language: "markdown",
                        code: "Instructional Model -> Standardized Output\nPersonalization Model -> Tailored Consumption Patterns"
                    },
                    {
                        type: "paragraph",
                        text: "We must ask: does a bespoke curriculum foster a more critical mind, or does it simply produce a more specialized cog for a specific niche in the global market?"
                    }
                ]
            }

        ]
    },
    {
        isbn: "bk-606",
        title: "Linear Algebra: Pure & Applied",
        authors: ["Edgar G. Goodaire"],
        courseCode: "MATH-220",
        required: true,
        categories: ["Mathematics", "Computer Science"],
        coverImage: "src/assets/covers/bk-606.jpg",
        description: "Foundational mathematics for 3D rendering, transformations, and shaders.",
        chapters: [
            {
                id: "math-ch-3",
                number: 3,
                title: "Matrix Transformations",
                content: [
                    {
                        type: "heading",
                        level: 1,
                        text: "Translation and Rotation"
                    },
                    {
                        type: "paragraph",
                        text: "To move a vertex in 3D space, we multiply its position vector by a transformation matrix. This allows for complex movements using simple arithmetic."
                    },
                    {
                        type: "code",
                        language: "glsl",
                        code: "uniform mat4 u_modelMatrix;\nattribute vec4 a_position;\n\nvoid main() {\n  gl_Position = u_modelMatrix * a_position;\n}"
                    },
                    {
                        type: "image",
                        src: "https://edu-resources.org/diagrams/matrix-rotation.svg",
                        caption: "Visualizing a 90-degree rotation around the Y-axis."
                    },
                    {
                        type: "separator"
                    }
                ]
            },
            {
                id: "math-ch-4",
                number: 4,
                title: "Eigenvalues and Stability",
                content: [
                    {
                        type: "heading",
                        level: 1,
                        text: "The Characteristic Equation"
                    },
                    {
                        type: "paragraph",
                        text: "Eigenvectors represent the directions in which a linear transformation acts only by scaling. In computer graphics, these are essential for understanding how a 3D mesh deforms under stress or animation."
                    },
                    {
                        type: "code",
                        language: "typescript",
                        code: "// Calculating the determinant for a 2x2 matrix\nfunction getDeterminant(a: number, b: number, c: number, d: number): number {\n  return (a * d) - (b * c);\n}"
                    },
                    {
                        type: "list",
                        items: [
                            "Diagonalization: Simplifying complex transformations into scalar multiples.",
                            "Principal Component Analysis (PCA): Using eigenvalues for data dimensionality reduction.",
                            "Spectral Theorem: Why symmetric matrices are the backbone of physics simulations."
                        ]
                    },
                    {
                        type: "separator"
                    },
                    {
                        type: "image",
                        src: "https://edu-resources.org/diagrams/eigen-stretching.png",
                        caption: "Figure 4.1: A visualization of a vector field before and after applying an Eigen-transformation."
                    }
                ]
            }
        ],
        metadata: {
            prerequisites: ["Calculus I", "Intro to Programming"],
            softwareRequired: "WebGL or OpenGL"
        }
    },
    {
        isbn: "bk-707",
        title: "Six Seven Book",
        authors: ["Dr. K.L. Sterling"],
        categories: ["Science Fiction", "Horror"],
        coverImage: "src/assets/covers/bk-707.png",
        description: "A chilling tale of a deep-space salvage crew that discovers a broadcast older than the stars.",
        chapters: [
            {
                id: "fiction-ch-1",
                number: 1,
                title: "Signal Lost",
                length: "20 min read",
                content: [
                    {
                        type: "heading",
                        level: 3,
                        text: "03:00 Hours - Flight Deck"
                    },
                    {
                        type: "paragraph",
                        text: "The static wasn't white. It was a deep, rhythmic thrumming that vibrated through the hull's alloy. Elias adjusted the frequency, but the sound only grew more organic."
                    },
                    {
                        type: "quote",
                        text: "Is it a message, or is it a warning?"
                    },
                    {
                        type: "paragraph",
                        text: "The monitor flickered, displaying a string of characters the ship's AI couldn't categorize."
                    }
                ]
            },
            {
                id: "fiction-ch-2",
                number: 2,
                title: "The Frequency of Bone",
                length: "25 min read",
                content: [
                    {
                        type: "heading",
                        level: 3,
                        text: "Sub-Deck 4 - Maintenance Hub"
                    },
                    {
                        type: "paragraph",
                        text: "The broadcast was no longer coming through the speakers. It was vibrating through the fillings in Elias’s teeth and the marrow of his shins. On the monitor, the ship's AI finally spat out a translation of the unknown characters. It wasn't a language. It was a sequence of genetic base pairs—an instruction set for organic synthesis."
                    },
                    {
                        type: "quote",
                        text: "The static isn't interfering with the ship. It's rewriting the crew."
                    },
                    {
                        type: "list",
                        items: [
                            "Biological signal interference detected in the life-support system.",
                            "Elias observes the internal hull plating beginning to pulse like a diaphragm.",
                            "The realization that the 'salvage' was actually a lure."
                        ]
                    },
                    {
                        type: "separator"
                    }
                ]
            }
        ]
    }
];
