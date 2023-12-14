// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "intellijot-e79f1.firebaseapp.com",
  projectId: "intellijot-e79f1",
  storageBucket: "intellijot-e79f1.appspot.com",
  messagingSenderId: "135637335074",
  appId: "1:135637335074:web:fcfb0f80d032da49f19e7b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export async function uploadImageToFirebase(image_url: string, name: string, note_id: string) {
    try {
        const response = await fetch(image_url)
        const buffer = await response.arrayBuffer()
        const file_name = name.replace(" ", "") + note_id + ".jpeg";
        const storageRef = ref(storage, `images/${file_name}`);
        await uploadBytes(storageRef, buffer, {contentType: 'image/jpeg'})

        const firebase_url = await getDownloadURL(storageRef)
        return firebase_url
    } catch (error) {
        console.error(error)
    }
}