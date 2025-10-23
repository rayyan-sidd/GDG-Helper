import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  Timestamp,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  deleteDoc,
  getDoc,
  setLogLevel,
} from "firebase/firestore";
import {
  Youtube,
  Github,
  MessageSquare,
  Send,
  Loader2,
  ChevronRight,
  HelpCircle,
  ShieldCheck,
  Trash2,
  X,
  ExternalLink,
  CheckSquare,
  Square,
  ArrowLeft, // Added for mobile back buttons
} from "lucide-react";

// --- Hardcoded Skill Badge Data ---
// TODO: Update all the 'labUrl: "#"' placeholders with the real links
const cloudBoostData = [
  {
    id: "badge1",
    title: "The Basics of Google Cloud Compute",
    labs: [
      {
        id: "lab1-1",
        title: "Create a Virtual Machine (GSP001)",
        labUrl: "https://www.skills.google/course_templates/754/labs/584200",
        resources: [
          {
            type: "youtube",
            title: "YouTube Tutorial",
            url: "https://youtu.be/UnfDTYpP4Ws?si=eG9G234ojf1xwHBa",
          },
        ],
      },
      {
        id: "lab1-2",
        title: "Creating a Persistent Disk (GSP004)",
        labUrl: "https://www.skills.google/course_templates/754/labs/584201",
        resources: [
          {
            type: "youtube",
            title: "YouTube Tutorial",
            url: "https://youtu.be/cYz3thR_Ds8?si=2Eti0NO7ww5l31Fc",
          },
          {
            type: "github",
            title: "GitHub Repo",
            url: "https://github.com/Itsabhishek7py/GoogleCloudSkillsboost/blob/main/Creating%20a%20Persistent%20Disk/Creating%20a%20Persistent%20Disk.md",
          },
        ],
      },
      {
        id: "lab1-3",
        title:
          "Hosting a Web App on Google Gloud using Compute Engine (GSP662)",
        labUrl: "https://www.skills.google/course_templates/754/labs/584202",
        resources: [
          {
            type: "youtube",
            title: "YouTube Tutorial",
            url: "https://youtu.be/xCN4_jEAlhQ?si=GHE-EDvlYJSQHVDx",
          },
          {
            type: "github",
            title: "GitHub Repo",
            url: "https://github.com/Itsabhishek7py/GoogleCloudSkillsboost/blob/main/Hosting%20a%20Web%20App%20on%20Google%20Cloud%20Using%20Compute%20Engine/Hosting%20a%20Web%20App%20on%20Google%20Cloud%20Using%20Compute%20Engine.md",
          },
        ],
      },
      {
        id: "lab1-4",
        title: "The Basics of Google Cloud Compute: Challenge Cab (ARC120)",
        labUrl: "https://www.skills.google/course_templates/754/labs/584203",
        resources: [
          {
            type: "youtube",
            title: "YouTube Tutorial",
            url: "https://youtu.be/lfPE9wgNcoE?si=83tZQ8j3ZmViwmL9",
          },
          {
            type: "github",
            title: "GitHub Repo",
            url: "https://github.com/Itsabhishek7py/GoogleCloudSkillsboost/blob/main/The%20Basics%20of%20Google%20Cloud%20Compute%3A%20Challenge%20Lab/abhishek.md",
          },
        ],
      },
    ],
  },
  {
    id: "badge2",
    title: "Get started with Cloud Storage",
    labs: [
      {
        id: "lab2-1",
        title: "APIs Explorer: Cloud Storage (GSP421)",
        labUrl: "https://www.skills.google/course_templates/725/labs/589886",
        resources: [
          {
            type: "youtube",
            title: "APIs Explorer: Cloud Storage (Video)",
            url: "https://youtu.be/7V2bYUXFUQ8?si=ZQ61hc69uggoiDaL",
          },
          {
            type: "github",
            title: "APIs Explorer: Cloud Storage (Guide)",
            url: "https://github.com/Itsabhishek7py/GoogleCloudSkillsboost/blob/main/APIs%20Explorer%3A%20Cloud%20Storage/APIs%20Explorer%3A%20Cloud%20Storage.md",
          },
        ],
      },
      {
        id: "lab2-2",
        title: "Cloud Storage: Quik Start - CLI/SDK (GSP074)",
        labUrl: "https://www.skills.google/course_templates/725/labs/589887",
        resources: [
          {
            type: "youtube",
            title: "Cloud Storage: Qwik Start (Video)",
            url: "https://youtu.be/6pk8o1EGRoI?si=Ulx5FuJTFbfTqH4e",
          },
          {
            type: "github",
            title: "Cloud Storage: Qwik Start (Guide)",
            url: "https://github.com/prateekrajput08/Arcade-Google-Cloud-Labs/blob/main/Cloud%20Storage%3A%20Qwik%20Start%20-%20CLI%20SDK/TechCode.md",
          },
        ],
      },
      {
        id: "lab2-3",
        title: "Google Cloud Storage - Bucket Lock (GSP297)",
        labUrl: "https://www.skills.google/course_templates/725/labs/589888",
        resources: [
          {
            type: "youtube",
            title: "Bucket Lock (Video)",
            url: "https://youtu.be/i85f98uhzak?si=tfYtGX6egh65RtGB",
          },
          {
            type: "github",
            title: "Bucket Lock (Guide)",
            url: "https://github.com/prateekrajput08/Arcade-Google-Cloud-Labs/blob/main/Google%20Cloud%20Storage%20-%20Bucket%20Lock/TechCode.md",
          },
        ],
      },
      {
        id: "lab2-4",
        title: "Get Started with Cloud Storage: Challenge Lab (ARC111)",
        labUrl: "https://www.skills.google/course_templates/725/labs/589889",
        resources: [
          {
            type: "youtube",
            title: "Challenge Lab (Video)",
            url: "https://youtu.be/9tVdkeqRkv0?si=zPDT9iSTA4vzhuWj",
          },
          {
            type: "github",
            title: "Challenge Lab (Guide)",
            url: "https://github.com/Itsabhishek7py/GoogleCloudSkillsboost/blob/main/Get%20Started%20with%20Cloud%20Storage%3A%20Challenge%20Lab/Get%20Started%20with%20Cloud%20Storage%3A%20Challenge%20Lab.md",
          },
        ],
      },
    ],
  },
  {
    id: "badge3",
    title: "Get started with Pub/Sub",
    labs: [
      {
        id: "lab3-1",
        title: "Pub/Sub: Quik Start - Console (GSP096)",
        labUrl: "https://www.skills.google/course_templates/728/labs/594563",
        resources: [
          {
            type: "youtube",
            title: "Pub/Sub Qwik Start (Video)",
            url: "https://youtu.be/r8pnC0kwt-8?si=gPzIBvi2FFwVPR6p",
          },
        ],
      },
      {
        id: "lab3-2",
        title: "Cloud Scheduler: Quik Start (GSP401)",
        labUrl: "https://www.skills.google/course_templates/728/labs/594564",
        resources: [
          {
            type: "youtube",
            title: "Cloud Scheduler Qwik Start (Video)",
            url: "https://youtu.be/Dn-UmNK4U98?si=KIj1ZWJ92lieYXxm",
          },
        ],
      },
      {
        id: "lab3-3",
        title: "Get started with Pub/Sub: Challenge Lab (ARC113)",
        labUrl: "https://www.skills.google/course_templates/728/labs/594565",
        resources: [
          {
            type: "youtube",
            title: "Challenge Lab (Video)",
            url: "https://youtu.be/rIEQsK1cGX0?si=yDCqtoIaMK2CtZbU",
          },
          {
            type: "github",
            title: "Challenge Lab (Guide)",
            url: "https://github.com/Itsabhishek7py/GoogleCloudSkillsboost/blob/main/Get%20Started%20with%20PubSub%3A%20Challenge%20Lab/Get%20Started%20with%20PubSub%3A%20Challenge%20Lab.md",
          },
        ],
      },
    ],
  },
  {
    id: "badge4",
    title: "Get Started with API Gateway",
    labs: [
      {
        id: "lab4-1",
        title: "API Gateway: Qwik Start",
        labUrl: "https://www.skills.google/course_templates/662/labs/592574",
        resources: [
          {
            type: "youtube",
            title: "API Gateway: Qwik Start (Video)",
            url: "https://youtu.be/c7Dh7RX02oU?si=Q21T604Zruj6vcjL",
          },
          {
            type: "github",
            title: "API Gateway: Qwik Start (Guide)",
            url: "https://github.com/Itsabhishek7py/GoogleCloudSkillsboost/blob/main/API%20Gateway%3A%20Qwik%20Start/abhishek.md",
          },
        ],
      },
      {
        id: "lab4-2",
        title: "Pub/Sub: Qwik Start - Console",
        labUrl: "https://www.skills.google/course_templates/728/labs/594563",
        resources: [
          {
            type: "youtube",
            title: "Cloud Scheduler Qwik Start (Video)",
            url: "https://youtu.be/c7Dh7RX02oU?si=Q21T604Zruj6vcjL",
          },
          {
            type: "github",
            title: "API Gateway: Qwik Start (Guide)",
            url: "https://youtu.be/r8pnC0kwt-8?si=gPzIBvi2FFwVPR6p",
          },
        ],
      },
      {
        id: "lab4-3",
        title: "Cloud Run Functions: Qwik Start - Console",
        labUrl: "https://www.skills.google/course_templates/662/labs/592576",
        resources: [
          {
            type: "youtube",
            title: "Cloud Scheduler Qwik Start (Video)",
            url: "https://www.youtube.com/watch?v=IBHFrTLcTY0",
          },
        ],
      },
      {
        id: "lab4-4",
        title: "Getting Started with API Gateway: Challenge Lab",
        labUrl: "https://www.skills.google/course_templates/662/labs/592577",
        resources: [
          {
            type: "youtube",
            title: "Challenge Lab (Video)",
            url: "https://youtu.be/N2yLVNGvQNY?si=cIetN79_vb7xyUYm",
          },
          {
            type: "github",
            title: "Challenge Lab (Guide)",
            url: "https://github.com/Itsabhishek7py/GoogleCloudSkillsboost/blob/main/Getting%20Started%20with%20API%20Gateway%3A%20Challenge%20Lab/Getting%20Started%20with%20API%20Gateway%3A%20Challenge%20Lab.md",
          },
        ],
      },
    ],
  },
  { id: "badge5", title: "Get Started with Looker", labs: [] },
  { id: "badge6", title: "Get Started with Dataplex", labs: [] },
  { id: "badge7", title: "Get Started with Google Workspace Tools", labs: [] },
  { id: "badge8", title: "App Building with Appsheet", labs: [] },
  { id: "badge9", title: "Develop with Apps Script and AppSheet", labs: [] },
  { id: "badge10", title: "Build a Website on Google Cloud", labs: [] },
  { id: "badge11", title: "Set Up a Google Cloud Network", labs: [] },
  {
    id: "badge12",
    title: "Store, Process, and Manage Data on Google Cloud - Console",
    labs: [],
  },
  { id: "badge13", title: "Cloud Functions: 3 Ways", labs: [] },
  { id: "badge14", title: "App Engine: 3 Ways", labs: [] },
  { id: "badge15", title: "Cloud Speech API: 3 Ways", labs: [] },
  { id: "badge16", title: "Monitoring in Google Cloud", labs: [] },
  {
    id: "badge17",
    title: "Analyze Speech and Language with Google APIs",
    labs: [],
  },
  { id: "badge18", title: "Prompt Design in Vertex AI", labs: [] },
  {
    id: "badge19",
    title: "Develop GenAI Apps with Gemini and Streamlit",
    labs: [],
  },
  {
    id: "badge20",
    title: "GenAI Arcade Game",
    isGame: true,
    labs: [
      {
        id: "lab20-1",
        title: "Conversations & Creations",
        labUrl: "https://www.skills.google/games/6554", // <-- TODO: Add lab link
        resources: [
          { type: "youtube", title: "Arcade Game Guide", url: "#" },
          { type: "other", title: "Link to the Arcade", url: "#" },
        ],
      },
      {
        id: "lab20-2",
        title: "Prep with AI",
        labUrl: "https://www.skills.google/games/6554", // <-- TODO: Add lab link
        resources: [
          { type: "youtube", title: "Arcade Game Guide", url: "#" },
          { type: "other", title: "Link to the Arcade", url: "#" },
        ],
      },
    ],
  },
];

