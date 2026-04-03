Blood Bank Management System
Project Description
The Blood Bank Management System is a web-based application designed for hospitals and blood banks to efficiently manage blood donations, inventory, and patient requests

This system allows admins to:  
- Add blood inventory records (donor info, blood group, quantity, dates, etc.)  
- Track low stock or expired blood units  
- Search donors or patients based on **blood group and location**  
- Use voice commands to filter inventory quickly  

It is practical, interactive, and unique with voice assistant support and live filtering.

Features Implemented

- Add blood inventory records including:
- Blood Group, Quantity, Received Date, Expiry Date, Contact, Name, Age, Location
- View all inventory records 
- Low Stock & Expired Blood Alerts(highlighted in red)
- Search Donor / Search Patient by Blood Group or Location
- Voice Assistant / Microphone Search for hands-free filtering
- Voice feedback: system announces the number of matching results
- All matching records are displayed, not just one
- Proper table alignment and responsive design
- Input validation for dates, quantity, and age


Tech Stack
Frontend: HTML, CSS3, JavaScript  
Backend: Node.js  
Database:SQL (PostgreSQL via Supabase)  
Hosting:Supabase (handles DB, authentication, and API endpoints)  
Voice Recognition:Web Speech API
