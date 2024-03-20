///Sample File

import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/utils/db';

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  try {
    const connection = await connectToDatabase();

    if (connection) {
      const { database } = connection;
      const collection = database.collection(process.env.MONGODB_EVENTS_COLLECTION);

      const results = await collection.find({}).limit(10).toArray();

      response.status(200).json(results);

      console.log('results: ', results);
    } else {
      // Handle the case when connectToDatabase returns undefined
      response.status(500).json({ error: 'Database connection failed' });
    }
  } catch (error) {
    console.error('Error in API handler:', error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
}