// --- Firebase Configuration ---
const firebaseConfig = {
  apiKey: "AIzaSyDTUMM-KEArGS8ZE3wd2iGR7W1RBFydbwM",
  authDomain: "gdg-helper-89af3.firebaseapp.com",
  projectId: "gdg-helper-89af3",
  storageBucket: "gdg-helper-89af3.firebasestorage.app",
  messagingSenderId: "816026999575",
  appId: "1:816026999575:web:eb3bb212183f29494f7552",
  measurementId: "G-1C8NSZX86P",
};
// ------------------------------

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
setLogLevel("Debug"); // Enable Firestore logging

// Define the collection path
const queriesCollectionPath = `labQueries`;
const LOCAL_STORAGE_KEY = "completedLabs";

/**
 * Main Application Component
 */
function App() {
  const [selectedBadge, setSelectedBadge] = useState(null);
  const [selectedLab, setSelectedLab] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [error, setError] = useState(null);
  const [mobileView, setMobileView] = useState("badges");

  const [completedLabs, setCompletedLabs] = useState(() => {
    try {
      const savedProgress = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedProgress) {
        return new Set(JSON.parse(savedProgress));
      }
    } catch (e) {
      console.error("Failed to load progress from localStorage", e);
    }
    return new Set();
  });

  useEffect(() => {
    try {
      const dataToSave = JSON.stringify(Array.from(completedLabs));
      localStorage.setItem(LOCAL_STORAGE_KEY, dataToSave);
    } catch (e) {
      console.error("Failed to save progress to localStorage", e);
    }
  }, [completedLabs]);

  const toggleLabCompletion = (labId) => {
    setCompletedLabs((prevCompleted) => {
      const newCompleted = new Set(prevCompleted);
      if (newCompleted.has(labId)) {
        newCompleted.delete(labId);
      } else {
        newCompleted.add(labId);
      }
      return newCompleted;
    });
  };

  // Handle Firebase Authentication
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      let uid;
      if (user) {
        uid = user.uid;
        console.log("User is signed in:", uid);
      } else {
        console.log("No user found, signing in anonymously...");
        try {
          const userCredential = await signInAnonymously(auth);
          uid = userCredential.user.uid;
          console.log("Signed in anonymously:", uid);
        } catch (e) {
          console.error("Anonymous sign-in failed: ", e);
          setError("Could not connect to auth. Please refresh.");
          setIsAuthReady(true);
          return;
        }
      }

      setUserId(uid);

      // Check if this user is an admin
      try {
        const adminDocRef = doc(db, "admins", uid);
        const adminDocSnap = await getDoc(adminDocRef);
        if (adminDocSnap.exists()) {
          setIsAdmin(true);
          console.log("ADMIN user detected.");
        } else {
          setIsAdmin(false);
          console.log("Regular user detected.");
        }
      } catch (e) {
        console.error("Admin check failed: ", e);
        setIsAdmin(false);
      }

      setIsAuthReady(true);
    });
    return () => unsubscribe();
  }, []);

  const handleSelectBadge = (badge) => {
    setSelectedBadge(badge);
    if (badge.labs.length > 0) {
      setSelectedLab(badge.labs[0]);
    } else {
      setSelectedLab(null);
    }
    setMobileView("labs"); // Change view on mobile
  };

  const handleSelectLab = (lab) => {
    setSelectedLab(lab);
    setMobileView("resources"); // Change view on mobile
  };

  // Set default selection
  useEffect(() => {
    const firstBadge = cloudBoostData[0];
    setSelectedBadge(firstBadge);
    if (firstBadge.labs.length > 0) {
      setSelectedLab(firstBadge.labs[0]);
    }
  }, []);

  // --- THIS IS THE FIX ---
  // UserInfoBox now *always* renders the User ID part
  const UserInfoBox = () => (
    <div className="mb-4 p-2 bg-gray-700 rounded-lg">
      {/* Admin status is still conditional */}
      {isAdmin && (
        <div className="flex items-center text-green-400 font-medium mb-1">
          <ShieldCheck className="h-5 w-5 mr-2" />
          Admin Mode Active
        </div>
      )}
      {/* User ID is now ALWAYS shown */}
      <div className="text-xs text-gray-400 truncate">
        <span className="font-medium">Your User ID:</span> {userId || "..."}
      </div>
    </div>
  );
  // --- END OF FIX ---

  const ResourceContent = ({ isMobile }) => (
    <>
      {!isAuthReady || error ? (
        <div className="flex flex-col items-center justify-center h-full">
          <Loader2 className="animate-spin h-12 w-12 text-blue-500 mb-4" />
          <p className="text-lg">
            {error ? error : "Connecting to helper service..."}
          </p>
        </div>
      ) : !selectedLab ? (
        <div className="flex flex-col items-center justify-center h-full">
          <HelpCircle className="h-12 w-12 text-gray-500 mb-4" />
          <h2 className="text-xl font-semibold text-white">No Labs Added</h2>
          <p className="text-gray-400">
            Labs for this badge will be added soon!
          </p>
        </div>
      ) : (
        <ResourceViewer
          key={selectedLab.id}
          lab={selectedLab}
          userId={userId}
          isAdmin={isAdmin}
          collectionPath={queriesCollectionPath}
          onBack={isMobile ? () => setMobileView("labs") : null}
        />
      )}
    </>
  );

  return (
    <div className="flex flex-col md:flex-row md:h-screen bg-gray-900 text-gray-200 font-inter antialiased">
      {/* Mobile View */}
      <div className="md:hidden w-full min-h-screen p-6">
        {mobileView === "badges" && (
          <aside>
            <h1 className="text-2xl font-bold text-white mb-6">
              Cloud Boost Helper
            </h1>
            <UserInfoBox />
            <BadgeList
              badges={cloudBoostData}
              selectedBadge={selectedBadge}
              onSelectBadge={handleSelectBadge}
              completedLabs={completedLabs}
            />
          </aside>
        )}

        {mobileView === "labs" && (
          <main>
            <LabList
              badge={selectedBadge}
              selectedLab={selectedLab}
              onSelectLab={handleSelectLab}
              completedLabs={completedLabs}
              onToggleCompletion={toggleLabCompletion}
              onBack={() => setMobileView("badges")}
            />
          </main>
        )}

        {mobileView === "resources" && (
          <section>
            <ResourceContent isMobile={true} />
          </section>
        )}
      </div>

      {/* Desktop View */}
      <aside className="hidden md:flex md:flex-col md:w-1/4 md:h-full bg-gray-800 p-6 md:overflow-y-auto shadow-lg flex-shrink-0">
        <h1 className="text-2xl font-bold text-white mb-6">
          Cloud Boost Helper
        </h1>
        <UserInfoBox />
        <BadgeList
          badges={cloudBoostData}
          selectedBadge={selectedBadge}
          onSelectBadge={handleSelectBadge}
          completedLabs={completedLabs}
        />
      </aside>

      <main className="hidden md:flex md:flex-col md:w-1/4 md:h-full bg-gray-800 border-l border-r border-gray-700 p-6 md:overflow-y-auto flex-shrink-0">
        <LabList
          badge={selectedBadge}
          selectedLab={selectedLab}
          onSelectLab={handleSelectLab}
          completedLabs={completedLabs}
          onToggleCompletion={toggleLabCompletion}
          onBack={null} // No back button on desktop
        />
      </main>

      <section className="hidden md:block md:w-1/2 md:h-full p-8 md:overflow-y-auto">
        <ResourceContent isMobile={false} />
      </section>
    </div>
  );
}

