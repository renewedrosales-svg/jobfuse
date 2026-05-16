import {
  collection,
  getDocs,
} from "firebase/firestore";

import {
  db,
} from "@/lib/firebase";

export default async function sitemap() {

  const baseUrl =
    "https://jobfuse.vercel.app";

  // Static routes
  const routes = [

    "",

    "/signin",

    "/signup",
  ].map((route) => ({

    url:
      `${baseUrl}${route}`,

    lastModified:
      new Date(),
  }));

  // Dynamic jobs
  const snapshot =
    await getDocs(
      collection(
        db,
        "jobs"
      )
    );

  const jobs =
    snapshot.docs.map(
      (doc) => ({

        url:
          `${baseUrl}/job/${doc.id}`,

        lastModified:
          new Date(),
      })
    );

  return [
    ...routes,
    ...jobs,
  ];
}