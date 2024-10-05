# React + Vite


> Setup Instructions
1. Clone the repository
   ``` https://github.com/Thoraat/apiChaining ```
   
3. Install dependencies
   ```npm install```
4. Start the application
   ``` npm run dev```

> Breif Explanation : 
This project's approach involves a modern and efficient tech stack that that involves Vite for fast development, React.js for dynamic UI and state management, and Tailwind CSS for responsive, clean styling. This setup ensures a smooth development workflow and responsive user interface across different devices.

> Core Features:
1. API Selection:
        Users can choose from predefined APIs (e.g., Get Users, Create Post, Get Comments), and provide necessary parameters for specific calls, such as POST requests.
        
2. Chaining Multiple API Requests: The application enables sequential API chaining. For instance:
        A Create Post API returns a postId, which is then automatically injected into the subsequent API, such as Get Comments by Post, without manual input. This automation simplifies complex            data-fetching workflows.
        
3. Sequential Execution: The application uses React hooks like useState and useEffect to ensure smooth state management and API chaining. These hooks also handle side effects, loading states,            and error handling, allowing users to follow the progress of each API call and see the results in real-time.

> Libraries and Tools:
1. Vite provides rapid development and efficient production bundling.

2. React.js is ideal for managing UI state, ensuring seamless dynamic interaction for users.

3. Tailwind CSS ensures the app is responsive and visually appealing across different screen sizes.

4. fetch() API is utilized for making HTTP requests to backend services, allowing flexibility in handling both GET and POST requests

> Assumptions :
        The assumptions and decisions taken for API chain structure and component breakdown make sense and outline a clear and logical process for handling APIs. 
    
1. API Chain Structure:
            The sequential execution of APIs ensures that necessary data from one API (like postId in the Create Post API) can be passed to the next one (like the Get Comments by Post API).                  This ensures smooth chaining and dependency management between calls.
    
2. API URL Placeholder:
            The placeholder strategy (e.g., {postId}) allows for flexibility and dynamic handling of data. As the chain runs, the placeholders are replaced with actual values from previous API               responses, ensuring the correct URLs are constructed in real-time.
    
3. Component Breakdown:
            ApiCall: This component is crucial for setting up each API in the chain, letting users configure requests (including parameters for POST requests).
            Dashboard: This acts as the controller for managing the entire API chain and ensures execution flow is smooth while handling the state of responses.
            ApiResponseDisplay: A user-friendly way of showing the outcomes of each API call. By separating this into its own component, you ensure a clean UI and separation of concerns.
    
4. Error Handling:
            Pausing the chain on an error and displaying the issue to the user is critical for maintaining a good user experience. This ensures that the user is informed of problems without                 continuing further down a potentially faulty chain.