/**
 * Renders the list of Skill Badges.
 */
function BadgeList({ badges, selectedBadge, onSelectBadge, completedLabs }) {
  return (
    <nav className="space-y-2">
      {badges.map((badge) => {
        const totalLabs = badge.labs.length;
        const completedCount = badge.labs.filter((lab) =>
          completedLabs.has(lab.id)
        ).length;
        const progressPercent =
          totalLabs > 0 ? (completedCount / totalLabs) * 100 : 0;

        return (
          <button
            key={badge.id}
            onClick={() => onSelectBadge(badge)}
            className={`w-full p-4 rounded-lg text-left transition-all ${
              selectedBadge && selectedBadge.id === badge.id
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">{badge.title}</span>
              <ChevronRight className="h-5 w-5" />
            </div>

            {totalLabs > 0 && (
              <div className="mt-2">
                <div className="flex justify-between text-xs mb-1">
                  <span
                    className={
                      selectedBadge && selectedBadge.id === badge.id
                        ? "text-white"
                        : "text-gray-400"
                    }
                  >
                    Progress
                  </span>
                  <span
                    className={
                      selectedBadge && selectedBadge.id === badge.id
                        ? "text-white"
                        : "text-gray-400"
                    }
                  >
                    {completedCount} / {totalLabs}
                  </span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-1.5">
                  <div
                    className="bg-green-500 h-1.5 rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  ></div>
                </div>
              </div>
            )}
          </button>
        );
      })}
    </nav>
  );
}

/**
 * Renders the list of Labs for a given Badge.
 */
function LabList({
  badge,
  selectedLab,
  onSelectLab,
  completedLabs,
  onToggleCompletion,
  onBack,
}) {
  if (!badge) return null;

  return (
    <div>
      {onBack && (
        <button
          onClick={onBack}
          className="flex items-center text-blue-400 hover:underline mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Badges
        </button>
      )}

      <h2 className="text-xl font-semibold text-white mb-4 p-2">
        {badge.title}
      </h2>
      <div className="space-y-2">
        {badge.labs.length > 0 ? (
          badge.labs.map((lab) => {
            const isCompleted = completedLabs.has(lab.id);
            const isSelected = selectedLab && selectedLab.id === lab.id;

            return (
              <div
                key={lab.id}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg ${
                  isSelected ? "bg-gray-700" : "hover:bg-gray-700"
                }`}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleCompletion(lab.id);
                  }}
                  title={
                    isCompleted ? "Mark as incomplete" : "Mark as complete"
                  }
                  className={`p-1 rounded-md ${
                    isCompleted ? "text-green-400" : "text-gray-500"
                  } hover:text-green-300`}
                >
                  {isCompleted ? (
                    <CheckSquare className="h-5 w-5" />
                  ) : (
                    <Square className="h-5 w-5" />
                  )}
                </button>

                <div
                  className="flex-1 cursor-pointer"
                  onClick={() => onSelectLab(lab)}
                >
                  <span className={isSelected ? "text-white" : ""}>
                    {lab.title}
                  </span>
                </div>

                <a
                  href={lab.labUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  title="Go to lab"
                  className="p-1 text-gray-500 hover:text-blue-400 rounded-md"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            );
          })
        ) : (
          <p className="text-gray-400 p-3">
            No labs have been added for this badge yet.
          </p>
        )}
      </div>
    </div>
  );
}

