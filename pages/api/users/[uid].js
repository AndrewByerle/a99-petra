import { firebaseAdmin } from "../../../firebase/admin";



export default async (req, res) => {
    let db = firebaseAdmin.firestore();
    const { uid } = req.query;

    try {
        if (req.method === 'PUT') {
            await db.collection('users').doc(uid).update({
                ...req.body,
                updated: new Date().toISOString(),
            });

        } else if (req.method === 'GET') {
            const doc = await db.collection('users').doc(uid).get();

            if (!doc.exists) {
                res.status(404).end();
            } else {
                res.status(200).json(doc.data());
            }

        } else if (req.method === 'DELETE') {
            await db.collection('users').doc(uid).delete();
        }
        res.status(200).end();
    } catch (e) {
        res.status(400).end();
    }
}