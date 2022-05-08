import { firebaseAdmin } from "../../../firebase/admin";

export default async (req, res) => {
    const db = firebaseAdmin.firestore();
    const { uid } = req.body;
    try {
          const id = await db.collection('users').doc(uid).set({
            ...req.body,
            created: new Date().toISOString(),
        });
        res.status(200).json()
    } catch (e){
        res.status(400)
    }
}