/**
 * Renders the resources and Q&A section for the selected lab.
 */
function ResourceViewer({ lab, userId, isAdmin, collectionPath, onBack }) {
  if (!lab) return null;

  const getIcon = (type) => {
    switch (type) {
      case "youtube":
        return <Youtube className="h-5 w-5 text-red-500" />;
      case "github":
        return <Github className="h-5 w-5 text-gray-400" />;
      default:
        return <HelpCircle className="h-5 w-5 text-blue-400" />;
    }
  };

  return (
    <div>
      {onBack && (
        <button
          onClick={onBack}
          className="flex items-center text-blue-400 hover:underline mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Labs
        </button>
      )}

      <h2 className="text-3xl font-bold text-white mb-6">{lab.title}</h2>

      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-4 text-white">Helpful Links</h3>
        <div className="space-y-3">
          {lab.resources.length > 0 ? (
            lab.resources.map((res, index) => (
              <a
                key={index}
                href={res.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-all"
              >
                {getIcon(res.type)}
                <span className="text-blue-400 hover:underline">
                  {res.title}
                </span>
              </a>
            ))
          ) : (
            <p className="text-gray-400">
              No resources added for this lab yet.
            </p>
          )}
        </div>
      </div>

      <QuerySection
        labId={lab.id}
        userId={userId}
        isAdmin={isAdmin}
        collectionPath={collectionPath}
      />
    </div>
  );
}

/**
 * Loading Spinner Component
 */
function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center p-4">
      <Loader2 className="animate-spin h-6 w-6 text-blue-500" />
    </div>
  );
}

