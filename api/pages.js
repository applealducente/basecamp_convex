export default function handler(req, res) {
  const pages = [
    {
      "id": "fcf-overview",
      "title": "Understanding FCF",
      "icon": "📋",
      "section": "Training",
      "desc": "Membership positioning, free cleaning benefits, and full booking process.",
      "body": "FCF content here",
      "tag": "training"
    },
    {
      "id": "cleanings",
      "title": "Types of Cleanings",
      "icon": "🧹",
      "section": "Training", 
      "desc": "Standard, deep, and move-out cleaning explained.",
      "body": "Cleanings content here",
      "tag": "training"
    },
    {
      "id": "trial-otc",
      "title": "Trial & One-Time Cleaning",
      "icon": "💚",
      "section": "Training",
      "desc": "When membership isn't ideal – offer these alternatives.",
      "body": "Trial content here",
      "tag": "training"
    }
  ];
  
  switch (req.method) {
    case 'GET':
      res.status(200).json(pages);
      break;
      
    case 'POST':
      // Check for password
      const password = req.body.password;
      if (password !== process.env.ADMIN_PASSWORD) {
        res.status(401).json({ message: 'Invalid password' });
        return;
      }
      
      // Save new pages data
      pages = req.body.pages;
      res.status(200).json({ message: 'Pages updated' });  
      break;
      
    default:
      res.status(405).json({ message: 'Method not allowed' });
      break;
  }
}