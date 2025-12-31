import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

/**
 * Fetches city, country and newsApiKey from Firestore
 * @param {string} uid - The user's Firebase UID
 * @returns {Promise<{ newsApiKey: string, city: string, unsplashApi: string } | null>}
 */

export const fetchApiConfig = async (uid) => {
  if (!uid) throw new Error('User UID is required to fetch config');

  try {
    const configRef = doc(db, `users/${uid}/apiKeys/config`);
    const snap = await getDoc(configRef);

    if (snap.exists()) {
      const data = snap.data();
      return {
        city: data.city || '',
        unsplashApi: data.unsplashApi || '',
        newsApiKey: data.newsApiKey || '',
      };
    } else {
      console.warn('Config not found in Firestore');
      return null;
    }
  } catch (error) {
    console.error('Error fetching API config:', error);
    return null;
  }
};