/**
 * Manages fetching and displaying queries for a lab.
 */
function QuerySection({ labId, userId, isAdmin, collectionPath }) {
  const [queries, setQueries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!labId) return;

    setIsLoading(true);
    setError(null);

    const q = query(
      collection(db, collectionPath),
      where("labId", "==", labId)
    );

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const queriesList = [];
        querySnapshot.forEach((doc) => {
          queriesList.push({ id: doc.id, ...doc.data() });
        });
        queriesList.sort(
          (a, b) => b.createdAt.toMillis() - a.createdAt.toMillis()
        );
        setQueries(queriesList);
        setIsLoading(false);
      },
      (err) => {
        console.error("Error fetching queries: ", err);
        setError("Could not load queries. Please check console.");
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, [labId, collectionPath]);

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4 text-white">
        <MessageSquare className="inline-block h-6 w-6 mr-2" />
        Lab Q&A
      </h3>
      <QueryForm
        labId={labId}
        userId={userId}
        collectionPath={collectionPath}
      />

      <div className="mt-6 space-y-4">
        {isLoading && <LoadingSpinner />}
        {error && <p className="text-red-400">{error}</p>}
        {!isLoading && queries.length === 0 && (
          <p className="text-gray-400 text-center py-4">
            Be the first to ask a question about this lab!
          </p>
        )}
        {queries.map((query) => (
          <QueryCard
            key={query.id}
            query={query}
            userId={userId}
            isAdmin={isAdmin}
            collectionPath={collectionPath}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * Form to submit a new query.
 */
function QueryForm({ labId, userId, collectionPath }) {
  const [queryText, setQueryText] = useState("");
  const [author, setAuthor] = useState("Participant");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (queryText.trim() === "" || isSubmitting) return;

    setIsSubmitting(true);

    const newQuery = {
      labId: labId,
      author: author.trim() || "Participant",
      queryText: queryText.trim(),
      createdAt: Timestamp.now(),
      responses: [],
      queryAuthorId: userId,
    };

    try {
      await addDoc(collection(db, collectionPath), newQuery);
      setQueryText("");
      console.log("New query added!");
    } catch (error) {
      console.error("Error adding query: ", error);
    }
    setIsSubmitting(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800 p-4 rounded-lg shadow-lg mb-6"
    >
      <div className="mb-3">
        <label
          htmlFor="author"
          className="block text-sm font-medium text-gray-300 mb-1"
        >
          Your Name
        </label>
        <input
          id="author"
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="e.g., Tech Support Guy"
          className="w-full p-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-3">
        <label
          htmlFor="query"
          className="block text-sm font-medium text-gray-300 mb-1"
        >
          Your Question
        </label>
        <textarea
          id="query"
          value={queryText}
          onChange={(e) => setQueryText(e.target.value)}
          rows="3"
          placeholder="Ask anything about this lab..."
          required
          className="w-full p-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-all disabled:opacity-50"
      >
        {isSubmitting ? "Submitting..." : "Submit Query"}
      </button>
    </form>
  );
}

/**
 * Displays a single query and its responses.
 */
function QueryCard({ query, userId, isAdmin, collectionPath }) {
  const [showResponses, setShowResponses] = useState(false);

  const formatTime = (timestamp) => {
    if (!timestamp || !timestamp.toDate) return "just now";
    return timestamp.toDate().toLocaleString();
  };

  // Delete Functions
  const handleDeleteQuery = async () => {
    if (window.confirm("Are you sure you want to delete this entire query?")) {
      try {
        const queryDocRef = doc(db, collectionPath, query.id);
        await deleteDoc(queryDocRef);
        console.log("Query deleted");
      } catch (error) {
        console.error("Error deleting query: ", error);
      }
    }
  };

  const handleDeleteResponse = async (responseToRemove) => {
    if (window.confirm("Are you sure you want to delete this response?")) {
      try {
        const queryDocRef = doc(db, collectionPath, query.id);
        await updateDoc(queryDocRef, {
          responses: arrayRemove(responseToRemove),
        });
        console.log("Response deleted");
      } catch (error) {
        console.error("Error deleting response: ", error);
      }
    }
  };

  return (
    <div className="bg-gray-800 p-5 rounded-lg shadow-md">
      {/* Query Text */}
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <p className="text-gray-300 mb-2">
            <strong className="text-white">
              {query.author || "Participant"}:{" "}
            </strong>
            {query.queryText}
          </p>
          <p className="text-xs text-gray-500 mb-3">
            {formatTime(query.createdAt)}
          </p>
        </div>
        {isAdmin && (
          <button
            onClick={handleDeleteQuery}
            title="Delete Query"
            className="ml-4 p-2 text-red-500 hover:text-red-400 hover:bg-gray-700 rounded-full transition-all"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Toggle Responses Button */}
      <button
        onClick={() => setShowResponses(!showResponses)}
        className="text-sm text-blue-400 hover:underline mb-3"
      >
        {showResponses ? "Hide" : "Show"} {query.responses?.length || 0}{" "}
        responses
      </button>

      {/* Responses Section (Conditional) */}
      {showResponses && (
        <div className="pl-4 border-l-2 border-gray-700 space-y-4">
          {query.responses && query.responses.length > 0 ? (
            query.responses.map((res, index) => (
              <div
                key={index}
                className="bg-gray-700 p-3 rounded-lg flex justify-between items-start"
              >
                <div className="flex-1">
                  <p className="text-gray-300">
                    <strong className="text-white">
                      {res.author || "Participant"}:{" "}
                    </strong>
                    {res.responseText}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatTime(res.createdAt)}
                  </p>
                </div>
                {isAdmin && (
                  <button
                    onClick={() => handleDeleteResponse(res)}
                    title="Delete Response"
                    className="ml-2 p-1 text-red-500 hover:text-red-400 hover:bg-gray-600 rounded-full transition-all"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-400">No responses yet.</p>
          )}

          {/* Response Form */}
          <ResponseForm
            queryId={query.id}
            userId={userId}
            collectionPath={collectionPath}
          />
        </div>
      )}
    </div>
  );
}

/**
 * Form to submit a new response to a query.
 */
function ResponseForm({ queryId, userId, collectionPath }) {
  const [responseText, setResponseText] = useState("");
  const [author, setAuthor] = useState("Participant");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (responseText.trim() === "" || isSubmitting) return;

    setIsSubmitting(true);

    const newResponse = {
      author: author.trim() || "Participant",
      responseText: responseText.trim(),
      createdAt: Timestamp.now(),
      responseAuthorId: userId,
    };

    try {
      const queryDocRef = doc(db, collectionPath, queryId);
      await updateDoc(queryDocRef, {
        responses: arrayUnion(newResponse),
      });
      setResponseText("");
      console.log("Response added!");
    } catch (error) {
      console.error("Error adding response: ", error);
    }
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="mb-2">
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Your Name"
          className="w-full p-2 text-sm rounded-lg bg-gray-600 border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex space-x-2">
        <input
          type="text"
          value={responseText}
          onChange={(e) => setResponseText(e.target.value)}
          placeholder="Write a response..."
          required
          className="flex-1 p-2 text-sm rounded-lg bg-gray-600 border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg disabled:opacity-50"
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
    </form>
  );
}

export default App;
