// app/routes/about.tsx
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div>
      <h1>About Us</h1>
      <p>This is the About page.</p>
      <Link to="/">Back to Home</Link>
    </div>
  );
}
