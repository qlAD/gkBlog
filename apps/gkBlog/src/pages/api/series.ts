import type { NextApiRequest, NextApiResponse } from 'next';
import { getAllSeries } from '@/lib/posts';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const series = getAllSeries();
      res.status(200).json(series);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch series' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}