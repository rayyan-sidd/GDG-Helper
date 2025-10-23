const cloudBoostData = [
  {
    id: "badge1",
    title: "The Basics of Google Cloud Compute",
    labs: [
      {
        id: "lab1-1",
        title: "Create a Virtual Machine (GSP001)",
        resources: [
          // TODO: User will provide these links
          { type: "youtube", title: "YouTube Tutorial", url: "#" },
          { type: "github", title: "GitHub Repo", url: "#" },
        ],
      },
      {
        id: "lab1-2",
        title: "Creating a Persistent Disk (GSP004)",
        resources: [
          // TODO: User will provide this link
          { type: "youtube", title: "YouTube Tutorial", url: "#" },
        ],
      },
      {
        id: "lab1-3",
        title:
          "Hosting a Web App on Google Gloud using Compute Engine (GSP662)",
        resources: [
          // TODO: User will provide this link
          { type: "other", title: "Resource Link", url: "#" },
        ],
      },
      {
        id: "lab1-4",
        title: "The Basics of Google Cloud Compute: Challenge Cab (ARC120)",
        resources: [], // No links provided, empty array
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
        resources: [
          // NOTE: These are the links you provided. They look like they are for the "Bucket Lock" lab.
          // You can replace them when you find the correct ones!
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
  // --- Placeholders for the rest of your badges ---
  { id: "badge4", title: "Get Started with API Gateway", labs: [] },
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
  // Don't forget the 20th badge!
  {
    id: "badge20",
    title: "GenAI Arcade Game",
    isGame: true,
    labs: [
      {
        id: "lab20-1",
        title: "Play the GenAI Arcade Game",
        resources: [
          // TODO: Add the real links here when you find them
          { type: "youtube", title: "Arcade Game Guide", url: "#" },
          { type: "other", title: "Link to the Arcade", url: "#" },
        ],
      },
    ],
  },
];