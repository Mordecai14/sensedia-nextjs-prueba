export default async function handler(req:any, res:any) {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  