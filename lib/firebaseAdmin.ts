import * as admin from 'firebase-admin';
import serviceAccount from '../serviceAccountKey.json';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: (<any>serviceAccount).project_id,
      clientEmail: (<any>serviceAccount).client_email,
      privateKey: (<any>serviceAccount).private_key,
    })
  });
}

export { admin };